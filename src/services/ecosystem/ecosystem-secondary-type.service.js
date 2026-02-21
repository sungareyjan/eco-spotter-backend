const { EcosystemSecondaryType } = require('../../models');

class EcosystemSecondaryTypeService {

    async getAll() {
        return await EcosystemSecondaryType.findAll({
            attributes: [
                'publicId',
                'name'
            ]
        });
    }
}

module.exports = new EcosystemSecondaryTypeService();