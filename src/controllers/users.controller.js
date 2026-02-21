const UserService = require('../services/user.service');

class UserController{

	async getAllUsersAccess (req, res, next){
		try {
			const users = await UserService.getAllUsersWithAccess();

			res.json({
				success: true,
				data: users
			});
		} catch (error) {
			next(error);
		}
	};

	async getAllUserByPublicId(req, res, next){
		try {
			const { publicId } = req.params;

			const user = await UserService.getUserByPublicId(publicId);
			if (!user) {
				return res.status(404).json({
					success: false,
					message: 'User not found'
				});
			}

			res.json({
				success: true,
				data: user
			});
		} catch (error) {
			next(error);
		}
	};
}

module.exports = new UserController();
