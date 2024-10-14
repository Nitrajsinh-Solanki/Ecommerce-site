const express = require('express');
const { getAllUsers, deleteUser, updateUserRole, addUserByAdmin } = require('../controllers/adminController');
const { authMiddleware, adminMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(authMiddleware);
router.use(adminMiddleware);

router.get('/users', getAllUsers);
router.post('/users/add', addUserByAdmin);
router.put('/users/:id', updateUserRole);
router.delete('/users/:id', deleteUser);

module.exports = router;
