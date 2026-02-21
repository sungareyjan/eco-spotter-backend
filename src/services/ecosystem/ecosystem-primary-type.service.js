const { EcosystemPrimaryType } = require('../../models');

class EcosystemPrimaryTypeService {

    async getAll() {
        return await EcosystemPrimaryType.findAll({
            attributes: ['publicId', 'name']
        }
        );
    }
}

module.exports = new EcosystemPrimaryTypeService();