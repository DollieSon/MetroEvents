<?php
include("General.php");
$FH = MyFileHandler::getFileHandler();

function CreatePost($postData)
{

}
function DeletePost($postID)
{

}
function ChangePost($postID, $postData)
{

}
function UserJoinPost($postData, $userID)
{

}
function UserAcceptPost($postData, $userID)
{

}

print_r($FH->getUserDataArray());
echo "<br>";
print_r($FH->getPostDataArray());


?>