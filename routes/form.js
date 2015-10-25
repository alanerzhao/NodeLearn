var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.send('asdasd')
});
router.post('/', function(req, res, next) {
    res.send({
        aa:12123213,
        bb:2222
    })
});

module.exports = router;

