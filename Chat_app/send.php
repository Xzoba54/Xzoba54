<?php
    session_start();

    require_once "connect.php";

    $nick = $_SESSION["user_nick"];
    $message = $_POST["message"];

    try{
        $conn = new mysqli($servername, $username, $dbpassword, $dbname);

        if($conn->connect_errno!=0){
            throw new Exception(mysqli_connect_errno());
        }else{
            $conn->query("INSERT INTO conversation1 VALUES(NULL, '$nick', '$message', now())");
            $conn->close();
        }
    }catch(Exception $err){
        echo "server error"."<br>";
        echo $err;
    }
?>