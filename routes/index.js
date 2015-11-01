//顺序有关 中间件有关
//NEXT 到最后没有处理
//原理：从上往往下执行，从根往里执行
//遇到中间件则需要next下去，最后要用输出如果没用则被最后的中间件补货输出
//如果你是中间件那么访问子级父级肯定要先被执行，反之如果你的这普通路由那么不会进入父级
//中间件会拦截所有请求无论是get 还是post
//路由则不行必须按指定的类型
var colors = require("colors");
var logSymbols = require('log-symbols');

// set theme
colors.setTheme({
  silly: 'rainbow',
  input: 'grey',
  verbose: 'cyan',
  prompt: 'grey',
  info: 'green',
  data: 'grey',
  help: 'cyan',
  warn: 'yellow',
  debug: 'blue',
  error: 'red'
});
function output(text,type,flag) {
    var colorArr = [ 'green', 'yellow', 'cyan', 'red', 'grey' ]
    var shuffle = Math.floor(Math.random() * 4);
    var type = type || 'success';
    var text = text || 'not input';
    var renderColor = colors[colorArr[shuffle]];
    if(!text)  {
        output(logSymbols.error, renderColor(text));
        return;
    }
    console.log(logSymbols[type], renderColor(text))
}
module.exports = function(router) {
    router.use(function(req,res,next) {
        console.log("------start--------")
        output("come in");
        next();
    })

    router.get('/',function(req,res,next) {
        output("first come in");
        next();
    })
    router.get('/',function(req,res,next) {
        output("first come in2终止".bold);
        next();
    })
    router.use('/a/b',function(req,res,next) {
        output("use a/b进入");
        next();
    })
    router.get('/a/b',function(req,res,next) {
        output("a/b进入");
        next();
    })
    router.get('/a/b',function(req,res) {
        res.send("oj fuck")
        output("a/b进入挂机了");
    })
    router.get('/a/b/c',function(req,res,next) {
        output("a/b/c进入了");
        res.send("a/b/c fuck in")
        //next();
    })
    router.use('/a/b/c',function(req,res,next) {
        output("use a/b/c进入了");
        res.send("use a/b/c fuck in")
        //next();
    })


    router.get('/a',function(req,res) {
        output('a:路由终止');
        res.send('a');
    })
    router.get('/a',function(req,res) {
        output('a:调用不到');
    })
    router.get('/b',function(req,res,next) {
        output('b:路由未终止');
        next();
    })
    router.use(function(req,res,next) {
        output('第二个要进入的');
        next();
    })
    router.get('/b',function(req,res,next) {
        output('b:失败抛出错误');
        throw new Error('b:失败')
    })
    router.use('/b',function(err,req,res, next) {
        output('b:检测错误并传递');
        next(err)
    })
    router.get('/c',function(err,req) {
        output('c:抛出错误');
        throw new Error('c:失败')
    })
    router.use('/c',function(err,req,res,next) {
        output('c:抛出错误但不传递');
        next()
    })
    router.use(function (err,req,res,next) {
        output('检测到未处理的错误：'+err.message);
        res.send('500')
    })

    router.use(function (req,res) {
        output('未处理的路由','error');
        console.log("---------end ---------")
        res.send('404');
    })

}

