<?php
require_once ("baseMysql.php");

//Conexión con la base de datos:
$dbc = crearConexion(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);

$query = $_GET["query"];
$actividad = $_GET["actividad"];
//$query = "select * from actividades where estado='activa' and idactividades=3";$actividad = 3;
$result = consultarBD($query, $dbc);

$datos = array();

while (($fila = $result->fetch_array(MYSQLI_ASSOC)) != NULL) { 
  $datos['actividad'] = $fila;
}
$usuario1 = $datos['actividad']['usuario1'];
$usuario2 = $datos['actividad']['usuario2'];

// Reacomodo fecha a formato habitual: dd/mm/aaaa
$fecha = $datos['actividad']['fecha'];
$separo = explode('-', $fecha);

$consultaUsuarios = "select idusuarios, nombre, apellido from usuarios where estado='activo' and empresa='EMSA'";
$result1 = consultarBD($consultaUsuarios, $dbc);
while (($fila = $result1->fetch_array(MYSQLI_ASSOC)) != NULL) { 
  $datos['usuarios'][] = $fila;
}
/*
$consultaUsuario1 = "select nombre, apellido from usuarios where idusuarios='".$usuario1."'";
$result1 = consultarBD($consultaUsuario1, $dbc);
while (($fila = $result1->fetch_array(MYSQLI_ASSOC)) != NULL) { 
  $datos['usuario1'] = $fila;
}

$consultaUsuario2 = "select nombre, apellido from usuarios where idusuarios='".$usuario2."'";
$result2 = consultarBD($consultaUsuario2, $dbc);
while (($fila = $result2->fetch_array(MYSQLI_ASSOC)) != NULL) { 
  $datos['usuario2'] = $fila;
}
*/
$consultaRef = "select idreferencias, codigo, resumen, slot from referencias where actividad='".$actividad."'";
$result3 = consultarBD($consultaRef, $dbc);
if ($result3->num_rows > 0) {
  while (($fila = $result3->fetch_array(MYSQLI_ASSOC)) != NULL) { 
    $datos['referencia'][] = $fila;
    $slot = $fila['slot'];
  }

  $consultaSlot = "select nombre from slots where idslots='".$slot."'";
  $result4 = consultarBD($consultaSlot, $dbc);
  while (($fila = $result4->fetch_array(MYSQLI_ASSOC)) != NULL) { 
    $datos['slot'] = $fila;
  }
}
else {
  $datos['referencia'] = null;
  $datos['slot'] = null;
  }

$json = json_encode($datos);
echo $json;
?>