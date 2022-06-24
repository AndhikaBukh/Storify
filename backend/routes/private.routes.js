const express = require('express');
const router = express.Router();
const { getPrivateData } = require('../controllers/private.controller');
const { protect } = require('../middleware/auth');

router.get('/', protect, getPrivateData);

module.exports = router;