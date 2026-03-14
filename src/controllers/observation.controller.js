const { status } = require('init');
const ObservationService = require('../services/observation.service');
const storage = require("../services/storage.service");
const validateFields = require('../utils/validate-fields');


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

        try {
        if (!req.file) return res.status(400).json({ error: "Image required" });

        // Validate required fields from form-data
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
            return res.status(400).json({
                error: `Missing required fields: ${missingFields.join(', ')}`
            });
        }

        // Upload file to MinIO
        const { v4: uuidv4 } = require('uuid');
        const path = require('path');

        const userId = req.body.createdBy;
        const file = req.file;

        // folder date
        const today = new Date().toISOString().split('T')[0]; // 2026-03-14

        // keep original extension (.jpg, .png)
        const ext = path.extname(file.originalname);

        // generate unique filename
        const filename = `${uuidv4()}${ext}`;

        // build storage path
        const key = `observations/${userId}/${today}/${filename}`;

        // upload to MinIO
        await storage.upload(file.buffer, key, file.mimetype);

        // Prepare payload for service
        const observationPayload = {
            speciesId        : req.body.speciesId,
            proposedSpeciesId: req.body.proposedSpeciesId || null,
            kingdomGroup     : req.body.kingdomGroup,
            description      : req.body.description || null,
            observedAt       : req.body.observedAt,
            latitude         : req.body.latitude,
            longitude        : req.body.longitude,
            locationName     : req.body.locationName,
            createdBy        : req.body.createdBy,
            images           : [
                {
                    imagePath: key,
                    mimeType : file.mimetype
                }
            ]
        };

        // Create observation
        const observation = await ObservationService.createObservation(observationPayload);

        res.status(201).json({
            status : 'success',
            code   : 201,
            message: "Uploaded",
            data   : observation
        });

        } catch (error) {
            console.error("UPLOAD ERROR:", error);
            next(error);
        }
    }
}

module.exports = new ObservationController();