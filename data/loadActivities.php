<?php
require_once ("baseMysql.php");

//Conexión con la base de datos:
$dbc = crearConexion(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);

$query = $_GET["query"];
$activities = array();

$result = consultarBD($query, $dbc);

while (($fila = $result->fetch_array(MYSQLI_ASSOC)) != NULL) { 
  $activities['actividad'][] = $fila;
}

$json = json_encode($activities);
echo $json;
?>