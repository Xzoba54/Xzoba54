<?php
    session_start();

    if(isset($_SESSION["zalogowano"])){
        header("Location: chat.php");
        exit();
    }
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Login</title>
    <link rel="stylesheet" href="css/main.css">
</head>
<body>
    <div class="wrapper">
        <form action="zaloguj.php" method="POST">
            <span class="logo-header">
                Login
            </span>
            <input type="text" placeholder="Username or Email" name="username" class="username">
            <input type="password" placeholder="Password" name="password" class="password">

            <?php
                if(isset($_SESSION['logowanie_error'])){
                    echo $_SESSION['logowanie_error'];
                    unset($_SESSION['logowanie_error']);
                }
            ?>

            <a href="create_account.php">
                <input type="button" value="Create account">
            </a>
            <input type="submit" value="Log in">
        </form> 
    </div>
</body>
</html>