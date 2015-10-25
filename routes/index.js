var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

    var sess = req.session;
    if(req.session.login) {
        res.render('index', { title: 'login' });
        //res.render('index', { title: 'no login' });
     } else {
        res.render('index', { title: 'no login' });
     }

});
router.post('/logoout', function(req, res, next) {

    var sess = req.session;
    var user = req.body.user;

});
router.post('/login', function(req, res, next) {

    var sess = req.session;
    var user = req.body.user;
    console.log(sess.login)
    if(sess.login) {
        res.send("剑")
     } else {
        if(!user) {
            res.send({
                status:2,
                msg:"你没有登录"
            })
        } else {
            sess.login = user;
            res.send({
                status:1,
                msg:"登录成功"
            })
        }
     
     }

});

module.exports = router;
