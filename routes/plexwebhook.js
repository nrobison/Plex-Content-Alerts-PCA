const express = require('express');
const router = express.Router();
const plexwebhookController = require('../controllers/plexwebhookController');

router.post('/', plexwebhookController.webhookReceived);

module.exports = router;