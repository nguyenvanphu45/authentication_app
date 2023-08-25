const express = require('express');
const middleware = require('../app/middleware/authentication');
const router = express.Router();

const groupController = require('../app/controllers/group.controller');

router.get('/', middleware.verifyToken, groupController.fetchGroup);
router.post('/create', middleware.verifyToken, groupController.create);

module.exports = router;
