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

</head>

<body>
    <?php echo "Hello"; ?>

    <script>
        users = <?php echo $FH->getUsersData(); ?>;
        console.log(users);
    </script>
    <script src="BackEnd.js"></script>
</body>

</html>