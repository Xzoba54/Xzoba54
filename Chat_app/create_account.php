<?php
    session_start();

    if(isset($_SESSION["zalogowano"])){
        header("Location: chat.php");
        exit();
    }

    if(isset($_POST["email"])){
        $validation = true;

        $email = $_POST['email'];
        $email_san = filter_var($email, FILTER_SANITIZE_EMAIL);
        if((filter_var($email_san, FILTER_VALIDATE_EMAIL)==false) || ($email_san!=$email)){
            $validation = false;
            $_SESSION['err_email'] = '<span class="error">Wrong email address</span>';
        }

        $nick = $_POST['username'];
        if(strlen($nick) < 4 || strlen($nick) > 15){
            $validation = false;
            $_SESSION['err_nick'] = '<span class="error">Nick musi się składać od 4 do 15 znaków</span>';
        }

        if(ctype_alnum($nick)==false){
            $validation = false;
            $_SESSION['err_nick'] = '<span class="error">Nickname must be 4 to 15 characters long</span>';
        }

        $password = $_POST["password"];
        $confirm_password = $_POST["confirm_password"];
        if($password != $confirm_password){
            $validation = false;
            $_SESSION['err_password'] = '<span class="error">The passwords do not match</span>';
        }

        if(strlen($password) < 8 || strlen($password) > 30){
            $validation = false;
            $_SESSION['err_password'] = '<span class="error">The password must be 8 to 30 characters long</span>';
        }

        $password_hash = password_hash($password, PASSWORD_DEFAULT);

        require_once "connect.php";
        mysqli_report(MYSQLI_REPORT_STRICT);

        try{
            $conn = new mysqli($servername, $username, $dbpassword, $dbname);

            if($conn->connect_errno!=0){
                throw new Exception(mysqli_connect_errno());
            }else{
                $sql = $conn->query("SELECT * FROM users WHERE email='$email'");
                if(!$sql){
                    throw new Exception($conn->error);
                }
                if($sql->num_rows > 0){
                    $validation = false;
                    $_SESSION["err_email"] = '<span class="error">Zajęty jest już taki adres email</span>';
                }

                $sql = $conn->query("SELECT * FROM users WHERE nick='$nick'");
                if(!$sql){
                    throw new Exception($conn->error);
                }
                if($sql->num_rows > 0){
                    $validation = false;
                    $_SESSION["err_email"] = '<span class="error">This email address is already taken</span>';
                }

                if($validation == true){
                    $sql = $conn->query("INSERT INTO users VALUES(NULL, '$nick', '$email', '$password_hash')");
                    if(!$sql){
                        throw new Exception($conn->error);
                    }else{
                        header("Location: index.php");
                    }
                }
                $conn->close();
            }
        }catch(Exception $err){
            echo "server error"."<br>";
            echo $err;
        }
        $_SESSION["fr_email"] = $email;
        $_SESSION["fr_nick"] = $nick;
    }
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Sign up</title>
    <link rel="stylesheet" href="css/main.css">
</head>
<body>

    <div class="wrapper">
        <form method="POST">
            <span class="logo-header">
                Register
            </span>
            <input type="text" placeholder="Email" value="<?php
                if(isset($_SESSION["fr_email"])){
                    echo $_SESSION["fr_email"];
                    unset($_SESSION["fr_email"]);
                }
            ?>" name="email" class="email">
            <?php
                if(isset($_SESSION["err_email"])){
                    echo $_SESSION["err_email"];
                    unset($_SESSION["err_email"]);
                }
            ?>
            <input type="text" placeholder="Username" value="<?php
                if(isset($_SESSION["fr_nick"])){
                    echo $_SESSION["fr_nick"];
                    unset($_SESSION["fr_nick"]);
                }
            ?>" name="username" class="username">
            <?php
                if(isset($_SESSION["err_nick"])){
                    echo $_SESSION["err_nick"];
                    unset($_SESSION["err_nick"]);
                }
            ?>
            <input type="password" placeholder="Password" name="password" class="password">
            <?php
                if(isset($_SESSION["err_password"])){
                    echo $_SESSION["err_password"];
                    unset($_SESSION["err_password"]);
                }
            ?>
            <input type="password" placeholder="Confirm password" name="confirm_password">
            <a href="index.php">
                <input type="button" value="Back to login">
            </a>
            <input type="submit" value="Sign up">
        </form> 
    </div>
    
</body>
</html>