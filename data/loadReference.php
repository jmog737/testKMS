<?php
require_once ("baseMysql.php");

//Conexión con la base de datos:
$dbc = crearConexion(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);

$query = $_GET["query"];
//$query = "select referencias.idreferencias, referencias.actividad, referencias.codigo, referencias.lugar, referencias.plataforma, referencias.aplicacion, referencias.resumen, referencias.detalles, hsm.idhsm, slots.idslots as idslot from referencias inner join slots on referencias.slot=slots.idslots inner join hsm on hsm.idhsm=slots.hsm where referencias.idreferencias=2";
$result = consultarBD($query, $dbc);

$datos = array();

while (($fila = $result->fetch_array(MYSQLI_ASSOC)) != NULL) { 
  $datos['referencia'] = $fila;
}

//en base al idslot recuperado, armo consulta para "marcar" cual es el slot a mostrar:
$slot = $datos['referencia']['idslot'];
$query = "select nombre from slots where idslots='".$slot."'";
$result0= consultarBD($query, $dbc);
while (($fila = $result0->fetch_array(MYSQLI_ASSOC)) != NULL) { 
  $nombreSlot = $fila['nombre'];
}
$datos['nombreSlot'] = $nombreSlot;
/*
//en base al idslot recuperado, armo consulta para "marcar" cual es el slot a mostrar:
$query = "select hsm.nombre from slots inner join hsm on slots.hsm=hsm.idhsm where idslots='".$slot."'";
$result2= consultarBD($query, $dbc);
while (($fila = $result2->fetch_array(MYSQLI_ASSOC)) != NULL) { 
  $nombreHSM = $fila['nombre'];
}
$datos['nombreHSM'] = $nombreHSM;
*/
///Armo consulta de forma de NO mostrar duplicados los nombres de los slots (que sí lo son pues
///en los distintos HSMs mantienen el mismo nombre.
$query0 = "select distinct slots.nombre from slots";
$result1= consultarBD($query0, $dbc);

while (($fila1 = $result1->fetch_array(MYSQLI_ASSOC)) != NULL) { 
  $datos['slots'][] = $fila1;
}
/*
$query = "select idslots from slots";
$result2= consultarBD($query, $dbc);

while (($fila = $result2->fetch_array(MYSQLI_ASSOC)) != NULL) { 
  $datos['idslots'][] = $fila;
}
*/

$query = "select idhsm, nombre from hsm";
$result3= consultarBD($query, $dbc);

while (($fila = $result3->fetch_array(MYSQLI_ASSOC)) != NULL) { 
  $datos['hsms'][] = $fila;
}

$json = json_encode($datos);
echo $json;
?>