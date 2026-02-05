const RoleService = require('../services/role.service');

const getAllRoles = async (req, res, next) => {
    try {
        const roles = await RoleService.getRoles();

        res.status(200).json({
            status: 'success',
            code: 200,
            message: 'Roles fetched successfully',
            data: roles
        });
    } catch (error) {
        next(error);
    }
};

module.exports = { getAllRoles };
