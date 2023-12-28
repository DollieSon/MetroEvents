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
        $js_String = json_decode($Data, JSON_PRETTY_PRINT);
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



?>