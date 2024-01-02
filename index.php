<?php
include("General.php");
$FH = MyFileHandler::getFileHandler();
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="jquery-3.7.1.js"></script>
    <link rel="stylesheet" href="styles.css">
</head>

<body>
    <div id='MainBody'>
        <div id="Left" class="Pillar">
            <div id="UserInfo">
                <p id="username">Username: </p>
                <p id="userID">ID:</p>
            </div>
            <div id="UserButtons">
                <button class="userbtn" id="Loginbtn" onclick='LoadLoginBox(1)'>Log-In</button>
                <button class="userbtn" id="CreateAcc" onclick='LoadLoginBox(2)'>Create Acc</button>
                <button class="userbtn" id="NewPost" onclick='LoadCreateEventBox()'>CreateEvent</button>
            </div>
            <div id="UserInput">

            </div>
        </div>
        <div id="Mid" class="Pillar">
        </div>
        <div id="Right" class="Pillar">
            <button class="filterbtn" id="made" onclick='LoadAllEvents()'>All Events</button>
            <button class="filterbtn" id="made">Events Made</button>
            <button class="filterbtn" id="pending">Pending Events</button>
            <button class="filterbtn" id="joined">Joined Events</button>
            <button class="filterbtn" id="declined">Declined Events</button>
            <button class="filterbtn" id="UpdateAuth">Change User Auth</button>
        </div>
    </div>
    <script src="BackEnd.js"></script>
</body>

</html>