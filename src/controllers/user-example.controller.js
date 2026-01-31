
const db = require("../models");
const User = db.User;

// Find all users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        return res.json(users);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
};

// CREATE user
const createUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
        return res.status(201).json(user);
    } catch (error) {
        console.error(error);
        return res.status(400).json({ message: error.message });
    }
};


// Find a user by ID
    const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);
        if (!user) return res.status(404).json({ message: "User not found" });
        return res.json(user);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
};

// UPDATE user (PUT - replace entire record)
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const [updated] = await User.update(req.body, { where: { id } });
        if (!updated) return res.status(404).json({ message: "User not found" });

        const updatedUser = await User.findByPk(id);
        return res.json(updatedUser);
    } catch (error) {
        console.error(error);
        return res.status(400).json({ message: error.message });
    }
};

// PATCH user (partial update)
const patchUser = async (req, res) => {
    try {
        const { id } = req.params;
        const [updated] = await User.update(req.body, { where: { id } });
        if (!updated) return res.status(404).json({ message: "User not found" });

        const updatedUser = await User.findByPk(id);
        return res.json(updatedUser);
    } catch (error) {
        console.error(error);
        return res.status(400).json({ message: error.message });
    }
};

// DELETE user
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await User.destroy({ where: { id } });
        if (!deleted) return res.status(404).json({ message: "User not found" });

        return res.json({ message: "User deleted successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
};


module.exports = {
    getAllUsers, createUser,
    getUserById, updateUser,
    patchUser, deleteUser,
};
