const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');

const authController = {
    login: async (req, res) => {
        const { email, password } = req.body;

        try {
            const user = await User.findOne({ where: { email } });

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (!isPasswordValid) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            const token = jwt.sign(
                {
                    id: user.id,
                    email: user.email
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: '1h'
                }
            );

            const refreshToken = jwt.sign(
                {
                    id: user.id,
                    email: user.email
                },
                process.env.JWT_REFRESH_SECRET,
                {
                    expiresIn: '1d'
                }
            );

            user.refreshToken = refreshToken;
            await user.save();

            res.status(200).json({ token: token, refreshToken: refreshToken });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Unable to login' });
        }
    },

    refresh: async (req, res) => {
        const { refreshToken } = req.body;

        if (!refreshToken) {
            return res.status(400).json({ message: 'Missing refresh token' });
        }

        try {
            const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
            const user = await User.findByPk(decoded.id);

            if (!user || user.refreshToken !== refreshToken) {
                return res.status(401).json({ message: 'Invalid refresh token' });
            }
        } catch (error) {
            console.error(error);
            return res.status(401).json({ message: 'Invalid refresh token' });
        }
    }
};

module.exports = authController;
