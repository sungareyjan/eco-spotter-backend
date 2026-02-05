const {Role} = require('../models');

class RoleService{

    async getRoles(){
        const roles = await Role.findAll({
            attributes:['name','display_name','description']
        })
        return roles.map(role => role.get({ plain: true }));
    }

}

module.exports = new RoleService();