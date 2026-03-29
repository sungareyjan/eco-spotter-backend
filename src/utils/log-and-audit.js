const AuditTrailService = require('../services/audit-trail.service');

async function auditEvent(req, audit) {
    try {
        await AuditTrailService.log(audit);
    } catch (err) {
        req.logger.app.error({
            message: 'Audit trail failed',
            error: err.message
        });
    }
}

function logEvent(req, level = 'info', data) {
    req.logger.app[level](data);
}
module.exports = {logEvent,auditEvent };