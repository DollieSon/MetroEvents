<?php
include("General.php");
$FH = MyFileHandler::getFileHandler();




//assume that $eventData is Array ; Chnage Later
function CreateEvent($eventData)
{
    global $FH;
    $Events = $FH->getEventsDataArray();
    $Events[strval(intval(array_key_last($Events)) + 1)] = $eventData;
    print_r($Events);
    $FH->setEventsData($Events);
}

//delete events in all users
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
function createComment($comment)
{
    echo $comment;
    echo "<br />";
}

if (isset($_POST['type'])) {
    //createComment("Found Post");
    switch ($_POST['type']) {
        case '1':
            createComment("Type 1");
            //parse data
            if (isset($_POST['data'])) {
                //print_r($_POST['data']);
                $tempEvent = json_decode($_POST['data']);
                //print_r($tempEvent);
                $tempEvent = CreateEventTemplate($tempEvent);
                CreateEvent($tempEvent);
                //echo "1";
                break;
            }
            //echo "0";
            # code...
            break;

        default:
            //Error
            echo "Error type not found";
            break;
    }
}



print_r($FH->getUserDataArray());
echo "<br>";
print_r($FH->getEventsDataArray());


?>