const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');
const { createUser, loginUser, updateUser } = require('../controllers/userController');

router.post('/register', createUser);
router.post('/login', loginUser);
router.put('/', protect, updateUser);