const UserService = require('../services/user.service');

const getAllUsersAccess = async (req, res) => {
try {
	const users = await UserService.getAllUsersWithAccess();

	res.json({
	success: true,
	data: users
	});
} catch (err) {
	console.error(err);
	res.status(500).json({
	success: false,
	message: 'Failed to fetch users',
	error: err.message
	});
}
};

const getAllUserByPublicId = async (req, res) => {
try {
	const { publicId } = req.params; // <-- get publicId from URL

	const user = await UserService.getUserByPublicId(publicId); // <-- pass it here

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
} catch (err) {
	console.error(err);
	res.status(500).json({
	success: false,
	message: 'Failed to fetch user',
	error: err.message
	});
}
};

module.exports = { getAllUsersAccess, getAllUserByPublicId };
