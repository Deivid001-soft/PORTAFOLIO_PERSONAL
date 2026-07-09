<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Mensajes Guardados</title>
    <style>
        body {
            background-color: #a09a9aff;
            font-family: Arial, sans-serif;
            margin: 20px;
        }
        h2 {
            color: white;
            -webkit-text-stroke-width: 0.5px; /* Grosor del borde */
            -webkit-text-stroke-color: black; /* Color del borde */
            text-align: center;
        }
        .contenedor-mensajes {
            display: flex; /*estilo o magia de flex*/
            flex-wrap: wrap;
            gap: 10px;
            justify-content: center;

        }
        .mensaje {
            background-color: gray;
            border: 1px solid #ddd;
            padding: 15px;
            margin-bottom: 10px;
            border-radius: 12px;
            box-shadow: 0 2px 5px  rgba(0,0,0,0,1);
            width: 300px;
            box-sizing: border-box;
        }
        .mensaje strong {
            display: block;
            margin-bottom: 5px;
            color: #2b1902ff;
        }
        .mensaje small {
            color: #e2d1d1ff;
            font-size: 0.8em;
        }
.button-regresar {
  background-color: #080808ff;
  border-radius: 12px;
  color: hsla(224, 83%, 47%, 1.00)(236, 12, 12, 1)010ff;
  cursor: pointer;
  font-weight: bold;
  padding: 10px 15px;
  position: relative;
  left: 600px;
  text-align: center;
  text-decoration: none;
  transition: 200ms;
  width: 10%;
  box-sizing: border-box;
  border: 0;
  font-size: 16px;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
}
.button-regresar:not(:disabled):hover {
  outline: 0;
  background: #d80707ff;
  box-shadow: 0 0 0 2px rgba(0,0,0,.2), 0 3px 8px 0 rgba(0,0,0,.15);
}

.button-regresar:disabled {
  filter: saturate(0.2) opacity(0.5);
  -webkit-filter: saturate(0.2) opacity(0.5);
  cursor: not-allowed;
}

    </style>
    
</head>
<body>
    <h2>Mensajes Guardados</h2><br><br>
    <div class="contenedor-mensajes">
    
    <?php

    $servername = "localhost: 3307";
    $username = "root";
    $password = "";
    $database = "miproyecto";

    // Conexión a la base de datos
    $conn = new mysqli($servername, $username, $password, $database);

    // Verificar la conexión
    if ($conn->connect_error) {
        die("Error de conexión: " . $conn->connect_error);
    }

    // Consulta SQL para seleccionar todos los mensajes
    $sql = "SELECT mensaje, fecha FROM mensajes ORDER BY id DESC";
    $resultado = $conn->query($sql);

    if ($resultado->num_rows > 0) {
        // Recorrer los resultados y mostrar cada mensaje
        while($row = $resultado->fetch_assoc()) {
            echo "<div class='mensaje'>";
            echo "<strong>Mensaje:</strong> " . $row["mensaje"] . "<br>";
            echo "<small>Fecha: " . $row["fecha"] . "</small>";
            echo "</div>";
        }
    } else {
        echo "Aún no hay mensajes guardados.";
    }

    $conn->close();

    ?>
    </div>

    <button class="button-regresar" role="button"><a href="index.html">regresar</a></button>

</body>
</html>