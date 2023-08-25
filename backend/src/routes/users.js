const express = require('express');
const middleware = require('../app/middleware/authentication');
const router = express.Router();

const usersController = require('../app/controllers/users.controller');

router.get('/', middleware.verifyToken, usersController.findUserByKeyword);
router.get('/:id', middleware.verifyToken, usersController.fineOne);
router.put('/edit/:id', middleware.verifyToken, usersController.update);

module.exports = router;
