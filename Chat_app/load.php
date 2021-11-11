<?php
    session_start();

    require_once "connect.php";

    try{
        $conn = new mysqli($servername, $username, $dbpassword, $dbname);

        if($conn->connect_errno!=0){
            throw new Exception(mysqli_connect_errno());
        }else{
            $res = $conn->query("SELECT * FROM conversation1");
            if($res->num_rows > 0){
                while($row = $res->fetch_assoc()){
                    if($row["nick_message"] == $_SESSION["user_nick"]){
                        $nick = "Me";
                        $howmessage = "send";
                    }else{
                        $nick = $row["nick_message"];
                        $howmessage = "catch";
                    }
                    $message = $row["message"];
                    $date = $row["date"];
                    echo<<<END
                        <div class="message-box-$howmessage">
                            <span class="nick">$nick</span>
                            <p class="message">$message</p>
                            <p class="date">$date</p>
                        </div>
                    END;
                }
            }else{
                echo "<span class='loading-messages'>no messages</span>";
            }
            $conn->close();
        }
    }catch(Exception $err){
        echo "server error"."<br>";
        echo $err;
    }
?>