<?php
include("General.php");
$FH = MyFileHandler::getFileHandler();

//Compressed Functions



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
    global $FH;
    $Events = $FH->getEventsDataArray();
    $EventChosen = $Events[$eventID];
    $EventChosen['Name'] = $eventData['Name'];
    $EventChosen['Description'] = $eventData['Description'];
    $EventChosen['Time'] = $eventData['Time'];
    $Events[$eventID] = $EventChosen;
    $FH->setEventsData($Events);
}
function UserJoinEvent($eventID, $userID)
{
    global $FH;
    $Events = $FH->getEventsDataArray();
    $Pending = $Events[$eventID]['Pending'];
    array_push($Pending, $userID);
    //print_r($Pending);
    $Events[$eventID]['Pending'] = $Pending;
    //print_r($Events);
    $FH->setEventsData($Events);
}
function UserAcceptEvent($eventID, $userID)
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
        case '2':
            createComment("Type 2: Edit Event");
            if (isset($_POST['data']) && isset($_POST['eventID'])) {
                $tempEvent = json_decode($_POST['data']);
                $tempEvent = CreateEventTemplate($tempEvent);
                ChangeEvent(intval($_POST['eventID']), $tempEvent);
                break;
            }
            break;
        case '3':
            createComment("Type 3: Add User to Event");
            print_r($_POST);
            if (isset($_POST['userID']) && isset($_POST['eventID'])) {
                UserJoinEvent(intval($_POST['eventID']), intval($_POST['userID']));
                break;
            }
            echo "Not Set";
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