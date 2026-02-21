const SpeciesService = require('../services/species.service');

class SpeciesController{

    async  getAllSpecies(req,res){
        let { search, page, limit } = req.query;
        page  = parseInt(page, 10);
        limit = parseInt(limit, 10);
        if (isNaN(page) || page < 1) page = 1;
        if (isNaN(limit) || limit < 1) limit = 10;

        const species = await SpeciesService.getAll({
            search,
            page,
            limit
        });
        res.status(200).json({
            status: 'success',
            code  : 200,
            data  : species.data,
            pagination  : species.pagination
        })
    }

}

module.exports = new SpeciesController();