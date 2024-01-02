<?php
class MyFileHandler
{
    private static $eventsLoc = "./data/events.json";
    private static $usersLoc = "./data/users.json";

    private static $me = null;


    public static function getFileHandler()
    {
        if (self::$me === null) {
            self::$me = new self();
        }
        return self::$me;
    }

    private function __construct()
    {

    }

    private function setData($Data, $Path)
    {
        //for pretty print json->string
        $js_String = json_encode($Data, JSON_PRETTY_PRINT);
        $file = fopen($Path, 'w');
        fwrite($file, $js_String);
        fclose($file);
    }


    private function getData($path)
    {
        return file_get_contents($path);
    }

    function getEventsData()
    {
        return self::getData(self::$eventsLoc);
    }

    function getUsersData()
    {
        return self::getData(self::$usersLoc);
    }

    function getUserDataArray()
    {
        return json_decode(self::getUsersData(), true);
    }

    function getEventsDataArray()
    {
        return json_decode(self::getEventsData(), true);
    }

    function setEventsData($EventData)
    {

        self::setData($EventData, self::$eventsLoc);
    }

    function setUserData($UserData)
    {
        self::setData($UserData, self::$usersLoc);
    }

}
$template_EventData = [
    'Name' => 'Casa Party',
    'Description' => 'Not Filled',
    'Time' => '12:00',
    'Organizer' => '0',
    'Pending' => [],
    'Joining' => []
];


$template_UserData = [
    'username' => '',
    'password' => '',
    'level' => '1',
    'posted_Events' => [],
    'joined_Events' => [],
    "accepted_Events" => []
];


function CreateEventTemplate($PostInfo)
{
    global $template_EventData;
    //print_r($PostInfo);
    $PostInfo = (array) $PostInfo;
    $resultEvent = $template_EventData;
    if (isset($PostInfo['Name'])) {
        $resultEvent['Name'] = $PostInfo['Name'];
    }
    if (isset($PostInfo['Description'])) {
        $resultEvent['Description'] = $PostInfo['Description'];
    }
    if (isset($PostInfo['Time'])) {
        $resultEvent['Time'] = $PostInfo['Time'];
    }
    if (isset($PostInfo['Organizer'])) {
        $resultEvent['Organizer'] = $PostInfo['Organizer'];
    }
    //print_r($resultEvent);
    return $resultEvent;
}

function CreateUserTemplate($userName, $passWord)
{
    global $template_UserData;
    $resultUser = $template_UserData;
    $resultUser['username'] = $userName;
    $resultUser['password'] = $passWord;
    return $resultUser;
}

?>