<?php
include("General.php");
$FH = MyFileHandler::getFileHandler();


function CreateEvent($eventData)
{

}
function DeleteEvent($eventID)
{

}
function ChangeEvent($eventID, $eventData)
{

}
function UserJoinEvent($eventData, $userID)
{

}
function UserAcceptEvent($eventData, $userID)
{

}

print_r($FH->getUserDataArray());
echo "<br>";
print_r($FH->getEventsDataArray());


?>