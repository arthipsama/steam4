<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Product Test from PostgreSQL</title>
</head>
<body>
    <h2>Product Test from PostgreSQL</h2>

    <?php
    $connection = pg_connect("host=34.142.167.72 port=5432 dbname=postgres user=admin password=12345");
    if (!$connection){
        echo "An Error Database. <br>";
        exit;
    }

    $result = pg_query($connection, "SELECT * FROM room1");
    if (!$result){
        echo "An Error retrieving data. <br>";
        exit;
    }

    ?>
    
    <table>
        <tr>
            <th>ID</th>
            <th>Type Room</th>
            <th>Price Room</th>
        </tr>

        <?php
        while($row = pg_fetch_assoc($result)){
            echo "
            <tr>
                <td>{$row['id']}</td>
                <td>{$row['type_room']}</td>
                <td>{$row['pice_room']}</td>
            </tr>
            ";
        }
        ?>

    </table>
    
</body>
</html>
