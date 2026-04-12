const ObservationService = require('../services/observation.service');
const validateFields = require('../utils/validate-fields');
const { extractClientInfo } = require('../utils/device-info');
const { logEvent, auditEvent } = require('../utils/log-and-audit');
const { v4: uuidv4 } = require('uuid');

const path = require('path');
class ObservationController{

    async getAllObservation(req,res){

        let { search, page, limit } = req.query;
        page  = parseInt(page, 10);
        limit = parseInt(limit, 10);
        if (isNaN(page) || page < 1) page = 1;
        if (isNaN(limit) || limit < 1) limit = 10;

        const observations = await ObservationService.getAll({
            search,
            page,
            limit
        });
        res.status(200).json({
            status: 'success',
            code  : 200,
            data  : observations.data,
            pagination  : observations.pagination
        });
    }

    async postObservation(req, res, next) {
            const endpoint = 'POST /observations';
            const userId = req.body.createdBy || 'unknown';
            const client = extractClientInfo(req);

            const buildAuditRequest = () => ({
                speciesId        : req.body.speciesId,
                kingdomGroup     : req.body.kingdomGroup,
                proposedSpeciesId: req.body.proposedSpeciesId || null,
                description      : req.body.description || null,
                observedAt       : req.body.observedAt,
                latitude         : req.body.latitude,
                longitude        : req.body.longitude,
                locationName     : req.body.locationName,
                createdBy        : req.body.createdBy,
                files            : req.files?.map(file => ({
                    originalname: file.originalname,
                    mimetype    : file.mimetype,
                    size        : file.size
                })) || []
            });

            try {
                //  Log the incoming request
                logEvent(req, 'info', { endpoint, userId, fileCount: req.files?.length || 0, body: buildAuditRequest() });

                //  Validate file
                if (!req.files || req.files.length === 0) {
                    await auditEvent(req, {
                        status    : 'failed',
                        username  : userId,
                        moduleCode: 'OBSERVATION',
                        action    : 'CREATE',
                        log       : 'Image not provided',
                        request   : buildAuditRequest(),
                        ...client
                    });
                    return res.status(400).json({ error: 'Image required' });
                }

                //  Validate required fields
                const requiredFields = [
                    'speciesId',
                    'kingdomGroup',
                    'observedAt',
                    'latitude',
                    'longitude',
                    'locationName',
                    'createdBy'
                ];
                const missingFields = validateFields(req.body, requiredFields);
                if (missingFields.length > 0) {
                    logEvent(req, 'warn', { endpoint, userId, missingFields, message: 'Missing required fields' });
                    return res.status(400).json({ error: `Missing required fields: ${missingFields.join(', ')}` });
                }

                //  Prepare storage key
                const today = new Date().toISOString().split('T')[0];
                const uploadedImages = req.files.map(file => {
                    const ext = path.extname(file.originalname);
                    const filename = `${uuidv4()}${ext}`;
                    const storageKey = `observations/${userId}/${today}/${filename}`;

                    return {
                        file,
                        storageKey,
                        mimeType: file.mimetype
                    };
                });

                const observationPayload = {
                    ...buildAuditRequest(),
                    createdBy: userId,
                    files: uploadedImages,
                    images: uploadedImages.map(img => ({
                        imagePath: img.storageKey,
                        mimeType: img.mimeType
                    }))
                };

                //  Create observation
                const observation = await ObservationService.createObservation(observationPayload, req.logger);

                //  Audit success
                await auditEvent(req, {
                    status    : 'success',
                    username  : userId,
                    moduleCode: 'OBSERVATION',
                    action    : 'CREATE',
                    log       : 'Observation created successfully',
                    request   : buildAuditRequest(),
                    entityId  : observation.id,
                    ...client
                });

                return res.status(201).json({
                    status : 'success',
                    code   : 201,
                    message: 'Observation uploaded',
                    data   : observation
                });

            } catch (error) {
                logEvent(req, 'error', { endpoint, userId, message: 'Failed to create observation', error: error.message });

                await auditEvent(req, {
                    status    : 'failed',
                    username  : userId,
                    moduleCode: 'OBSERVATION',
                    action    : 'CREATE',
                    log       : 'Failed to create observation',
                    request   : buildAuditRequest(),
                    entityId  : null,
                    ...client
                });

                next(error);
            }
    }

}

module.exports = new ObservationController();