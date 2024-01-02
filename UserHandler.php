<?php
include("General.php");
$FH = MyFileHandler::getFileHandler();
print_r($FH->getUserDataArray());
echo "<br>";
print_r($FH->getEventsDataArray());

function Login($username, $password)
{
    global $FH;
    $Users = $FH->getUserDataArray();
    foreach ($Users as $ID => $detail) {
        if ($detail['username'] == $username && $detail['password'] == $password) {
            echo $ID;
            return;
        }
    }
    echo '-1';
}

function CreateUser($username, $password)
{

}

function ChangeUserAuth($userID, $AuthLevel)
{

}

function ChangeUserDetails($userID, $Details)
{

}

if (isset($_POST['type'])) {
    switch ($_POST['type']) {
        //login
        case '1':
            $pass = '';
            $user = '';
            if (isset($_POST['username'])) {
                $user = $_POST['username'];
            }
            if (isset($_POST['password'])) {
                $pass = $_POST['password'];
            }
            echo $pass . ';' . $user;

            Login($user, $pass);
            break;
    }
}



?>