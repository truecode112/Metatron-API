const express = require('express');
const router = express.Router();

const userController = require('../../controllers/user.controller.ts');
const auth = require('../../middleware/auth.middleware.ts');
const Role = require('../../utils/userRoles.utils.ts');
const awaitHandlerFactory = require('../../middleware/awaitHandlerFactory.middleware.ts');

const { createUserSchema, updateUserSchema, updatePasswordSchema, validateLogin, validateEmail } = require('../../middleware/validators/userValidator.middleware.ts');

router.post('/emailverify', validateEmail, awaitHandlerFactory(userController.verifyEmail));
router.post('/signup', createUserSchema, awaitHandlerFactory(userController.userSignup));
router.post('/login', validateLogin, awaitHandlerFactory(userController.userLogin));
router.post('/', createUserSchema, awaitHandlerFactory(userController.createUser));
router.get('/', awaitHandlerFactory(userController.getAllUsers));
router.get('/:sortby/:page/:limit', auth(Role.Super), awaitHandlerFactory(userController.getUsers));
router.get('/id/:id', auth(Role.Super), awaitHandlerFactory(userController.getUserById));
router.get('/whoami', auth(), awaitHandlerFactory(userController.getCurrentUser));
router.patch('/update', auth(), updateUserSchema, awaitHandlerFactory(userController.updateUser));
router.patch('/password', auth(), updatePasswordSchema, awaitHandlerFactory(userController.updatePassword));
router.delete('/id/:id', auth(Role.Super), awaitHandlerFactory(userController.deleteUser));
router.post('/forgotpassword', awaitHandlerFactory(userController.forgotPassword));
router.patch('/resetpassword', updatePasswordSchema, auth(), awaitHandlerFactory(userController.resetPassword));

module.exports = router;