<?php

    session_start();

    if(!isset($_SESSION["zalogowano"])){
        header("Location: index.php");
        exit();
    }
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Chat</title>
    <link rel="stylesheet" href="css/chat.css">
    <script src="js/jquery-3.6.0.min.js"></script>
    <script src="js/app.js"></script>
</head>
<body>

    <div class="wrapper">
        <div class="topbar-wrapper">
            <span class="logged-as">Logged as <?php echo $_SESSION['user_nick'];?></span>
            <form action="wyloguj.php" method="POST">
                <input class="bt-logout" type="submit" value="logout">
            </form>
            <form action="del_account.php" method="POST">
                <input class="bt-del-account" type="submit" value="Delete account">
            </form>
        </div>
        <div class="message-wrapper">
            <div id="message-wrapper-flex" class="message-wrapper-flex">
                <span class="loading-messages">Loading messages...</span>
            </div>
        </div>
        <div class="control-wrapper">
            <input type="text" name="message-textbox" placeholder="message..." class="message-textbox" id="message-textbox">
            <input type="button" id="bt-send" value="Send">
        </div>
    </div>
</body>
</html>