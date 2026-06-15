const express = require('express');
const { registerUser, loginUser, logoutUser, verifyUser } = require('../controllers/userController');
const authUser = require('../middleware/auth');

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.post('/logout', logoutUser);
userRouter.get('/verify', authUser, verifyUser);

module.exports = userRouter;
