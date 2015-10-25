//依赖模块
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');

//这里依赖的是本地的routes目录下的文件
var routes = require('./routes/index');
var users = require('./routes/users');
var form = require('./routes/form');

var juicer = require("juicer");
var juicerExpressAdapter = require('juicer-express-adapter');

//实例化express
var app = express();
//app.use(session({
  //genid: function(req) {
    //return genuuid() // use UUIDs for session IDs
  //},
  //secret: 'baozi'
//}))
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'tpl');
//更改引擎为juicer
app.set('tpl', juicer);
app.engine('tpl', juicerExpressAdapter);

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
//启用的初始化中间件
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
var key = "baozi__"
app.use(cookieParser(key));
app.use(session({
    secret:"baozi",
    name:"cc",
    secure:true
    //cookie: { maxAge: 60000 }
}))
app.use(express.static(path.join(__dirname, 'public')));

//app.use(require('connect-livereload')())

//如果访问/则调用routes下的index /users同理
app.use('/', routes);
app.use('/users', users);
app.use('/form', form);
//TODO 这里我测试新建一个路由来交给users控制
app.use('/lists', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers
//测试环境
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

//生产环境
// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
