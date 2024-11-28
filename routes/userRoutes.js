const express = require('express');
const userController = require('../controllers/userController');
const validateSchema = require('../middlewares/validateSchema');
const { createUserSchema, updateUserSchema } = require('../schemas/userSchema');

const router = express.Router();

router.get('/', userController.all);
router.get('/:id', userController.find);
router.post('/', validateSchema(createUserSchema), userController.create);
router.put('/:id', validateSchema(updateUserSchema), userController.update);
router.delete('/:id', userController.delete);

module.exports = router;
