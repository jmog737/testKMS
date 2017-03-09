/**
//  \file script.js
//  \brief Archivo que contiene todas las funciones de Javascript.
//  \author Juan Martín Ortega
//  \version 1.0
//  \date Marzo 2017
*/

/***********************************************************************************************************************
/// ************************************************** FUNCIONES GENÉRICAS *********************************************
************************************************************************************************************************
*/

/**
 * \brief Función que vacía el contenido del div cuyo Id se pasa como parámetro.
 * @param id Id del DIV que se quiere vaciar.
 */
function vaciarContent (id) {
  $(id).html('');
}
/***********************************************************************************************************************
/// ********************************************** FIN FUNCIONES GENÉRICAS *********************************************
************************************************************************************************************************
*/

/**
 * \brief Función que carga el listado de actividades en el selector pasado como parámetro.
 * @param selector Id del documento en donde se debe cargar la lista de actividades.
 * @param editar Booleano que indica si se debe habilitar o no el botón Editar.
 * @param actualizar Booleano que indica si se debe habilitar o no el botón Actualizar.
 * @param eliminar Booleano que indica si se debe habilitar o no el botón Eliminar.
 * @returns Devuelve una tabla con el listado de actividades que se carga en el Id pasado.
 */
function cargarActividades (selector, editar, actualizar, eliminar){
    var url = "data/loadActivities.php";
    var query = "select idactividades, fecha, motivo from actividades where estado='activa' order by fecha desc, idactividades asc";
    
    $.getJSON(url, {query: ""+query+""}).done(function(request) {
      var actividad = request.actividad;
      var total = Array.isArray(actividad);
      if (total) {
        tabla = '<table class="tabla1" id="origen">';
        tabla += '<tr><th>FECHA</th><th colspan="2">MOTIVO</th></tr>';
        tr = '';
        var mayor = parseInt(actividad[0]["idactividades"], 10);
        for (var index in actividad) {
          ///Acomodo la fecha para que se vea en el formato habitual de dd/mm/aaaa
          var fechaSeparada = actividad[index]["fecha"].split("-");
          var fecha = fechaSeparada[2]+'/'+fechaSeparada[1]+'/'+fechaSeparada[0];
          
          ///Hago una mini función para capturar y tener siempre disponible el último registro agregado (último id pues el autonumérico)
          ///Hago la conversión a int pues de lo contrario la comparación no es efectiva.
          var actual = parseInt(actividad[index]["idactividades"],10);
          if (actual > mayor) {
            mayor = actual;
          }
          
          tr += '<tr>\n\
                  <td><a href="#" class="detailActivity" id="'+actual+'" >'+fecha+'</a></td>\n\
                  <td colspan="2">'+actividad[index]["motivo"]+'</td>\n\
                 </tr>';
        };
        tr += '<tr><td><input type="button" id="editarActividad" name="editarActividad" value="EDITAR" onclick="cambiarEdicion()" class="btn-info"></td>\n\
                  <td><input type="button" id="actualizarActividad" name="actualizarActividad" value="ACTUALIZAR" class="btn-warning"></td>\n\
                  <td><input type="button" id="eliminarActividad" name="eliminarActividad" value="ELIMINAR" class="btn-danger"></td>\n\
              </tr>';
        tr += '<tr>\n\
                <td style="display:none"><input type="text" id="flagEditar" name="flagEditar"></td>\n\
                <td style="display:none"><input type="text" id="flagEliminar" name="flagEliminar"></td>\n\
                <td style="display:none"><input type="text" id="fuente" name="fuente" value="actividad"></td>\n\
                <td style="display:none"><input type="text" id="ultimaActividad" name="ultimaActividad" value='+mayor+'></tr>';
        tr += '<tr>\n\
                 <td colspan="4"><input type="button" id="agregarActividad" value="NUEVA" class="btn-success"></td>\n\
               </tr>';     
        tabla += tr;
        tabla += '</table>';
        $(selector).html(tabla);
        if (editar) {
          $("#editarActividad").removeAttr("disabled");
        }
        else {
          $("#editarActividad").attr("disabled", "disabled");
        }
        if (actualizar) {
          $("#actualizarActividad").removeAttr("disabled");
        }
        else {
          $("#actualizarActividad").attr("disabled", "disabled");
        }
        if (eliminar) {
          $("#eliminarActividad").removeAttr("disabled");
        }
        else {
          $("#eliminarActividad").attr("disabled", "disabled");
        }
      }
      else {
        var texto = '<h2>NO existen actividades!.</h2>';
        $('#main-content').empty();
        $('#main-content').html(texto);
      }
    });
  };
  
/**
 * \brief Función que valida el formulario para el ingreso de una nueva actividad.
 * @returns {Boolean} Devuelve un booleano que indica si la validaión de la actividad fue o no exitosa.
 */  
function validarActividad()
  {
  var indiceUser1 = document.getElementById("usuario1").selectedIndex;
  var indiceUser2 = document.getElementById("usuario2").selectedIndex;
  var indiceRol1 = document.getElementById("rol1").selectedIndex;
  var indiceRol2 = document.getElementById("rol2").selectedIndex;
  var inicio = document.getElementById("horaInicio").value;
  var fin = document.getElementById("horaFin").value;
  var motivo = document.getElementById("motivo").value;
  var margen = 40;
  
  // Fecha pasada como parámetro y variables para manejo de fechas:
  var fecha = document.getElementById("fecha").value;
  var days = ["Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"];
  var d = new Date(fecha);
  var diaSemana = days[d.getUTCDay()];
  var dia = d.getUTCDate();  
  var mes = d.getUTCMonth() + 1;
  var fechaInterpretada = dia + '/' + mes + '/' + d.getFullYear();
  var actual = new Date();
  
  // Variables para el manejo de las horas:
  var h1 = inicio.substring(0,2);
  var m1 = inicio.substring(3,5);
  var h2 = fin.substring(0,2);
  var m2 = fin.substring(3,5);
  var tiempo1 = Number(h1)*60 + Number(m1);
  var tiempo2 = Number(h2)*60 + Number(m2);
  
  if (fecha.length === 0)
    {
    alert('Debe ingresar la FECHA en que se realizó la actividad.');
    document.getElementById("fecha").focus();
    seguir = false;
  } 
  else
    {
    if (d > actual)
      {
      alert('La fecha ingresada NO puede ser POSTERIOR a la fecha ACTUAL!.');
      document.getElementById("fecha").focus();
      seguir = false;
    }
    else
      {
      if (diaSemana === "Domingo")
        {
        alert('La fecha ingresada: ' + fechaInterpretada + ' es un Domingo!.');
        document.getElementById("fecha").focus();
        seguir = false;
      }  
      else
        {
        if (diaSemana === "Sábado")
          {
          alert('La fecha ingresada: ' + fechaInterpretada + ' es un Sábado!.');
          document.getElementById("fecha").focus();
          seguir = false;
        }
        else
          { 
          if (inicio.length === 0)
            {
            alert('Debe ingresar la hora de INICIO de la actividad.');
            document.getElementById("inicio").focus();
            seguir = false;
          }
          else
            {
            if (fin.length === 0)
              {
              alert('Debe ingresar la hora de FINALIZACIÓN de la actividad.');
              document.getElementById("fin").focus();
              seguir = false;
            }           
            else
              {
              if (inicio >= fin)
                {
                alert('La hora de INICIO debe ser ANTERIOR a la hora de FINALIZACIÓN.');
                document.getElementById("fin").focus();
                seguir = false;
              }
              else
                {
                if ((tiempo1 + margen) > tiempo2)
                  {
                  alert('La ceremonia debió haber demorado al menos ' + margen + ' minutos!.');
                  document.getElementById("fin").focus();
                  seguir = false;
                }
                else
                  {
                  if (motivo.length === 0)
                    {
                    alert('Debe ingresar el MOTIVO de la actividad.');
                    document.getElementById("motivo").focus();
                    seguir = false;
                  }
                  else
                    {
                    if (document.getElementById("usuario1").options[indiceUser1].value === 'ninguno')
                      {
                      alert('Debe seleccionar un USUARIO 1.');
                      document.getElementById("usuario1").focus();
                      seguir = false;
                    }
                    else
                      {
                      if (document.getElementById("rol1").options[indiceRol1].value === 'ninguno')
                        {
                        alert('Debe seleccionar un ROL para el USUARIO 1.');
                        document.getElementById("rol1").focus();
                        seguir = false;
                      }
                      else
                        {
                        if (document.getElementById("usuario2").options[indiceUser2].value === 'ninguno')
                          {
                          alert('Debe seleccionar un USUARIO 2.');
                          document.getElementById("usuario2").focus();
                          seguir = false;
                        }
                        else
                          {
                          if (indiceUser1 === indiceUser2)
                            {
                            alert('El mismo USUARIO no puede estar las dos veces.');
                            document.getElementById("usuario2").focus();
                            seguir = false;
                          }
                          else
                            {
                            if (document.getElementById("rol2").options[indiceRol2].value === 'ninguno')
                              {
                              alert('Debe seleccionar un ROL para el USUARIO 2.');
                              document.getElementById("rol2").focus();
                              seguir = false;
                            }
                            else
                              {
                              if ((indiceRol1 === indiceRol2) && (indiceRol1 !== 3))
                                {
                                alert('NO puede haber dos Usuarios con el mismo ROL.');
                                document.getElementById("rol2").focus();
                                seguir = false;
                              }
                              else  
                                {
                                seguir = true;
                              }
                            } // if roles deben ser distintos
                          } // if seleccionar rol 2
                        } // if usuarios deben ser disintos
                      } // if seleccionar usuario 2
                    } //if seleccionar rol 1
                  } // if seleccionar usuario 1
                } // if ingresar motivo 
              } // if NO cumple margen previsto
            } // if hora de inicio debe ser posterior a hora final
          } // if ingresar hora de finalización
        } // if ingresar hora de inicio
      } // if fecha elegida es sábado
    } // if fecha elegida es domingo
  } // if fecha elegida es posterior a la actual

  if (seguir) return true;
  else return false;
}  

/**
 * \brief Función que carga en el form referencia los datos de la referencia.
 * Básicamente a partir de la parte de la url pasada como parámetro, detecta el idreferencia, consulta
 * a la base de datos y recupera los valores.
 * @param {String} parametros String que contiene la parte de la url a partir del ? (incluyéndolo). 
 */  
function recuperarReferencia(parametros) {
  var temp = parametros.split('?');
  var temp1 = temp[1].split('=');
  var idref = parseInt(temp1[1], 10);
  var url = "data/selectQuery.php";
  //var query = 'select * from referencias where idreferencias="'+idref+'"';
  var query = 'select referencias.idreferencias, referencias.actividad, referencias.codigo, referencias.lugar, referencias.plataforma, referencias.aplicacion, referencias.resumen, referencias.detalles, hsm.nombre as hsm, slots.nombre as slot from referencias inner join slots on referencias.slot=slots.idslots inner join hsm on hsm.idhsm=slots.hsm where referencias.idreferencias="'+idref+'"';
  
  $.getJSON(url, {query: ""+query+""}).done(function(request) {
    var referencia = request.resultado[0];
    
    var actividad = referencia['actividad'];
    var codigo = referencia['codigo'];
    var resumen = referencia['resumen'];
    var slot = referencia['slot'];
    var lugar = referencia['lugar'];
    var plataforma = referencia['plataforma'];
    var aplicacion = referencia['aplicacion'];
    if (aplicacion === null) aplicacion = '';
    var detalles = referencia['detalles'];
    var hsm = referencia['hsm'];
    
    //alert('idref: '+idref+'\nactividad: '+actividad+'\ncodigo: '+codigo+'\nresumen: '+resumen+'\nhsm: '+referencia['hsm']+'\nslot: '+referencia['slot']+'\nlugar: '+lugar+'\nplataforma: '+plataforma+'\naplicacion: '+aplicacion+'\ndetalles: '+detalles);
    tabla = '<table id="ref" class="tabla2 table">';
    tabla += '<tr><th colspan="6">GENERAL</th></tr>';
    tr = '';
    tr += '<tr>\n\
             <th>Lugar</th><td><input id="lugar" name="lugar" value="'+lugar+'"></td>\n\
             <th>HSM</th><td><input id="hsm" name="hsm" value="'+hsm+'"></td>\n\
             <th>Slot</th><td><input id="slot" name="slot" value="'+slot+'"></td>\n\
          </tr>';
    tr += '<tr>\n\
             <th>Plataforma</th><td colspan="3"><input id="plataforma" name="plataforma" value="'+plataforma+'"></td>\n\
             <th>Aplicación</th><td><input id="aplicacion" name="aplicacion" value="'+aplicacion+'"></td>\n\
           </tr>';
    tr += '<tr><th colspan="6">RESUMEN</th></tr>';
    tr += '<tr><td colspan="6"><input type="text" id="resumen" name="resumen" value="'+resumen+'" size="4"></td></tr>';
    tr += '<tr><th colspan="6">DETALLES</th></tr>';
    tr += '<tr><td colspan="6" width=10><input type="text" id="detalles" name="detalles" value="'+detalles+'"></td></tr>';
    tr += '<tr><td colspan="6"><input type="button" name="newReference" id="newReference" value="AGREGAR" class="btn-success"></td></tr>';
    tabla += tr;
    tabla += '</table>';
    formu = '<form name="reference" method="post" action="index.php">';
    formu += tabla;
    formu += '</form>';
    $('#main-content').html(formu);
  });
  /*
  var url = "data/selectQuery.php";
  var query = 'select hsm.nombre as hsm, slots.nombre as slot from slots inner join hsm on slots.hsm=hsm.idhsm where idslots="'+idslot+'"';
  var req2 = $.getJSON(url, {query: ""+query+""}).done(function(request) {
      var slotito = request.resultado[0];
      
      referencia['hsm'] = slotito['hsm'];
      referencia['slot'] = slotito['slot'];
      ///Verifico los valors recuperados:
      alert('idref: '+idref+'\nactividad: '+actividad+'\ncodigo: '+codigo+'\nresumen: '+resumen+'\nhsm: '+referencia['hsm']+'\nslot: '+referencia['slot']+'\nlugar: '+lugar+'\nplataforma: '+plataforma+'\naplicacion: '+aplicacion+'\ndetalles: '+detalles);
      alert('antes de salir slot');return referencia;
    });*/
}

function todo () {
  ///Levanto la url actual: 
  var urlActual = jQuery(location).attr('pathname');
  ///Según en que url esté, es lo que se carga:
  switch (urlActual) {
    case "/testKMS/index.php": 
      {
      cargarActividades('#main-content', false, false, false);
      break;
    }
    case "/testKMS/referencia.php":
      {
      ///Verifico si la url viene con parámetros o no.
      ///Si los tiene es porque viene del click de una referencia la cual hay que mostrar.
      ///Si no los tiene es porque es una referencia nueva y por ende, hay que cargar un form en blanco.
      var parametros = jQuery(location).attr('search');      
      if (parametros) {
        recuperarReferencia(parametros);
      }
      else {
        alert('en ref, pero sin parámetros');
      }
      
      break;
    }
    default: break;
  }  
  
  /***************************************************************************************************************************
  /// Comienzan las funciones que manejan los eventos relacionados a las ACTIVIDADES como ser creación, edición y eliminación.
  ****************************************************************************************************************************
  */
  
  ///Disparar funcion al hacer clic en el link de la actividad.
  ///Se cargan en el DIV #content los datos de la misma.
  $(document).on("click", ".detailActivity", function () {
      var url = "data/handleLogbook.php";  
      var activity = $(this).attr("id");
      var query = "select * from actividades where estado='activa' and idactividades='"+activity+"'";
      var divs = "<div id='fila' class='row'>\n\
                    <div id='selector' class='col-md-6 col-sm-12'></div>\n\
                    <div id='content' class='col-md-6 col-sm-12'></div>\n\
                  </div>";
      $("#main-content").empty();
      $("#main-content").append(divs);
      cargarActividades('#selector', true, false, true);
      $("#selector").css('padding-right', '30px');

      $.getJSON(url, {query: ""+query+"", actividad: ""+activity+""}).done(function(request) {
        var actividad = request.actividad;
        var referencia = request.referencia;
        var slot1 = request.slot;
        
        if(slot1) {
          slot = slot1.nombre;
        }
        
        var usuarios = request.usuarios;
        var km1 ='', km2='', ciso1='', ciso2='', testigo1='', testigo2='', ninguno1='', ninguno2 ='';

        fecha = actividad.fecha;
        horaInicio = actividad.horaInicio;
        horaFin = actividad.horaFin;
        motivo = actividad.motivo;
        rol1 = actividad.rolUsuario1;
        rol2 = actividad.rolUsuario2;
        userId1 = actividad.usuario1;
        userId2 = actividad.usuario2;

        switch (rol1)
          {
          case 'CISO':ciso1 = 'selected';
                      break;
          case 'KM':km1 = 'selected';
                    break;
          case 'Testigo':testigo1 = 'selected';
                         break;
          default:ninguno1 = 'selected'; 
                  break;                       
        }

        switch (rol2)
          {
          case 'CISO':ciso2 = 'selected';
                      break;
          case 'KM':km2 = 'selected';
                    break;
          case 'Testigo':testigo2 = 'selected';
                         break;
          default:ninguno2 = 'selected'; 
                  break;                       
        }
        
        tabla = '<table id="datos" class="tabla2 table table-bordered table-striped table-hover table-responsive">';
        tabla += '<tr><th colspan="6">GENERAL</th></tr>';
        tabla += '<tr><th>Motivo</th><td colspan="5" style="vertical-align: middle;"><input id="motivo" name="motivo" disabled="true" style="width:100%; resize: none; text-align: center; font-size: 18pt; font-weight: bolder;" value="'+motivo+'"></td></tr>';
        tr = '';
        tr += '<tr><th>Fecha</th><td><input id="fecha" name="fecha" type="date" disabled="true" style="width:100%; text-align: center" min="2016-10-01" value='+fecha+'></td>\n\
                   <th>Inicio</th><td><input id="horaInicio" name="horaInicio" disabled="true" type="time" style="width:100%; text-align: center" min="09:00" max="18:00" step="600" value='+horaInicio+'></td>\n\
                   <th>Fin</th><td><input id="horaFin" name="horaFin" disabled="true" type="time" style="width:100%; text-align: center" min="09:00" max="18:00" step="600" value='+horaFin+'></td>\n\
               </tr>';
        tr += '<tr><th colspan="6">USUARIOS</th></tr>';
        tr += '<tr><th colspan="3">Nombre</th><th colspan="3">Rol</th></tr>';
        tr += '<tr>\n\
                  <td colspan="3"><select id="usuario1" name="usuario1" style="width:100%;" disabled="true">\n\
                                    <option value="ninguno" selected="yes">--- SELECCIONAR ---</option>';
        for (var index in usuarios) {
          if (usuarios[index]["idusuarios"] === userId1) {
            elegido = "selected";
          }
          else {
            elegido = "";
          };
          tr += '<option value="'+usuarios[index]["idusuarios"]+'" '+elegido+'>'+usuarios[index]["nombre"]+' '+usuarios[index]["apellido"]+'</option>';
        };

        tr += '</select></td>';
        tr += '<td colspan="3">\n\
                <select id="rol1" name="rol1" style="width:100%" disabled="true">\n\
                  <option value="ninguno" '+ninguno1+'>---SELECCIONAR---</option>\n\
                  <option value="KM" '+km1+'>KM</option>\n\
                  <option value="CISO" '+ciso1+'>CISO</option>\n\
                    <option value="Testigo" '+testigo1+'>Testigo</option>\n\
                </select>\n\
              </td></tr>';
        tr += '<tr>\n\
                  <td colspan="3"><select id="usuario2" name="usuario2" style="width:100%;" disabled="true">\n\
                                    <option value="ninguno" selected="yes">--- SELECCIONAR ---</option>';
        for (var index in usuarios) {
          if (usuarios[index]["idusuarios"] === userId2) {
            elegido = "selected";
          }
          else {
            elegido = "";
          };
          tr += '<option value="'+usuarios[index]["idusuarios"]+'" '+elegido+'>'+usuarios[index]["nombre"]+' '+usuarios[index]["apellido"]+'</option>';
        };
        tr += '</select></td>';
        tr += '<td colspan="3">\n\
                <select id="rol2" name="rol2" style="width:100%" disabled="true">\n\
                  <option value="ninguno" '+ninguno2+'>---SELECCIONAR---</option>\n\
                  <option value="KM" '+km2+'>KM</option>\n\
                  <option value="CISO" '+ciso2+'>CISO</option>\n\
                    <option value="Testigo" '+testigo2+'>Testigo</option>\n\
                </select>\n\
              </td></tr>';
        if (referencia !== null) {           
          tr += '<tr><th colspan="6">REFERENCIAS</th></tr>';
          for (var indice in referencia) {
            tr += '<tr>\n\
                    <td colspan="3"><a href="referencia.php?idreferencia='+referencia[indice].idreferencias+'">'+referencia[indice].codigo+'</td>\n\
                    <td colspan="3" style="text-align:left">'+referencia[indice].resumen+'</td>\n\
                  </tr>';
          }
        }
        tr += '<tr><td colspan="6"><input type="submit" id="nuevaRef" name="nuevaRef" value="NUEVA REFERENCIA" class="btn-success"></td></tr>'
        tr += '<tr><td style="display:none"><input type="text" id="activity" name="activity" value='+activity+'></td></tr>';
        tabla += tr;
        tabla += '</table>';
        formu = '<form name="activity" method="post" action="referencia.php">';
        formu += tabla;
        formu += '</form>';
        $('#content').html(formu);
      });//** fin del getJSON req1 ***
      
    });//*** fin del click ***
  
  ///Disparar funcion al hacer clic en el botón eliminar.
  ///Esto hace que el registro correspondiente a la actividad pase a estado de inactiva.
  ///Además, se "limpia" el form del div #selector quitando la actividad eliminada.
  $(document).on("click", "#eliminarActividad", function () {
      var pregunta = confirm('Está a punto de eliminar el registro. ¿Desea continuar?');
      if (pregunta) {
        var url = "data/updateQuery.php";
        var actividad;
        ///Chequeo si quiero eliminar el elemento que recién se agregó u otro anterior.
        ///Esto varía pues el campo activity no está en el DOM si recién se agregó por lo cual 
        ///debo sacar el último elemento agregado de #selector bajo el nombre: ultimaActividad
        if (document.getElementById("activity")) {
          actividad = document.getElementById("activity").value;
        }
        else {
          actividad = document.getElementById("ultimaActividad").value;
        }
        
        var query = "update actividades set estado='inactiva' where idactividades='" + actividad + "'";
        
        $.getJSON(url, {query: ""+query+""}).done(function(request) {
          var resultado = request["resultado"];
          if (resultado === "OK") {
            vaciarContent("#main-content");
            cargarActividades('#main-content', false, false, false);
            //alert('Registro borrado correctamente!');
          }
          else {
            alert('Hubo un error. Por favor verifique.');
          }
        });
      }
      else {
        //alert('no quiso borrar');
      }
    });
  
  ///Disparar funcion al hacer clic en el botón actualizar.
  ///Se validan todos los campos antes de hacer la actualización, y una vez hecha se inhabilita el form y parte de los botones.
  $(document).on("click", "#actualizarActividad", function () {
    var seguir = true;  
    seguir = validarActividad();
    
    ///En caso de que se valide todo, se prosigue a enviar la consulta con la actualización en base a los parámetros pasados
    if (seguir) {
      ///Recupero valores editados y armo la consulta para el update:
      var url = "data/updateQuery.php";  
      var usuario1 = document.getElementById("usuario1").value;
      var usuario2 = document.getElementById("usuario2").value;
      var rol1 = document.getElementById("rol1").value;
      var rol2 = document.getElementById("rol2").value;
      var inicio = document.getElementById("horaInicio").value;
      var fin = document.getElementById("horaFin").value;
      var motivo = document.getElementById("motivo").value;
      var fecha = document.getElementById("fecha").value;
      var actividad = document.getElementById("activity").value;
      var query = "update actividades set fecha='" + fecha + "', horaInicio='" + inicio + "', horaFin='" + fin + "', motivo='" + motivo + "', usuario1='" + usuario1 + "', usuario2='" + usuario2 + "', rolUsuario1='" + rol1 + "', rolUsuario2='" + rol2 + "'  where idactividades='" + actividad + "'";
      
      ///Ejecuto la consulta y muestro mensaje según resultado:
      $.getJSON(url, {query: ""+query+""}).done(function(request) {
        var resultado = request["resultado"];
        if (resultado === "OK") {
          alert('Registro modificado correctamente!');
          $("#actualizarActividad").attr("disabled", "disabled");
          document.getElementById("editarActividad").value = "EDITAR";
          inhabilitarForm();
        }
        else {
          alert('Hubo un error. Por favor verifique.');
        }
      });
    }
  });
    
  ///Disparar funcion al hacer clic en el botón Agregar.
  ///Se validan todos los campos antes de hacer el insert en la base de datos.
  $(document).on("click", "#newActivity", function () {
    
    var seguir = validarActividad();
    
    ///En caso de que se valide todo, se prosigue a enviar la consulta con el ingreso del nuevo registro en base a los parámetros pasados
    if (seguir) {
      ///Recupero valores editados y armo la consulta para el update:
      var url = "data/updateQuery.php";  
      var usuario1 = document.getElementById("usuario1").value;
      var usuario2 = document.getElementById("usuario2").value;
      var rolUsuario1 = document.getElementById("rol1").value;
      var rolUsuario2 = document.getElementById("rol2").value;
      var horaInicio = document.getElementById("horaInicio").value;
      var horaFin = document.getElementById("horaFin").value;
      var motivo = document.getElementById("motivo").value;
      var fecha = document.getElementById("fecha").value;
      var query = "insert into actividades (fecha, horaInicio, horaFin, motivo, usuario1, usuario2, rolUsuario1, rolUsuario2, estado) values ('" + fecha + "', '" + horaInicio + "', '" + horaFin + "', '" + motivo + "', " + usuario1 + ", " + usuario2 + ", '" + rolUsuario1 + "', '" + rolUsuario2 + "', 'activa')";
      
      ///Ejecuto la consulta y muestro mensaje según resultado:
      $.getJSON(url, {query: ""+query+""}).done(function(request) {
        var resultado = request["resultado"];
        if (resultado === "OK") {
          alert('Registro agregado correctamente!');
          cargarActividades('#selector', true, false, true);
          inhabilitarForm();
          alert(document.getElementById())
          $("#newActivity").remove();
        }
        else {
          alert('Hubo un error. Por favor verifique.');
        }
      });
    }
  });  
    
  ///Disparar funcion al hacer clic en el botón Nueva ya sea desde el div #selector o #content
  ///Esto genera un nuevo formulario en blanco para Actividades.
  $(document).on("click", "#agregarActividad", function () {
    ///Chequeo si se hizo click desde el form en #main-content o desde #selector.
    ///En el primero caso se generan los divs #selector y #content antes de generar el form.
    if (!($('#selector').length)) {
      var divs = "<div id='fila' class='row'>\n\
                    <div id='selector' class='col-md-6 col-sm-12'></div>\n\
                    <div id='content' class='col-md-6 col-sm-12'></div>\n\
                  </div>";
      $("#main-content").empty();
      $("#main-content").append(divs);
    }
    cargarActividades('#selector', false, false, false);
    
    var query = "select idusuarios, nombre, apellido from usuarios where estado='activo' and empresa='EMSA'";
    var url = "data/selectQuery.php";
    $.getJSON(url, {query: ""+query+""}).done(function(request) {
      var usuarios = request.resultado;
      tabla = '<table id="datos" class="tabla2 table table-bordered table-striped table-hover table-responsive">';
      tabla += '<tr><th colspan="6">GENERAL</th></tr>';
      tabla += '<tr><th>Motivo</th><td colspan="5" style="vertical-align: middle;"><input id="motivo" name="motivo" style="width:100%; resize: none; text-align: center; font-size: 18pt; font-weight: bolder;"></td></tr>';
      tr = '';
      tr += '<tr><th>Fecha</th><td><input id="fecha" name="fecha" type="date" style="width:100%; text-align: center" min="2016-10-01"></td>\n\
                 <th>Inicio</th><td><input id="horaInicio" name="horaInicio" type="time" style="width:100%; text-align: center" min="09:00" max="18:00" step="600"></td>\n\
                 <th>Fin</th><td><input id="horaFin" name="horaFin" type="time" style="width:100%; text-align: center" min="09:00" max="18:00" step="600"></td>\n\
             </tr>';
      tr += '<tr><th colspan="6">USUARIOS</th></tr>';
      tr += '<tr><th colspan="3">Nombre</th><th colspan="3">Rol</th></tr>';
      tr += '<tr>\n\
                <td colspan="3">\n\
                  <select id="usuario1" name="usuario1" style="width:100%;">\n\
                    <option value="ninguno" selected="yes">--- SELECCIONAR ---</option>';
      for (var index in usuarios) {
        tr += '<option value="'+usuarios[index]["idusuarios"]+'">'+usuarios[index]["nombre"]+' '+usuarios[index]["apellido"]+'</option>';
      };
      tr += '</select></td>';
      tr += '<td colspan="3">\n\
              <select id="rol1" name="rol1" style="width:100%">\n\
                <option value="ninguno">---SELECCIONAR---</option>\n\
                <option value="KM">KM</option>\n\
                <option value="CISO">CISO</option>\n\
                  <option value="Testigo">Testigo</option>\n\
              </select>\n\
            </td></tr>';
      tr += '<tr>\n\
                <td colspan="3">\n\
                  <select id="usuario2" name="usuario2" style="width:100%;">\n\
                    <option value="ninguno" selected="yes">--- SELECCIONAR ---</option>';
      for (var index in usuarios) {
        tr += '<option value="'+usuarios[index]["idusuarios"]+'">'+usuarios[index]["nombre"]+' '+usuarios[index]["apellido"]+'</option>';
      };
      tr += '</select></td>';
      tr += '<td colspan="3">\n\
              <select id="rol2" name="rol2" style="width:100%">\n\
                <option value="ninguno">---SELECCIONAR---</option>\n\
                <option value="KM">KM</option>\n\
                <option value="CISO">CISO</option>\n\
                  <option value="Testigo">Testigo</option>\n\
              </select>\n\
            </td></tr>';
      tr += '<tr><td colspan="6"><input type="button" name="newActivity" id="newActivity" value="AGREGAR" class="btn-success"></td></tr>';
      tabla += tr;
      tabla += '</table>';
      formu = '<form name="activity" method="post" action="index.php">';
      formu += tabla;
      formu += '</form>';
      $('#content').html(formu);  
      $("#agregarActividad").attr("disabled", "disabled");   
    });
  });  
  
  /**********************************************************************************************************************
  /// ************************************************** FIN ACTIVIDADES ************************************************
  ***********************************************************************************************************************
  */
}
    
/**
 * \brief Función que envuelve todos los eventos JQUERY con sus respectivos handlers.
 */
$(document).on("ready", todo());//*** fin del ready ***


function inhabilitarForm() {
  document.getElementById("fecha").disabled = true;
  document.getElementById("horaInicio").disabled = true;
  document.getElementById("horaFin").disabled = true;
  document.getElementById("motivo").disabled = true;
  document.getElementById("usuario1").disabled = true;
  document.getElementById("rol1").disabled = true; 
  document.getElementById("usuario2").disabled = true;
  document.getElementById("rol2").disabled = true; 
  document.getElementById("newActivity").disabled = true;
}

/**
  \brief Función que habilita o deshabilita los botones según el caso en el que se esté.
*/
function cambiarEdicion()
  {
  var fuente = document.getElementById("fuente").value;
  var editar = document.getElementById("editarActividad").value;
  if (editar === 'EDITAR') {
    accion = 'habilitar';
  }
  else {
    accion = 'deshabilitar';
  }
  
  switch (fuente)
    {
    case "llave":
                 if (accion === "habilitar")
                    {
                    document.getElementById("nombreLlave").disabled = false;
                    document.getElementById("owner").disabled = false;
                    document.getElementById("version").disabled = false;
                    document.getElementById("tipo").disabled = false;
                    document.getElementById("bits").disabled = false;
                    document.getElementById("exponente").disabled = false;
                    document.getElementById("uso_encrypt").disabled = false;
                    document.getElementById("uso_sign").disabled = false;
                    document.getElementById("uso_wrap").disabled = false;
                    document.getElementById("uso_export").disabled = false;
                    document.getElementById("uso_derive").disabled = false;
                    document.getElementById("uso_decrypt").disabled = false;
                    document.getElementById("uso_verify").disabled = false;
                    document.getElementById("uso_unwrap").disabled = false;
                    document.getElementById("uso_import").disabled = false;
                    document.getElementById("att_sensitive").disabled = false;
                    document.getElementById("att_modifiable").disabled = false;
                    document.getElementById("att_private").disabled = false;
                    document.getElementById("att_extractable").disabled = false;
                    document.getElementById("att_exportable").disabled = false;
                    document.getElementById("att_trusted").disabled = false;
                    document.getElementById("att_wrapwtrusted").disabled = false;
                    document.getElementById("att_unwrapmask").disabled = false;
                    document.getElementById("att_derivemask").disabled = false;
                    document.getElementById("att_deletable").disabled = false;
                    document.getElementById("editarLlave").value = "BLOQUEAR";
                    document.getElementById("actualizarLlave").disabled = false;
                    document.getElementById("kcv").disabled = false;
                    document.getElementById("observaciones").disabled = false;
                    document.getElementById("generacion").disabled = false;
                    document.getElementById("accion").disabled = false;
                  }
                 else
                    {
                    document.getElementById("nombreLlave").disabled = true;
                    document.getElementById("owner").disabled = true;
                    document.getElementById("version").disabled = true;
                    document.getElementById("tipo").disabled = true;
                    document.getElementById("bits").disabled = true;
                    document.getElementById("exponente").disabled = true;
                    document.getElementById("uso_encrypt").disabled = true;
                    document.getElementById("uso_sign").disabled = true;
                    document.getElementById("uso_wrap").disabled = true;
                    document.getElementById("uso_export").disabled = true;
                    document.getElementById("uso_derive").disabled = true;
                    document.getElementById("uso_decrypt").disabled = true;
                    document.getElementById("uso_verify").disabled = true;
                    document.getElementById("uso_unwrap").disabled = true;
                    document.getElementById("uso_import").disabled = true;
                    document.getElementById("att_sensitive").disabled = true;
                    document.getElementById("att_modifiable").disabled = true;
                    document.getElementById("att_private").disabled = true;
                    document.getElementById("att_extractable").disabled = true;
                    document.getElementById("att_exportable").disabled = true;
                    document.getElementById("att_trusted").disabled = true;
                    document.getElementById("att_wrapwtrusted").disabled = true;
                    document.getElementById("att_unwrapmask").disabled = true;
                    document.getElementById("att_derivemask").disabled = true;
                    document.getElementById("att_deletable").disabled = true;
                    document.getElementById("editarLlave").value = "EDITAR";
                    document.getElementById("actualizarLlave").disabled = true;
                    document.getElementById("kcv").disabled = true;
                    document.getElementById("observaciones").disabled = true;
                    document.getElementById("generacion").disabled = true;
                    document.getElementById("accion").disabled = true;
                  }
                 break;
    case "certificado":
                      if (accion === "habilitar")
                        {
                        document.getElementById("nombreCertificado").disabled = false;
                        document.getElementById("owner").disabled = false;
                        document.getElementById("version").disabled = false;
                        document.getElementById("bandera").disabled = false;
                        document.getElementById("accion").disabled = false;
                        document.getElementById("vencimiento").disabled = false; 
                        document.getElementById("observaciones").disabled = false;
                        document.getElementById("editarCertificado").value = "BLOQUEAR";
                        document.getElementById("actualizarCertificado").disabled = false;
                      }
                      else
                        {
                        document.getElementById("nombreCertificado").disabled = true;
                        document.getElementById("owner").disabled = true;
                        document.getElementById("version").disabled = true;
                        document.getElementById("bandera").disabled = true;
                        document.getElementById("accion").disabled = true;
                        document.getElementById("vencimiento").disabled = true;
                        document.getElementById("observaciones").disabled = true;
                        document.getElementById("editarCertificado").value = "EDITAR";
                        document.getElementById("actualizarCertificado").disabled = true;
                      }
                      break;
    case "actividad":
                    if (accion === "habilitar")
                      {
                      document.getElementById("fecha").disabled = false;
                      document.getElementById("horaInicio").disabled = false;
                      document.getElementById("horaFin").disabled = false;
                      document.getElementById("motivo").disabled = false;
                      document.getElementById("usuario1").disabled = false;
                      document.getElementById("rol1").disabled = false; 
                      document.getElementById("usuario2").disabled = false;
                      document.getElementById("rol2").disabled = false; 
                      document.getElementById("editarActividad").value = "BLOQUEAR";
                      document.getElementById("actualizarActividad").disabled = false;
                    }
                    else
                      {
                      document.getElementById("fecha").disabled = true;
                      document.getElementById("horaInicio").disabled = true;
                      document.getElementById("horaFin").disabled = true;
                      document.getElementById("motivo").disabled = true;
                      document.getElementById("usuario1").disabled = true;
                      document.getElementById("rol1").disabled = true; 
                      document.getElementById("usuario2").disabled = true;
                      document.getElementById("rol2").disabled = true; 
                      document.getElementById("editarActividad").value = "EDITAR";
                      document.getElementById("actualizarActividad").disabled = true;
                    }
                    break;
    default: break;                  
  }  
}

/*
function validarEntero(valor)
  {
  valor = parseInt(valor);
  //Compruebo si es un valor num�rico
  if (isNaN(valor)) {
      //entonces (no es numero) devuelvo el valor cadena vacia
      return false;
      }
  else{
      //En caso contrario (Si era un n�mero) devuelvo el valor
      return true;
  }
}
*/

/**
  \brief Función que se encarga de la validación de los formularios.
                        
  Chequea en que caso se está (llave o certificado o actividad), y chequea
  también si se quiere editar o eliminar. En base a eso, hace las validaciones pertinentes
  y finalmente avisa de que hubo un error, o habilita a que se ejecute la acción.
                        
  @param valor Especifica que es lo que se quiere validar.                      
*/
function validar(valor)
  {
  var seguir = true;
  var nombre, owner, version, observaciones, formu, pregunta, referencia;
  var fuente = document.getElementById("fuente").value;
  
  // validación conjunta para llaves y certificados:
  if (fuente === 'llave') 
    {
    formu = detalleLlave;
    nombre = detalleLlave.nombreLlave;
    owner = detalleLlave.owner;
    version = detalleLlave.version;
    observaciones = detalleLlave.observaciones;
    pregunta = "de la llave ";
  }
  if (fuente === 'certificado')
    {
    formu = detalleCertificado;
    nombre = detalleCertificado.nombreCertificado;
    owner = detalleCertificado.owner;
    version = detalleCertificado.version;
    observaciones = detalleCertificado.observaciones;
    pregunta = "del certificado ";
  }
  if (fuente === 'actividad')
    {
    
  }
  
  // chequeo si se quiere actualizar o eliminar:
  if (valor === 'actualizar')
    {  
    document.getElementById("flagEditar").value = 1;
    switch (fuente)
      {
      case "referencia":
                        break;
      // el default lo dejo para lo habitual de llaves y certificados:                 
      default: if ((nombre.value.length===0) || (nombre.value === ' '))
                 {
                 alert('Debe escribir el nombre.');
                 nombre.focus();
                 seguir = false;
               }
               else
                 {
                 if ((owner.value.length==0) || (owner.value == ' '))
                   {
                   alert('Debe escribir el owner.');
                   owner.focus();
                   seguir = false;
                 }
                 else
                   {
                   if ((version.value.length==0) || (version.value == ' '))
                     {
                     alert('Debe ingresar la versión.');
                     version.focus();
                     seguir = false;
                   }
                   else
                     {
                     seguir = true;
                   }  
                 }
               }
    } 
  }
  else
    {
      // si no se quiere actualizar implica que se quiere eliminar (pasar a estado inactivo):  
      if (confirm('¿Confirma la eliminación ' + pregunta + nombre.value + ' con owner ' + owner.value + ' de la referencia: ' + document.getElementById("codigo").value + '?'))
        {  
        document.getElementById("flagEliminar").value = 1;
        formu.action = 'referencia.php?idreferencias=' + referencia;
        seguir = true;
      }
      else seguir = false;
    
  }
  seguir = false;
  if (seguir) formu.submit();
}

/*
function validarLlave()
  {
  var seguir = false;
  var indice = document.getElementById("tipo").selectedIndex;
  
  if (document.getElementById("nombreLlave").value.length === 0)
    {
    alert('Debe ingresar el nombre de la llave.');
    document.getElementById("nombreLlave").focus();
    seguir = false;
  }
  else
    {
    if (document.getElementById("owner").value.length === 0)
      {
      alert('Debe ingresar el owner de la llave.');
      document.getElementById("owner").focus();
      seguir = false;
    } 
    else
      {
      if (document.getElementById("bits").value.length === 0)
        {
        alert('Debe ingresar el tamaño de la llave.');
        document.getElementById("bits").focus();
        seguir = false;
      }
      else
        {
        if ((validarEntero(document.getElementById("bits").value)) && (document.getElementById("bits").value > 0))
          {  
          if (document.getElementById("version").value.length === 0)
            {
            alert('Debe ingresar la versión de la llave.');
            document.getElementById("version").focus();
            seguir = false;
          }
          else
            {
            if (document.getElementById("tipo").options[indice].value === 'RSA')
              {
              if (document.getElementById("exponente").value.length === 0)
                {
                alert('Debe especificar un exponente dado que la llave es del tipo RSA.');
                document.getElementById("exponente").focus();
                seguir = false;
              }
              else
                {
                if ((validarEntero(document.getElementById("exponente").value)) && (document.getElementById("exponente").value > 0))
                  {
                  seguir = true;
                }
                else
                  {
                  alert('El exponente debe ser un número entero positivo.');
                  document.getElementById("exponente").value = '';
                  document.getElementById("exponente").focus();
                  seguir = false;
                }
              }
            }  
            else
              {
              seguir = true;
            }
          }
        }
        else
          {
          alert('El tamaño debe ser un número entero positivo.');
          document.getElementById("bits").value = '';
          document.getElementById("bits").focus();
          seguir = false;
        }
      }
    }  
  }
  
  if (seguir) return true;
  else return false;
}
*/
/*
function validarCertificado()
  {
  var seguir = false;
  var indice = document.getElementById("bandera").selectedIndex;
  
  if (document.getElementById("nombreCertificado").value.length === 0)
    {
    alert('Debe ingresar el nombre del certificado.');
    document.getElementById("nombreCertificado").focus();
    seguir = false;
  }
  else
    {
    if (document.getElementById("owner").value.length === 0)
      {
      alert('Debe ingresar el owner del certificado.');
      document.getElementById("owner").focus();
      seguir = false;
    } 
    else
      {
      if (document.getElementById("version").value.length === 0)
        {
        alert('Debe ingresar la versión del certificado.');
        document.getElementById("version").focus();
        seguir = false;
      }
      else
        {
        if (document.getElementById("vencimiento").value.length === 0)
          {
          alert('Debe ingresar el vencimiento del certificado.');
          document.getElementById("vencimiento").focus();
          seguir = false;
        }  
        else
          {
          seguir = true;
        }      
      }
    }  
  }
  
  if (seguir) return true;
  else return false;
}
*/
/*
function validarReferencia()
  {
  var seguir = true;
  var indicePlataforma = document.getElementById("plataforma").selectedIndex;
  var indiceSlot = document.getElementById("slot").selectedIndex;
  
  if (document.getElementById("codigo").value.length === 0)
    {
    alert('Debe ingresar el CÓDIGO para la referencia.');
    document.getElementById("codigo").focus();
    seguir = false;
  }
  else
    {
    if (document.getElementById("slot").options[indiceSlot].value === 'ninguno')
      {
      alert('Debe seleccionar un SLOT (HSM).');
      document.getElementById("slot").focus();
      seguir = false;
    }
    else
      {
      if (document.getElementById("plataforma").options[indicePlataforma].value === 'ninguno')
        {
        alert('Debe seleccionar una PLATAFORMA.');
        document.getElementById("plataforma").focus();
        seguir = false;
      }
      else
        {
        if (document.getElementById("resumen").value.length === 0)
          {
          alert('Debe ingresar el RESUMEN de la referencia.');
          document.getElementById("resumen").focus();
          seguir = false;
        }
        else
          {
          if (document.getElementById("detalles").value.length === 0)
            {
            alert('Deben ingresarse los DETALLES de la referencia.');
            document.getElementById("detalles").focus();
            seguir = false;
          }
          else
            {
            seguir = true;            
          }
        } // if detalles
      } // if resumen
    } // if plataforma
  } // if slot

  if (seguir) return true;
  else return false;
}
*/