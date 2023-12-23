const express = require('express');
const router = express.Router();
const passport = require('passport');

const usersApi = require('../../../controller/api/v1/user_api');

router.post('/createsession', usersApi.createsession);
module.exports = router;
