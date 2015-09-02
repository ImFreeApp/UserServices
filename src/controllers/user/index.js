var express = require('express');
var router = express.Router();
var implementation = require('./implementation');

router.use(require('body-parser').json());
router.use(require('cors')());

// router.get('/', implementation.getCheckIn);

router.post('/', implementation.userLogIn);

module.exports = router;