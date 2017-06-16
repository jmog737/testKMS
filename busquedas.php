<!DOCTYPE html>
<?php
/**
******************************************************
*  @file busquedas.php
*  @brief Formulario para ejecutar consultas.
*  @author Juan Martín Ortega
*  @version 1.0
*  @date Junio 2017
*
*******************************************************/
?>
<html>
  <?php require_once('head.php');?>
  
  <body>
    <?php require_once('header.php');?>
    
    <div id='main-content' class='container-fluid'>
      <h2 id="titulo" class="encabezado">CONSULTAS</h2>
      <h3>Seleccione el tipo de consulta a ejecutar.</h3>
      <div id='fila' class='row'>
        <div id='criterios' class='col-md-12 col-sm-12'>
          <table id="parametros" name="parametros" class="tabla2">
            <tr>
              <th colspan="5" class="tituloTabla">ACTIVIDADES</th>
            </tr>
            <tr>
              <td>
                <input type="radio" name="criterio" value="nombreActividad">
              </td>
              <td>Motivo:</td>
              <td colspan="3"><input type="text" name="motivo"></td>
            </tr>
            <tr>
              <td>
                <input type="radio" name="criterio" value="fecha">
              </td>
              <td>Entre:</td>
              <td><input type="date" name="inicio"></td>
              <td>y:</td>
              <td><input type="date" name="fin"></td>
            </tr>
            <tr>
              <th colspan="5">REFERENCIAS</th>
            </tr>
            <tr>
              <td>
                <input type="radio" name="criterio" value="codigo">
              </td>
              <td>Código:</td>
              <td colspan="3">
                <input type="text" name="codigo">
              </td>  
            </tr>
            <tr>
              <th colspan="5">SLOTS</th>
            </tr>
            <tr>
              <td rowspan="2"><input type="radio" name="criterio" value="slot"></td>
              <td>HSM:</td>
              <td colspan="3">
                <select>
                  <option></option>
                  <option></option>
                  <option></option>
                </select>
              </td>
            </tr>
            <tr>
              <td>Nombre:</td>
              <td colspan="3"><input type="text" name="nombreSlot"></td>
            </tr>
            <tr>
              <th colspan="5">USUARIOS</th>
            </tr>
            <tr>
              <td rowspan="2"><input type="radio" name="criterio" value="usuario"></td>
              <td>Nombre:</td>
              <td colspan="3"><input type="text" name="nombreUsuario"></td>
            </tr>
            <tr>
              <td>Empresa:</td>
              <td colspan="3"><input type="text" name="empresa"></td>
            </tr>
            <tr>
              <th colspan="5">LLAVES</th>
            </tr>
            <tr>
              <td rowspan="3"><input type="radio" name="criterio" value="llave"></td>
              <td>Nombre:</td>
              <td colspan="3"><input type="text" name="nombreLlave"></td>
            </tr>
            <tr>
              <td>Owner:</td>
              <td colspan="3"><input type="text" name="ownerLlave"></td>
            </tr>
            <tr>
              <td>Versión:</td>
              <td colspan="3"><input type="text" name="versionLlave"></td>
            </tr>
            <tr>
              <th colspan="5">CERTIFICADOS</th>
            </tr>
            <tr>
              <td rowspan="3"><input type="radio" name="criterio" value="cert"></td>
              <td>Nombre:</td>
              <td colspan="3"><input type="text" name="nombreCert"></td>
            </tr>
            <tr>
              <td>Owner:</td>
              <td colspan="3"><input type="text" name="ownerCert"></td>
            </tr>
            <tr>
              <td>Versión:</td>
              <td colspan="3"><input type="text" name="versionCert"></td>
            </tr>
            <tr>
              <td colspan="5" class="pieTabla"><input type="button" class="btn-success" name="consultar" value="Consultar"></td>
            </tr>
          </table>
        </div>
      </div>
      <div id='fila' class='row'>
        <div id='resultado' class='col-md-5 col-sm-12'></div>
      </div> 
    </div>
    
    <?php require_once('footer.php');?>
  </body>
  
</html>