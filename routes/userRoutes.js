const express = require('express');
const userController = require('../controllers/userController');
const validateSchema = require('../middlewares/validateSchema');
const { createUserSchema, updateUserSchema } = require('../schemas/userSchema');
const authenticate = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', authenticate, userController.all);
router.get('/:id', authenticate, userController.find);
router.post('/', validateSchema(createUserSchema), userController.create);
router.put('/:id', authenticate, validateSchema(updateUserSchema), userController.update);
router.delete('/:id', authenticate, userController.delete);

module.exports = router;
