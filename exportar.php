<?php
require('data\baseMysql.php');
require('..\..\fpdf\fpdf.php');

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
// Destinatarios "reales":
//$paraRemito['Esther Pintos'] = "estherpintos@emsa.com.uy";
//$paraRemito['Natalia Sardas'] = "nataliasardas@emsa.com.uy";
//$copiaRemito['Ensobrado'] = "ensobrado@emsa.com.uy";
//$copiaRemito['Gaston Peña'] = "gastonpena@emsa.com.uy";
//$copiaRemito['Alfonso Llanes'] = "alfonsollanes@emsa.com.uy";
//$copiaRemito['Federico Bogliacino'] = "federicobogliacino@emsa.com.uy";
//$paraListados['Esther Pintos'] = "estherpintos@emsa.com.uy";
//$paraListados['Natalia Sardas'] = "nataliasardas@emsa.com.uy";
//$copiaListados['Ensobrado'] = "ensobrado@emsa.com.uy";
//$copiaListados['Gaston Peña'] = "gastonpena@emsa.com.uy";
//$copiaListados['Alfonso Llanes'] = "alfonsollanes@emsa.com.uy";
//$copiaListados['Federico Bogliacino'] = "federicobogliacino@emsa.com.uy";
//****************************************************IMPORTANTE:************************************************************************************
//                                              SETEO DE LAS CARPETAS
$dir = "D:/PROCESOS/KMS";

//***************************************************************************************************************************************************

class PDF extends FPDF
  {
  //Cabecera de página
  function Header()
    {
    global $fecha, $hora, $titulo;
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
    global $totalCampos;
    global $registros, $campos, $largoCampos, $tituloTabla;

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
    $this->Cell($largoCampos[$totalCampos], 7, $tituloTabla, 1, 0, 'C', 1);
    $this->Ln();

    //Restauro color de fondo y tipo de letra para el contenido:
    $this->SetFillColor(255, 204, 120);
    $this->SetTextColor(0);
    $this->SetFont('Courier');
    $this->SetX(45);

    $this->SetFont('Courier', 'B', 9);
    $j = 0;
    foreach ($campos as $i => $dato) {
      $this->Cell($largoCampos[$j], 6, $campos[$i], 'LRBT', 0, 'C', true);
      $j++;
      }
      
    $this->Ln();
    $this->SetX(45);
    $this->SetFont('Courier');    
    
    $j = 0;
    foreach ($registros as $i => $dato) {
      $this->Cell($largoCampos[0], 6, $i+1, 'LRBT', 0, 'C', false);
      while ($j<$totalCampos-1) {
        $this->Cell($largoCampos[$j+1], 6, $dato[$j], 'LRBT', 0, 'C', false);
        $j++;
      }
      $this->Ln();
      $this->SetX(45);
      $j = 0;
    }
  }
  
  //Tabla con todos los detalles de la actividad
  function detalleActividad() {
    global $datos, $tituloTabla;
    global $c1, $c2, $c35, $c5, $c6, $c7;
    
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
    $this->Cell($c7, 7, $tituloTabla, 1, 0, 'C', 1);
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
    $this->Cell($c6, 7, $datos["actividad"]["motivo"], 1, 0, 'C', 0);
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
    $this->Cell($c2, 7, $datos["actividad"]["fecha"], 1, 0, 'C', 0);
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
    $this->Cell($c7, 7, "PERSONAL DE LA EMPRESA", 1, 0, 'C', 1);
    $this->Ln();
    $this->SetX(45);
    $this->SetFillColor(255, 204, 120);
    $this->Cell($c35, 7, "Nombre", 1, 0, 'C', 1);
    $this->Cell($c35, 7, "Rol", 1, 0, 'C', 1);
    //Restauro color de fondo y tipo de letra para el contenido:
    $this->SetFillColor(255, 204, 120);
    $this->SetTextColor(0);
    $this->Ln();
    $this->SetX(45);
    
    ///Línea con el nombre y rol del primer usuario de la empresa:
    $this->SetFont('Courier');
    $this->Cell($c35, 7, utf8_decode($datos["usuario1"]["nombre"])." ".utf8_decode($datos["usuario1"]["apellido"]), 1, 0, 'C', 0);
    $this->Cell($c35, 7, $datos["actividad"]["rolUsuario1"], 1, 0, 'C', 0);
    $this->Ln();
    $this->SetX(45);
    ///Línea con el nombre y rol del segundo usuario de la empresa:
    $this->SetFont('Courier');
    $this->Cell($c35, 7, utf8_decode($datos["usuario2"]["nombre"])." ".utf8_decode($datos["usuario2"]["apellido"]), 1, 0, 'C', 0);
    $this->Cell($c35, 7, $datos["actividad"]["rolUsuario2"], 1, 0, 'C', 0);
    $this->Ln();
    $this->SetX(45);
    
    ///Chequeo si existen referencias para la actividad:
    if ($datos["referencia"] !== null) {
      //Defino tipo de letra y tamaño para el SubTítulo:
      $this->SetFont('Courier', 'B', 9);
      $this->SetFillColor(153, 255, 102);
      //Escribo el subtítulo:
      $this->Cell($c7, 7, "REFERENCIAS", 1, 0, 'C', 1);
      $this->Ln();
      $this->SetX(45);
      
      foreach ($datos["referencia"] as $indice => $registro) {
        ///Línea con el código y resumen de la referencia:
        $this->SetFont('Courier');
        $this->Cell($c2, 7, utf8_decode($registro["codigo"]), 1, 0, 'C', 0);
        $this->Cell($c5, 7, utf8_decode($registro["resumen"]), 1, 0, 'C', 0);
        $this->Ln();
        $this->SetX(45);
        }
    }  
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

//************************************** Defino tamaño de la celda base: c1, y además todos sus múltiplos **************************************
$c1 = 18;
$c025 = 0.25 * $c1;
$c05 = 0.5 * $c1;
$c15 = 1.5 * $c1;
$c2 = 2 * $c1;
$c25 = 2.5 * $c1;
$c3 = 3 * $c1;
$c35 = 3.5 * $c1;
$c4 = 4 * $c1;
$c5 = 5 * $c1;
$c55 = 5.5 * $c1;
$c6 = 6 * $c1;
$c65 = 6.5 * $c1;
$c7 = 7 * $c1;
$pag = 1;
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
$hora = $horaLocal["tm_hour"] . ":" . $horaLocal["tm_min"] . ":" . $horaLocal["tm_sec"];

$titulo = utf8_decode('Resultado de la exportación');
//********************************************************** FIN Hora y título *****************************************************************

//Instancio objeto de la clase:
$pdfResumen = new PDF();
//Agrego una página al documento:
$pdfResumen->AddPage();

//RECUPERO ID PASADO con el tipo de dato a exportar:
$id = $_GET["type"];
$query = $_GET["query"];
$campos1 = $_GET["campos"];
$campos = preg_split("/-/", $campos1);
$largos = $_GET["largos"];
$temp = explode('-', $largos);
$largoCampos = array();

foreach ($temp as $valor) {
  switch ($valor) {
    case "c1": array_push($largoCampos, $c1);
               break;
    case "c15": array_push($largoCampos, $c15);
                break;
    case "c2": array_push($largoCampos, $c2);
                break;          
    case "c25": array_push($largoCampos, $c25);
                break;
    case "c3": array_push($largoCampos, $c3);
                break;          
    case "c35": array_push($largoCampos, $c35);
                break; 
    case "c4": array_push($largoCampos, $c4);
                break;
    case "c5": array_push($largoCampos, $c5);
                break;          
    case "c55": array_push($largoCampos, $c55);
                break;  
    case "c6": array_push($largoCampos, $c6);
                break;          
    case "c65": array_push($largoCampos, $c65);
                break;        
    default: break;
    }
  }
echo "campos: <br>";var_dump($campos);echo"<br>largos:<br>";var_dump($largoCampos);echo"<br>query: ".$query;
switch ($id) {
  case "1": $query = "select fecha, motivo from actividades where estado='activa' order by fecha desc, idactividades asc";
            $largoCampos = array($c1, $c2, $c4, $c7);
            $campos = array("Id", "Fecha", "Motivo");
            $tituloTabla = "LISTADO DE ACTIVIDADES";
            break;
  case "2": $idactivity = $_GET["actividad"];
            $datos = recuperarActividad($idactivity);
            $tituloTabla = "DETALLE DE LA ACTIVIDAD";
            $pdfResumen->detalleActividad($datos);
            break;
  case "3": echo('Detalle de una referencia');
            break;
  case "4": echo('Detalle de una llave');
            break;
  case "5": echo('Detalle de un certificado');
            break;
  case "6": $tituloTabla =  utf8_decode("LISTADO DE LA EXPORTACIÓN");
            break;
  default: break;
}

//******************* Consulta para GUARDAR en un array todos los contenedores **********************************************************
// Conectar con la base de datos
$con = crearConexion(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);

if (($id == 1)||($id == 6)) {
  $resultado1 = consultarBD($query, $con);
  
  $totalRegistros = $resultado1->num_rows;
  $filas1 = obtenerResultadosArray($resultado1);
  $totalCampos = sizeof($campos);   
  $registros = array();
  $i = 1;
  foreach($filas1 as $fila)
    {
    $j = 0;
    while ($j<$totalCampos-1) {
      $registro[$j] = $fila[$j];
      $j++;
      }
    $registro[$totalCampos-1] = $i;
    $registros[] = $registro;
    $i++;
  }
  //var_dump($largoCampos);
  $pdfResumen->agregarTablaListado();    
}
else {
  
  
  }
$nombreReporte = "resultadoExportacion.pdf";
$dir = $dir . "/" . $nombreReporte;
$pdfResumen->Output($dir, 'I');
?>
