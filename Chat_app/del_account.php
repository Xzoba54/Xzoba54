<?php
    session_start();

    $id = $_SESSION['user_id'];
    require_once "connect.php";

    try{
        $conn = new mysqli($servername, $username, $dbpassword, $dbname);
        if($conn->connect_errno!=0){
            throw new Exception(mysqli_connect_errno());
        }else{
            if($conn->query("DELETE FROM users WHERE id='$id'")){
                session_destroy();
                echo "Udało się usunąć konto!";
                header("Location: index.php");
            }else{
                throw new Exception($conn->error);
                header("Location: chat.php");
            }
            $conn->close();
        }
    }catch(Exception $e){
        echo "Błąd serwera. Spróbuj później!";
        echo "Dev info: ".$e;
    }
?>