const express = require('express');
const router = express.Router();
const shortUrlController = require('../controller/shorturlcontroller');


router.get('/', shortUrlController.getAllShortUrls);
router.post('/shortUrls', shortUrlController.createShortUrl);
router.get('/:shortUrl', shortUrlController.redirectToFullUrl);

module.exports = router;
