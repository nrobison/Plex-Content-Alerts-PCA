const express = require('express');
const router = express.Router();
var multer = require('multer')
var upload = multer({ storage: multer.memoryStorage() })

const plexwebhookController = require('../controllers/plexwebhookController');

router.post('/',upload.any(), plexwebhookController.webhookReceived);

module.exports = router;