const {Router} = require('express');
const userEdit = Router();
const { getUsers, updateUser } = require('../controllers/user.controller');
const { verifyToken, verifyRol } = require('../middlewares/auth.validations.js');

userEdit.get('/users', verifyToken, verifyRol(['admin']), getUsers);
userEdit.put('/users/:id', verifyToken, verifyRol(['admin']), updateUser);

module.exports = userEdit;