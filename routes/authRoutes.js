const express = require('express');
const authController = require('../controllers/authController');
const validateSchema = require('../middlewares/validateSchema');
const { loginSchema } = require('../schemas/loginSchema');

const router = express.Router();

router.post('/login', validateSchema(loginSchema), authController.login);

module.exports = router;