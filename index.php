<!DOCTYPE html>
<html>
  <head>
    <title>KMS TEST</title>
    <meta charset='UTF-8'>
    <meta name='viewport' content='width=device-width, initial-scale=1.0'>
    <meta http-equiv='X-UA-Compatible' content='IE=edge'>
    <link rel='stylesheet' href='css/bootstrap.css'>
    <link rel='stylesheet' href='css/styles.css'>
    <!-- jQuery (Bootstrap JS plugins depend on it) -->
    <script src='js/jquery-2.1.4.min.js'></script>
    <script src='js/bootstrap.min.js'></script>
    <script src='js/ajax-utils.js'></script>
    <script src='js/script.js'></script>
  </head>
  <body>
    <?php require_once('header.php'); 
          require_once('data/baseMysql.php');
          
          
      //Conexión con la base de datos:
      $dbc = crearConexion(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);

      $consultar = "select idactividades, fecha, motivo from actividades order by idactividades";
      $result = consultarBD($consultar, $dbc);

      $actividades = array();

      while (($fila = $result->fetch_array(MYSQLI_ASSOC)) != NULL) { 
        $actividades[] = $fila;
      }
    ?>
    
    <div id='main-content' class='container'>
      <div class="row">
        <div id='selector' class='col-md-6'>
          <table class='tabla1 derecha' id='origen'>
            <th>FECHA</th><th>MOTIVO</th>
            <?php
            foreach($actividades as $valor)
              {
              echo "
              <tr>
                <td><a href='#' class='detail' id='".$valor["idactividades"]."'>".$valor["fecha"]."</a></td>
                <td>".$valor["motivo"]."</td>
              </tr>";
              }
            ?>
          </table>
        </div>

        <div id="content" class='col-md-6'>

        </div> 
      </div>    
      
    </div>
    
    <?php require_once('footer.php');?>
  </body>
</html>

