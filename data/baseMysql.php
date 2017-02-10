<?php
require_once("connectvars.php");

function crearConexion($servidor, $usuario, $pass, $base)
  {
  if (!isset($pass)) {
    $pass = 'jmpp';
    }
  if (!isset($pass)) {
    $usuario = 'root';
    }  
  $mysqli = new mysqli($servidor, $usuario, $pass, $base);
  if ($mysqli->connect_error)
      {
      die('Error de conexión (' . $mysqli->connect_errno.') '.$mysqli->connect_error);
      }
  return $mysqli;
  }

function cerrarConexion($mysqli)
  {
  $mysqli->close();
  }

function consultarBD($consulta, $mysqli)
  {
  $resultado = $mysqli->query($consulta);
  if ($resultado)
      {
      $salida = $resultado;
      }
  else
    {
    $salida = $mysqli->error;
  }
  //$resultado->close();
  return $salida;
  }

function obtenerResultados($resultado)
  {
  $i = 1;
  while ($obj = $resultado->fetch_object())
      {
      $salida[$i] = $obj;
      $i++;
      }   
  return $salida;
  }

function mostrarResultados($resultado)
  {
  $campos = $resultado->fetch_fields();
  $tam = count($campos);
  $i = 1;
  echo "<table><tr>";
  foreach ($campos as $campo)
      {
      echo "<td>$campo->name</td>";
      }
  $datos = $resultado->fetch_array(MYSQLI_NUM);
  foreach ($datos as $dato)
      {
      while ($i<=$tam)
          {
          echo "<td>$dato[$i]</td>";
          }
      }
  echo "</tr></table>";    
  }
?>