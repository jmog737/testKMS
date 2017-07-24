<?php
require('data\baseMysql.php');
require_once('..\..\fpdf\mc_table.php');
//***************************** DESTINATARIOS CORREOS ***********************************************************************************************
$paraListados = array();
$copiaListados = array();
$ocultosListados = array();

$paraRemito = array();
$copiaRemito = array();
$ocultosRemito = array();

//**************** PRUEBAS ************************************************************
$copiaListados['Juan Martín Ortega'] = "juanortega@emsa.com.uy";
$copiaRemito['Juan Martín Ortega'] = "juanortega@emsa.com.uy";
//**************** FIN PRUEBAS ********************************************************

//****************************************************IMPORTANTE:************************************************************************************
//                                              SETEO DE LAS CARPETAS
$dir = "D:/PROCESOS/KMS";

//***************************************************************************************************************************************************

class PDF extends PDF_MC_Table
  {
  //Cabecera de página
  function Header()
    {
    global $fecha, $hora, $titulo, $x;
    //Agrego logo de EMSA:
    $this->Image('images/logotipo.jpg', 3, 3, 50);
    $this->setY(10);
    $this->setX(10);
    //Defino características para el título y agrego el título:
    $this->SetFont('Arial', 'BU', 18);
    $this->Cell(200, 3, $titulo, 0, 0, 'C');
    $this->Ln();

    $this->setY(8);
    $this->setX(187);
    $this->SetFont('Arial');
    $this->SetFontSize(10);
    $this->Cell(20, 3, $fecha, 0, 0, 'C');

    $this->setY(11);
    $this->setX(187);
    $this->SetFont('Arial');
    $this->SetFontSize(10);
    $this->Cell(20, 3, $hora, 0, 0, 'C');

    //Dejo el cursor donde debe empezar a escribir:
    $this->Ln(20);
    $this->setX($x);
    }

  //Pie de página
  function Footer()
    {
    global $pag;
    $this->SetY(-10);
    $this->SetFont('Arial', 'I', 8);
    $this->Cell(0, 10, 'Pag. ' . $this->PageNo(), 0, 0, 'C');
    }

  //Tabla tipo listado
  function agregarTablaListado()
    {
    global $totalCampos, $x;
    global $registros, $campos, $largoCampos, $tituloTabla, $tipoConsulta;

    //Defino color de fondo:
    $this->SetFillColor(255, 156, 233);
    //Defino color para los bordes:
    $this->SetDrawColor(0, 0, 0);
    //Defino grosor de los bordes:
    $this->SetLineWidth(.3);
    //Defino tipo de letra y tamaño para el Título:
    $this->SetFont('Courier', 'B', 9);
    //Establezco las coordenadas del borde de arriba a la izquierda de la tabla:
    $this->SetY(25);

    $this->SetX($x);
    $this->MultiCell($largoCampos[$totalCampos], 7, $tipoConsulta, 0, 'C', 0);
    $this->Ln(10);
    
    //************************************** TÍTULO *****************************************************************************************
    $this->SetX($x);
    //Defino color de fondo:
    $this->SetFillColor(153, 255, 102);
    //Escribo el título:
    $this->Cell($largoCampos[$totalCampos], 7, $tituloTabla, 1, 0, 'C', 1);
    $this->Ln();
    //**************************************  FIN TÍTULO ************************************************************************************
    
    //Restauro color de fondo y tipo de letra para el contenido:
    $this->SetFillColor(255, 204, 120);
    $this->SetTextColor(0);
    $this->SetFont('Courier');
    $this->SetX($x);

    $this->SetFont('Courier', 'B', 9);
    $j = 0;
    foreach ($campos as $i => $dato) {
      $this->Cell($largoCampos[$j], 6, $campos[$i], 'LRBT', 0, 'C', true);
      $j++;
      }
      
    $this->Ln();
    $this->SetX($x);
    $this->SetFont('Courier');    
    $fill = false;
    foreach ($registros as $i => $dato) {
      
      $this->Row($dato, $fill);
      $this->SetX($x);
      $fill = !$fill;
    }
  }
  
  //Tabla con todos los detalles de la actividad
  function detalleActividad() {
    global $datos, $tituloTabla;
    global $c1;
    
    //Defino color de fondo:
    $this->SetFillColor(255, 156, 233);
    //Defino color para los bordes:
    $this->SetDrawColor(0, 0, 0);
    //Defino grosor de los bordes:
    $this->SetLineWidth(.3);
    //Defino tipo de letra y tamaño para el Título:
    $this->SetFont('Courier', 'B', 9);
    //Establezco las coordenadas del borde de arriba a la izquierda de la tabla:
    $this->SetY(25);

    //************************************** GENERAL ********************************************************************************************
    $this->SetX(45);
    //Defino color de fondo:
    $this->SetFillColor(153, 255, 102);
    //Escribo el título:
    $this->Cell(7*$c1, 7, $tituloTabla, 1, 0, 'C', 1);
    $this->Ln();

    //Restauro color de fondo y tipo de letra para el contenido:
    $this->SetFillColor(255, 204, 120);
    $this->SetTextColor(0);
    $this->SetFont('Courier');
    $this->SetX(45);
    
    ///Línea con el motivo de la actividad:
    $this->SetFont('Courier', 'B', 9);
    $this->Cell($c1, 7, "Motivo:", 1, 0, 'C', 1);
    $this->SetFont('Courier');
    $this->Cell(6*$c1, 7, $datos["actividad"]["motivo"], 1, 0, 'C', 0);
    $this->Ln();
    $this->SetX(45);
    
    ///Línea con la fecha y horas de la actividad. 
    ///Previo a eso, reacomodo las hora para una mejor visualización:
    $h1 = explode(':', $datos["actividad"]["horaInicio"]);
    $horaInicio = $h1[0].':'.$h1[1];
    $h2 = explode(':', $datos["actividad"]["horaFin"]);
    $horaFin = $h2[0].':'.$h2[1];
    
    $this->SetFont('Courier', 'B', 9);
    $this->Cell($c1, 7, "Fecha:", 1, 0, 'C', 1);
    $this->SetFont('Courier');
    $this->Cell(2*$c1, 7, $datos["actividad"]["fecha"], 1, 0, 'C', 0);
    $this->SetFont('Courier', 'B', 9);
    $this->Cell($c1, 7, "Inicio:", 1, 0, 'C', 1);
    $this->SetFont('Courier');
    $this->Cell($c1, 7, $horaInicio, 1, 0, 'C', 0);
    $this->SetFont('Courier', 'B', 9);
    $this->Cell($c1, 7, "Fin:", 1, 0, 'C', 1);
    $this->SetFont('Courier');
    $this->Cell($c1, 7, $horaFin, 1, 0, 'C', 0);
    $this->Ln();
    $this->SetX(45);
    
    ///Línea con el subtitulo de Personal de la Empresa:
    //Defino color de fondo:
    $this->SetFillColor(153, 255, 102);
    //Defino tipo de letra y tamaño para el SubTítulo:
    $this->SetFont('Courier', 'B', 9);
    //Escribo el subtítulo:
    $this->Cell(7*$c1, 7, "PERSONAL DE LA EMPRESA", 1, 0, 'C', 1);
    $this->Ln();
    $this->SetX(45);
    $this->SetFillColor(255, 204, 120);
    $this->Cell(3.5*$c1, 7, "Nombre", 1, 0, 'C', 1);
    $this->Cell(3.5*$c1, 7, "Rol", 1, 0, 'C', 1);
    //Restauro color de fondo y tipo de letra para el contenido:
    $this->SetFillColor(255, 204, 120);
    $this->SetTextColor(0);
    $this->Ln();
    $this->SetX(45);
    
    ///Línea con el nombre y rol del primer usuario de la empresa:
    $this->SetFont('Courier');
    $this->Cell(3.5*$c1, 7, utf8_decode($datos["usuario1"]["nombre"])." ".utf8_decode($datos["usuario1"]["apellido"]), 1, 0, 'C', 0);
    $this->Cell(3.5*$c1, 7, $datos["actividad"]["rolUsuario1"], 1, 0, 'C', 0);
    $this->Ln();
    $this->SetX(45);
    ///Línea con el nombre y rol del segundo usuario de la empresa:
    $this->SetFont('Courier');
    $this->Cell(3.5*$c1, 7, utf8_decode($datos["usuario2"]["nombre"])." ".utf8_decode($datos["usuario2"]["apellido"]), 1, 0, 'C', 0);
    $this->Cell(3.5*$c1, 7, $datos["actividad"]["rolUsuario2"], 1, 0, 'C', 0);
    $this->Ln();
    $this->SetX(45);
    
    ///Chequeo si existen referencias para la actividad:
    if ($datos["referencia"] !== null) {
      //Defino tipo de letra y tamaño para el SubTítulo:
      $this->SetFont('Courier', 'B', 9);
      $this->SetFillColor(153, 255, 102);
      //Escribo el subtítulo:
      $this->Cell(7*$c1, 7, "REFERENCIAS", 1, 0, 'C', 1);
      $this->Ln();
      $this->SetX(45);
      
      foreach ($datos["referencia"] as $indice => $registro) {
        ///Línea con el código y resumen de la referencia:
        $this->SetFont('Courier');
        $this->Cell(2*$c1, 7, utf8_decode($registro["codigo"]), 1, 0, 'C', 0);
        $this->Cell(5*$c1, 7, utf8_decode($registro["resumen"]), 1, 0, 'C', 0);
        $this->Ln();
        $this->SetX(45);
        }
    }  
  }
  
  function detalleUsuario($registro) {
    $nombre = $registro->nombre;
    $apellido = $registro->apellido;
    $empresa = $registro->empresa;
    $estado = $registro->estado;
    $obs = $registro->observaciones;
    $tel = $registro->telefono;
    $mail = $registro->mail;
    
    global $c1, $x, $tituloTabla;
    
    //Defino color de fondo:
    $this->SetFillColor(255, 156, 233);
    //Defino color para los bordes:
    $this->SetDrawColor(0, 0, 0);
    //Defino grosor de los bordes:
    $this->SetLineWidth(.3);
    //Defino tipo de letra y tamaño para el Título:
    $this->SetFont('Courier', 'B', 9);
    //Establezco las coordenadas del borde de arriba a la izquierda de la tabla:
    $this->SetY(25);
    
    //************************************** TÍTULO *****************************************************************************************
    $this->SetX($x);
    //Defino color de fondo:
    $this->SetFillColor(153, 255, 102);
    //Escribo el título:
    $this->Cell(5*$c1, 7, $tituloTabla, 1, 0, 'C', 1);
    $this->Ln();
    //**************************************  FIN TÍTULO ************************************************************************************
    
    //Restauro color de fondo y tipo de letra para el contenido:
    $this->SetFillColor(255, 204, 120);
    $this->SetTextColor(0);
    $this->SetFont('Courier');
    $this->SetX($x);

    $this->SetFont('Courier', 'B', 9);
    $this->Cell($c1, 7, 'APELLIDO:', 1, 0, 'L', 1);
    $this->SetFont('Courier'); 
    $this->Cell(1.5*$c1, 7, utf8_decode($apellido), 1, 0, 'C', 0);
    $this->SetFont('Courier', 'B', 9);
    $this->Cell($c1, 7, 'NOMBRE:', 1, 0, 'L', 1);
    $this->SetFont('Courier'); 
    $this->Cell(1.5*$c1, 7, utf8_decode($nombre), 1, 0, 'C', 0);
    
    $this->Ln();
    $this->SetX($x);
    
    $this->SetFont('Courier', 'B', 9);
    $this->Cell($c1, 7, 'EMPRESA:', 1, 0, 'L', 1);
    $this->SetFont('Courier'); 
    $this->Cell(1.5*$c1, 7, utf8_decode($empresa), 1, 0, 'C', 0);
    $this->SetFont('Courier', 'B', 9);
    $this->Cell($c1, 7, 'ESTADO:', 1, 0, 'L', 1);
    $this->SetFont('Courier'); 
    $this->Cell(1.5*$c1, 7, utf8_decode($estado), 1, 0, 'C', 0);
    
    $this->Ln();
    $this->SetX($x);
    
    $this->SetFont('Courier', 'B', 9);
    $this->Cell($c1, 7, 'MAIL:', 1, 0, 'L', 1);
    $this->SetFont('Courier'); 
    $this->Cell(4*$c1, 7, utf8_decode($mail), 1, 0, 'C', 0);
    
    $this->Ln();
    $this->SetX($x);
    
    $this->SetFont('Courier', 'B', 9);
    $this->Cell($c1, 7, utf8_decode('TELÉFONO:'), 1, 0, 'L', 1);
    $this->SetFont('Courier'); 
    $this->Cell(4*$c1, 7, utf8_decode($tel), 1, 0, 'C', 0);
    
    $this->Ln();
    $this->SetX($x);
    
    $this->SetFont('Courier', 'B', 9);
    $this->Cell(1.6*$c1, 7, utf8_decode('OBSERVACIONES:'), 1, 0, 'L', 1);
    $this->SetFont('Courier'); 
    $this->MultiCell(3.4*$c1, 7, utf8_decode($obs), 1, 'C', 0);
    
    }
  
}

function recuperarActividad($actividad) {
  $datos = array();
  //Conexión con la base de datos:
  $dbc = crearConexion(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);
  $consultaActividad = "select * from actividades where idactividades=".$actividad."";
  $result = consultarBD($consultaActividad, $dbc);
  while (($fila = $result->fetch_array(MYSQLI_ASSOC)) != NULL) { 
    $datos['actividad'] = $fila;
  }
  $usuario1 = $datos['actividad']['usuario1'];
  $usuario2 = $datos['actividad']['usuario2'];

  // Reacomodo fecha a formato habitual: dd/mm/aaaa
  $fecha = $datos['actividad']['fecha'];
  $separo = explode('-', $fecha);
  $fecha = $separo[2]."/".$separo[1].'/'.$separo[0];
  $datos["actividad"]["fecha"] = $fecha;

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
  
  $consultaRef = "select idreferencias, codigo, resumen, slot from referencias where estado='activa' and actividad='".$actividad."'";
  $result3 = consultarBD($consultaRef, $dbc);
  if ($result3->num_rows > 0) {
    while (($fila = $result3->fetch_array(MYSQLI_ASSOC)) != NULL) { 
      $datos['referencia'][] = $fila;
    }
  }
  else {
    $datos['referencia'] = null;
    }
  return $datos;
  }

//********************************************* Defino tamaño de la celda base: c1, y el número ************************************************
$pag = 1;
$c1 = 18;
//******************************************************** FIN tamaños de celdas ***************************************************************

//******************************************************** INICIO Hora y título ****************************************************************
$hoy = getdate();
$fecha = $hoy[mday] . '/' . $hoy[mon] . '/' . $hoy[year];
$horaLocal = localtime(time(), true);
//Acomodo formato de la hora para que siempre tengan 2 dígitos:
if ($horaLocal["tm_min"] < 10)
  {
  $horaLocal["tm_min"] = "0" . $horaLocal["tm_min"];
  }
if ($horaLocal["tm_sec"] < 10)
  {
  $horaLocal["tm_sec"] = "0" . $horaLocal["tm_sec"];
  }
$hora = $horaLocal["tm_hour"] . ":" . $horaLocal["tm_min"] ;//. ":" . $horaLocal["tm_sec"];

$titulo = utf8_decode('Resultado de la exportación');
//********************************************************** FIN Hora y título *****************************************************************

//RECUPERO ID PASADO con el tipo de dato a exportar y sus parámetros:
$param = $_POST["param"];
$temp1 = explode("&", $param);

foreach ($temp1 as $valor) {
  $temp2 = explode(":", $valor);
  switch ($temp2[0]) {
    case 'id': $id = $temp2[1];
               break;
    case 'query': $query = $temp2[1];
                  break;
    case 'largos': $largos = $temp2[1];
                   $temp = explode('-', $largos);
                   break;
    case 'campos': $campos1 = utf8_decode($temp2[1]);
                   $campos = preg_split("/-/", $campos1);
                   break;
    case 'idslot': $idslot = $temp2[1];
                   break;
    case 'idkey': $idkey = $temp2[1];
                  break;
    case 'idcert': $idcert = $temp2[1];
                   break;
    case 'idref': $idref = $temp2[1];
                   break;             
    case 'actividad': $idactivity = $temp2[1];
                      break;
    case 'x': $x = $temp2[1];
              break;
    case 'iduser': $iduser = $temp2[1];
                   break;
    default: break;                
  }
}
$largoCampos = array();
$largoTotal = 0;
foreach ($temp as $valor) {
 $largo = $c1*$valor;
 array_push($largoCampos, $largo);
 $largoTotal += $largo;
}
array_push($largoCampos, $largoTotal);
//echo "id: ".$id."<br>query: ".$query."<br>largos: ".$largos."<br>campos: ".$campos1."<br>x: ".$x."<br>idslot: ".$idslot."<br>idkey: ".$idkey."<br>idcert: ".$idcert."<br>actividad: ".$idactivity."<br>FIN<br>";

//Instancio objeto de la clase:
$pdfResumen = new PDF();
//Agrego una página al documento:
$pdfResumen->AddPage();

switch ($id) {
  case "1": $query = "select fecha, motivo from actividades order by fecha desc, idactividades asc";
            $largoCampos = array($c1, 1.5*$c1, 3.5*$c1, 6*$c1);
            $campos = array("Id", "Fecha", "Motivo");
            $tituloTabla = utf8_decode("LISTADO DE ACTIVIDADES");
            $x = 55;
            break;
  case "2": $datos = recuperarActividad($idactivity);
            $tituloTabla = utf8_decode("DETALLE DE LA ACTIVIDAD");
            $x = 45;
            break;
  case "3": 
            $tituloTabla = utf8_decode("DETALLE DE LA REFERENCIA");
            break;
  case "4": $query = "select * from llaves where idkeys=".$idkey."";
            $tituloTabla = utf8_decode("DETALLE DE LA LLAVE");
            break;
  case "5": $query = "select * from certificados where idcertificados=".$idcert."";
            $tituloTabla = utf8_decode("DETALLE DEL CERTIFICADO");
            break;
  case "6": $tituloTabla =  utf8_decode("DETALLE DE LA CONSULTA");
            $tipoConsulta = utf8_decode($_POST["tipoConsulta"]);
            break;
  case "7": $tituloTabla =  utf8_decode("DETALLE DEL USUARIO");
            $query = "select * from usuarios where idusuarios=".$iduser."";
            $x = 65;
            break;
  case "8": $tituloTabla =  utf8_decode("DETALLE DEL SLOT");
            $query = "select * from slots where idslots='".$idslot."'"; /* ****** VER CONSULTA********/
            break;        
  default: break;
}

$totalCampos = sizeof($campos);
echo $query;
// Conectar con la base de datos
$con = crearConexion(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);
$resultado1 = consultarBD($query, $con);

if (($id == 1)||($id == 6)) {
  $pdfResumen->SetWidths($largoCampos);
  $filas = obtenerResultadosArray($resultado1);
  $registros = array();
  $i = 1;
  foreach($filas as $fila)
    {
    array_unshift($fila, $i);
    $i++;
    $registros[] = $fila;
  }
  $pdfResumen->agregarTablaListado();    
}
else {
  $filas = obtenerResultados($resultado1);
  $registro = $filas[1];
  switch ($id) {
    case "2": $pdfResumen->detalleActividad($datos);
              break;
    case "3": $pdfResumen->detalleReferencia($registro);
              break;
    case "4": $pdfResumen->detalleLlave($registro);
              break;
    case "5": $pdfResumen->detalleCertificado($registro);
              break;
    case "7": $pdfResumen->detalleUsuario($registro);
              break;
    case "8": $pdfResumen->detalleSlot($registro);
              break;
    default: break;
  }
}
$nombreReporte = "resultadoExportacion.pdf";
$dir = $dir . "/" . $nombreReporte;
$pdfResumen->Output($dir, 'I');
?>
