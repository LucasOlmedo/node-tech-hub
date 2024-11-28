require('dotenv').config();

const express = require('express');
const joi = require('joi');

const sequelize = require('./config/database');
const User = require('./models/User');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// GET Example
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// GET With Parameters
app.get('/product/:category/:id', (req, res) => {
    const { category, id } = req.params;
    res.send(`Category: ${category}, ID: ${id}`);
});

// POST Example
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    res.send(`Username: ${username}, Password: ${password}`);
});

// POST With Validation - Joi
const userSchema = joi.object({
    username: joi.string().min(5).max(10).required(),
    email: joi.string().email().required(),
    password: joi.string().min(6).required(),
});

app.post('/register', (req, res) => {
    const { error, value } = userSchema.validate(req.body, { abortEarly: false });

    if (error) {
        return res.status(400)
            .json({
                message: 'Validation failed',
                errors: error.details.map((err) => err.message),
            });
    }

    res.send(`Username: ${value.username}, Email: ${value.email}, Password: ${value.password}`);
});

// Sync DB
sequelize.sync({ force: false }).then(() => {
    console.log('Database synchronized');
}).catch((error) => {
    console.error('Unable to sync the database:', error);
});

// Server Running
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
