const joi = require('joi');

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

        const userSchema = joi.object({
            name: joi.string().required(),
            email: joi.string().email().required(),
            password: joi.string().required(),
        });

        const { error, value } = userSchema.validate(req.body, { abortEarly: false });

        if (error) {
            return res.status(400)
                .json({
                    message: 'Validation failed',
                    errors: error.details.map((err) => err.message),
                });
        }

        try {
            const user = await User.create(value);
            res.status(201).json(user);
        } catch (error) {
            res.status(500).json({ message: 'Unable to create user', error: error.message });
        }
    },

    find: async (req, res) => {
        try {
            const user = await User.findByPk(req.params.id);
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Unable to get user' });
        }
    },

    update: async (req, res) => {

        const userSchema = joi.object({
            name: joi.string().required(),
            email: joi.string().email().required(),
            password: joi.string().required(),
        });

        const { error, value } = userSchema.validate(req.body, { abortEarly: false });

        if (error) {
            return res.status(400)
                .json({
                    message: 'Validation failed',
                    errors: error.details.map((err) => err.message),
                });
        }

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
