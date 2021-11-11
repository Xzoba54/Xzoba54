<?php
    
    session_start();

    require_once "connect.php";

    if($_SESSION["zalogowano"] == true){
        header("Location: chat.php");
        exit();
    }

    $login = $_POST["username"];
    $password = $_POST["password"];

    try{
        $conn = new mysqli($servername, $username, $dbpassword, $dbname);

        if($conn->connect_errno!=0){
            throw new Exception(mysqli_connect_errno());
        }else{
            $res = $conn->query("SELECT * FROM users WHERE (nick='$login') OR (email='$login')");
            if($res->num_rows > 0){
                $row = $res->fetch_assoc();
                if(password_verify($password, $row["password"])){

                    $_SESSION["zalogowano"] = true;

                    $_SESSION["user_id"] = $row["id"];
                    $_SESSION["user_nick"] = $row["nick"];
                    $_SESSION["user_email"] = $row["email"];

                    $res->free_result();
                    header("Location: chat.php");
                }
            }else{
                $_SESSION['logowanie_error'] = '<span class="error">Incorrect login or password</span>';
                header("Location: index.php");
            }
            $conn->close();
        }
    }catch(Exception $err){
        echo "server error"."<br>";
        echo "Dev info: ".$err;
    }
?>