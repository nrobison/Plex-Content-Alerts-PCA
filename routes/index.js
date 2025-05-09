const express = require('express');
const router = express.Router();
const userRoutes = require('./plexwebhook');

router.use('/plexwebhook', userRoutes);
module.exports = router;