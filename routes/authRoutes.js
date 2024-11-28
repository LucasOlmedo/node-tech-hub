const express = require('express');
const authController = require('../controllers/authController');
const validateSchema = require('../middlewares/validateSchema');
const { loginSchema } = require('../schemas/loginSchema');
const { refreshTokenSchema } = require('../schemas/refreshTokenSchema');

const router = express.Router();

router.post('/login', validateSchema(loginSchema), authController.login);
router.post('/refresh', validateSchema(refreshTokenSchema), authController.refresh);

module.exports = router;
