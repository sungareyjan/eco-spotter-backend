const ObservationService = require('../services/observation.service');

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

}

module.exports = new ObservationController();