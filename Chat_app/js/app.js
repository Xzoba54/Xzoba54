$(document).ready(function() {
    $("#bt-send").click(function send(){
        var message_txt = $("#message-textbox").val();

        if($.trim(message_txt) != ""){
            $.ajax({
                url: "send.php",
                method: "POST",
                data:{message: message_txt},
                dataType: "text",
                success:function(data){
                    $("#message-textbox").val("");
                }
            });
        }
    });
    setInterval(function(){
        $("#message-wrapper-flex").load("load.php");
    },1000);
});