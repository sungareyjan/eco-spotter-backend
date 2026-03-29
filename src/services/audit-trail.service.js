const { AuditTrails } = require('../models');

class AuditTrailService {
    static async log(data) {
             console.log('data')
        try {
            console.log('data3')
            // Ensure proper nulls and JSON
            const payload = {
                status        : data.status || 'success',
                username      : data.username || 'guest',
                role          : data.role || 'guest',
                entityId      : data.entityId || null,       // maps to entity_id
                moduleCode    : data.moduleCode || 'UNKNOWN',// maps to module_code
                log           : data.log || '',
                remarks       : data.remarks || null,
                oldData       : data.oldData ?? null,       // must be null if empty
                request       : data.request ?? null,       // must be null if empty
                ip            : data.ip || null,
                browser       : data.browser || null,
                browserVersion: data.browserVersion || null, // maps to browser_version
                os            : data.OS || null,            // maps to o_s
                device        : data.device || null,
                deviceUnit    : data.deviceUnit || null     // maps to device_unit
            };

            console.log('payload')
            console.log(payload)
            await AuditTrails.create(payload);

        } catch (err) {
            console.error('Failed to save audit trail:', err.message);
            console.error('Audit ERROR FULL:', err);
            console.error('Parent:', err.parent);
            console.error('Original:', err.original);
        }
    }
}

module.exports = AuditTrailService;