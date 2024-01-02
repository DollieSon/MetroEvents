<?php
include("General.php");
$FH = MyFileHandler::getFileHandler();
function getUserList()
{
    global $FH;
    $Users = $FH->getUserDataArray();
    foreach ($Users as $key => $Dets) {
        unset($Users[$key]["password"]);
    }
    echo json_encode($Users);
}

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
    global $FH;
    $Users = $FH->getUserDataArray();
    $tempUser = CreateUserTemplate($username, $password);
    $ID = strval(intval(array_key_last($Users)) + 1);
    $Users[$ID] = $tempUser;
    $FH->setUserData($Users);
    echo $ID;
}

function ChangeUserAuth($userID, $AuthLevel)
{
    global $FH;
    $Users = $FH->getUserDataArray();
    $Users[$userID]['level'] = $AuthLevel;
    echo "ID:" . $userID . " Level:" . $AuthLevel;
    $FH->setUserData($Users);
}

function ChangeUserDetails($userID, $username, $password)
{
    global $FH;
    $Users = $FH->getUserDataArray();
    $change = $Users[$userID];
    if ($username != '') {
        $change['username'] = $username;
    }
    if ($password != '') {
        $change['password'] = $password;
    }
    $Users[$userID] = $change;
    echo 'pass:' . $password . 'user:' . $username;
    $FH->setUserData($Users);
}

if (isset($_POST['type'])) {
    switch ($_POST['type']) {
        case '0':
            getUserList();
            break;
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
            //echo $pass . ';' . $user;
            Login($user, $pass);
            break;
        //create User
        case '2':
            $pass = '';
            $user = '';
            if (isset($_POST['username'])) {
                $user = $_POST['username'];
            }
            if (isset($_POST['password'])) {
                $pass = $_POST['password'];
            }
            CreateUser($user, $pass);
            break;
        case '3': //Change AuthLevel
            if (isset($_POST['userID']) && isset($_POST['Level'])) {
                ChangeUserAuth($_POST['userID'], $_POST['Level']);
            }
            break;
        case '4':
            if (isset($_POST['userID'])) {
                $pass = '';
                $user = '';
                if (isset($_POST['username'])) {
                    $user = $_POST['username'];
                }
                if (isset($_POST['password'])) {
                    $pass = $_POST['password'];
                }
                ChangeUserDetails($_POST['userID'], $user, $pass);
            }
            break;
        default:

            break;
    }
}



?>