const express = require('express');
const { registerAdmin, authAdmin } = require('../controllers/adminController');
const router = express.Router();

router.post('/register', registerAdmin);
router.post('/login', authAdmin);

module.exports = router;
