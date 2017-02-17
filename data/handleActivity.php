<?php
require_once ("baseMysql.php");

//Conexión con la base de datos:
$dbc = crearConexion(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);

$query = $_GET["query"];

$result = consultarBD($query, $dbc);

while (($fila = $result->fetch_array(MYSQLI_ASSOC)) != NULL) { 
  $datos = $fila;
}

$json = json_encode($datos);
echo $json;
?>