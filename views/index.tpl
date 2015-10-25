 <!DOCTYPE html>
 <html lang="en">
 <head>
     <meta charset="UTF-8">
     <title></title>
 <link rel="stylesheet" href="/stylesheets/demo.css">
 <script src="/jquery/dist/jquery.js"></script>
 </head>
 <body>
 {# juicer 模板引擎替换}
 Welcome to ${title}
 hello wo2

 <form >
    <input name="text" class="text" type="text">
    <input class="btn" type="submit">
 </form>

 <script>
 (function ($) {

    var btn = $(".btn");
    var text = $(".text");
    btn.click(function (e) {
        console.log(text.val())
        sendData()
        return false;
    })
    function sendData () {
        $.ajax({
            url:"login",
            type:"POST",
            data:{user:text.val()},
            success: function (data) {
                console.log(data)
            }
        })    
    }

})(jQuery)

 </script>
 </body>
 </html>
