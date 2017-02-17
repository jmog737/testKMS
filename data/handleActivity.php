<?php
require_once ("baseMysql.php");

//Conexión con la base de datos:
$dbc = crearConexion(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);

//$query = $_GET["query"];
$query = "update actividades set fecha='2016-06-10', horaInicio='10:30:00', horaFin='13:30:00', motivo='Carga inicial de llaves ITAU.', usuario1=1, usuario2=2, rolUsuario1='CISO', rolUsuario2='KM'  where idactividades=1";

$result = consultarBD($query, $dbc);

if ($result === TRUE) {
  $dato = '{"resultado":"OK"}';
  $json = json_encode($dato);
  echo $json;
}

?>