<?php
include("General.php");
$FH = MyFileHandler::getFileHandler();
//Compressed Functions


function UnsetFromArray($array, $ID, $IDParam, $SerchFor)
{
    if (!empty($array[$ID][$IDParam])) {
        $Key = array_search($SerchFor, $array[$ID][$IDParam]);
        echo "  Key" . $Key;
        if (isset($Key)) {
            unset($SerchFor, $array[$ID][$IDParam][$Key]);
        }
    }
    return $array;
}

function getEventsList()
{
    global $FH;
    echo $FH->getEventsData();
}

//assume that $eventData is Array ; Chnage Later
function CreateEvent($eventData, $creatorID)
{
    global $FH;
    $Events = $FH->getEventsDataArray();
    $EventID = strval(intval(array_key_last($Events)) + 1);
    $Events[$EventID] = $eventData;
    print_r($Events);
    $FH->setEventsData($Events);

    $Users = $FH->getUserDataArray();
    array_push($Users[$creatorID]['posted_Events'], intval($EventID));
    $FH->setUserData($Users);
}



//delete events in all users
function DeleteEvent($eventID, $creatorID)
{
    global $FH;
    $Events = $FH->getEventsDataArray();
    $Users = $FH->getUserDataArray();
    $UserIDs = array_merge($Events[$eventID]['Pending'], $Events[$eventID]['Joining'], $Events[$eventID]['Declined']);
    print_r($UserIDs);
    unset($Events[$eventID]);
    foreach ($UserIDs as $ID => $detail) {
        $Users = UnsetFromArray($Users, $detail, 'joined_Events', $eventID);
    }
    $FH->setEventsData($Events);

    $Users = UnsetFromArray($Users, $creatorID, 'posted_Events', $eventID);
    $FH->setUserData($Users);

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
    array_push($Events[$eventID]['Pending'], $userID);
    $FH->setEventsData($Events);

    $Users = $FH->getUserDataArray();
    array_push($Users[$userID]['joined_Events'], $eventID);
    $FH->setUserData($Users);
}
function UserAcceptEvent($eventID, $userID, $Mode)
{
    global $FH;
    $Events = $FH->getEventsDataArray();
    $Events = UnsetFromArray($Events, $eventID, 'Pending', $userID);
    if ($Mode == 1) {
        array_push($Events[$eventID]['Joining'], $userID);
    } else if ($Mode = 0) {
        array_push($Events[$eventID]['Declined'], $userID);
    }
    $FH->setEventsData($Events);
}
function createComment($comment)
{
    echo $comment;
    echo "<br />";
}

if (isset($_POST['type'])) {
    //createComment("Found Post");
    switch ($_POST['type']) {
        case '0':
            getEventsList();
            break;
        case '1':
            createComment("Type 1");
            //parse data
            if (isset($_POST['data']) && isset($_POST['userID'])) {
                //print_r($_POST['data']);
                $tempEvent = json_decode($_POST['data']);
                //print_r($tempEvent);
                $tempEvent = CreateEventTemplate($tempEvent);
                CreateEvent($tempEvent, $_POST['userID']);
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
        case '4':
            createComment("Type 4: Add User to Event");
            print_r($_POST);
            if (isset($_POST['userID']) && isset($_POST['eventID']) && isset($_POST['mode'])) {
                UserAcceptEvent(intval($_POST['eventID']), intval($_POST['userID']), intval($_POST['mode']));
                break;
            }
            echo "Not Set";
            break;
        case '5':
            if (isset($_POST['creatorID']) && isset($_POST['eventID'])) {
                DeleteEvent(intval($_POST['eventID']), intval($_POST['creatorID']));
                break;
            }
            break;
        default:
            //Error
            echo "Error type not found";
            break;
    }
}




?>