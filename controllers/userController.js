const User = require('../models/User');

const userController = {

    all: async (req, res) => {
        try {
            const users = await User.findAll();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ message: 'Unable to get users' });
        }
    },

    create: async (req, res) => {

        try {
            const user = await User.create(req.body);
            res.status(201).json(user);
        } catch (error) {
            res.status(500).json({ message: 'Unable to create user', error: error.message });
        }
    },

    find: async (req, res, next) => {
        try {
            const user = await User.findByPk(req.params.id);
            if (user) {
                res.status(200).json(user);
            } else {
                next(new Error('User not found'));
            }
        } catch (error) {
            res.status(500).json({ message: 'Unable to get user' });
        }
    },

    update: async (req, res) => {

        try {
            const user = await User.findByPk(req.params.id);
            if (user) {
                await user.update(req.body);
                res.status(200).json(user);
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Unable to update user' });
        }
    },

    delete: async (req, res) => {
        try {
            const user = await User.findByPk(req.params.id);
            if (user) {
                await user.destroy();
                res.status(200).json({ message: 'User deleted' });
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Unable to delete user' });
        }
    },
};

module.exports = userController;
