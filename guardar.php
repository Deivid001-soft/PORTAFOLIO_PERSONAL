<?php
//informacion de base de datos
$servername = "localhost: 3307";
$username = "root";
$password = "";
$database = "miproyecto";

//conexion con la base de datos
$conn = new mysqli($servername, $username, $password, $database);

//verifica la conexion
if ($conn->connect_error) {
    die("error de conexion:" . $conn->connect_error);
}

//obtiene el mensaje del formulario
$mensaje = $_POST['mensaje'];

//escribe el mensaje en la base de datos
$sql = "INSERT INTO mensajes (mensaje) VALUES ('$mensaje')";

if ($conn->query($sql) === TRUE) {
    echo "<center>¡Mensaje guardado con exito!</center>";
} else {
    echo "error:" . $sql . "<br>" . $conn->error;
}

//cierra la conexion
$conn->close();
?>
<br><br>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body style="background-color: gray;">
    <form action="mensajes.php" method="post">
        <input type="submit" value = "Mostrar mensajes" class="text-align-guardar">
    </form>
    
</body>
</html>