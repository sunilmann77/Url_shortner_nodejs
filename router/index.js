const express = require('express');

const router = express.Router();

const homeController = require('../controller/homeController');

router.get('/', homeController.home);
router.use('/users', require('./users'));
router.use('/api', require('./api'));
const UrlRouter = require('./url');
router.use('/', UrlRouter);

module.exports = router;