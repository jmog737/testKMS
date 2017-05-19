/**
///  \file script.js
///  \brief Archivo que contiene todas las funciones de Javascript.
///  \author Juan Martín Ortega
///  \version 1.0
///  \date Marzo 2017
*/

/***********************************************************************************************************************
/// ************************************************** FUNCIONES GENÉRICAS *********************************************
************************************************************************************************************************
*/

/**
 * \brief Función que vacía el contenido del div cuyo Id se pasa como parámetro.
 * @param id {String} String del Id del DIV que se quiere vaciar.
 */
function vaciarContent (id) {
  $(id).empty();
}

/**
  \brief Función que habilita o deshabilita los botones según el caso en el que se esté.
*/
function cambiarEdicion()
  {
  var fuente = document.getElementById("fuente").value;
  var editar = "";
  switch (fuente) {
    case "actividad": editar = document.getElementById("editarActividad").value;
                      break;
    case "referencia": editar = document.getElementById("editarReferencia").value;
                       break;
    case "llave": editar = document.getElementById("editarLlave").value;
                  break;
    case "certificado": editar = document.getElementById("editarCertificado").value;
                        break;
    case "usuario": editar = document.getElementById("editarUsuario").value;
                        break;    
    case "slot": editar = document.getElementById("editarSlot").value;
                        break;                    
    default: break;
  }
  
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
                    habilitarLlave();
                  }
                 else
                    {
                    inhabilitarLlave(); 
                  }
                 break;
    case "certificado":
                      if (accion === "habilitar")
                        {
                        habilitarCertificado();
                      }
                      else
                        {
                        inhabilitarCertificado();      
                      }
                      break;
    case "actividad":
                    if (accion === "habilitar")
                      {
                      habilitarActividad(); 
                    }
                    else
                      {
                      inhabilitarActividad();
                    }
                    break;
    case "referencia":
                      if (accion === "habilitar")
                        {
                        habilitarReferencia();
                      }
                      else
                        {
                        inhabilitarReferencia(); 
                      }
                      break;
    case "usuario":
                      if (accion === "habilitar")
                        {
                        habilitarUsuario();
                      }
                      else
                        {
                        inhabilitarUsuario();
                      }
                      break;
    case "slot":
                      if (accion === "habilitar")
                        {
                        habilitarSlot();
                      }
                      else
                        {
                        inhabilitarSlot(); 
                      }
                      break;                  
    default: break;                  
  }  
}

/**
  \brief Función que valida que el parámetro pasado sea un entero.
  @param valor Dato a validar.                  
*/
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

/***********************************************************************************************************************
/// ********************************************** FIN FUNCIONES GENÉRICAS *********************************************
************************************************************************************************************************
*/

/***********************************************************************************************************************
/// *********************************************** FUNCIONES ACTIVIDADES **********************************************
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
        var tabla = '<table class="tabla2" id="listaActividades">';
        tabla += '<tr><th class="tituloTablaIzquierdo">FECHA</th><th colspan="2" class="tituloTablaDerecho">MOTIVO</th></tr>';
        var tr = '';
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
                  <td><a href="#titulo" class="detailActivity" id="'+actual+'" >'+fecha+'</a></td>\n\
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
                 <td colspan="4" class="pieTabla"><input type="button" id="agregarActividad" value="NUEVA" class="btn-success"></td>\n\
               </tr>';     
        tabla += tr;
        tabla += '</table>';
        var cargar = '<h2>ACTIVIDADES</h2>';
        cargar += tabla;
        $(selector).html(cargar);
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
  \brief Función que deshabilita los input del form Actividad.
*/
function inhabilitarActividad() {
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

/**
  \brief Función que habilita los input del form Actividad.
*/
function habilitarActividad() {
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

/**
  \brief Función que recupera y carga los datos de la actividad pasada como parámetro.
  @param {Int} activity Entero con el índice de la actividad a recuperar.
*/
function cargarDetalleActividad(activity){
  var url = "data/handleLogbook.php"; 
  var query = "select * from actividades where estado='activa' and idactividades='"+activity+"'";
  if ($("#content").length === 0) {
    var divs = "<div id='fila' class='row'>\n\
                  <div id='selector' class='col-md-6 col-sm-12'></div>\n\
                  <div id='content' class='col-md-6 col-sm-12'></div>\n\
                </div>";
    $("#main-content").empty();
    $("#main-content").append(divs);
  }
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

    var fecha = actividad.fecha;
    var horaInicio = actividad.horaInicio;
    var horaFin = actividad.horaFin;
    var motivo = actividad.motivo;
    var rol1 = actividad.rolUsuario1;
    var rol2 = actividad.rolUsuario2;
    var userId1 = actividad.usuario1;
    var userId2 = actividad.usuario2;

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

    var tabla = '<table id="datosActividad" class="tabla2">';
    tabla += '<tr><th colspan="6" class="tituloTabla">GENERAL</th></tr>';
    tabla += '<tr><th>Motivo</th><td colspan="5" style="vertical-align: middle;"><input type="text" id="motivo" name="motivo" disabled="true" style="width:100%; text-align: center; font-size: 18pt; font-weight: bolder;" value="'+motivo+'"></td></tr>';
    var tr = '';
    tr += '<tr><th>Fecha</th><td><input id="fecha" name="fecha" type="date" disabled="true" style="width:100%; text-align: center" min="2016-10-01" value='+fecha+'></td>\n\
               <th>Inicio</th><td><input id="horaInicio" name="horaInicio" disabled="true" type="time" style="width:100%; text-align: center" min="09:00" max="18:00" step="600" value='+horaInicio+'></td>\n\
               <th>Fin</th><td><input id="horaFin" name="horaFin" disabled="true" type="time" style="width:100%; text-align: center" min="09:00" max="18:00" step="600" value='+horaFin+'></td>\n\
           </tr>';
    tr += '<tr><th colspan="6">PERSONAL DE LA EMPRESA</th></tr>';
    tr += '<tr><th colspan="3">Nombre</th><th colspan="3">Rol</th></tr>';
    tr += '<tr>\n\
              <td colspan="3"><select id="usuario1" name="usuario1" style="width:100%;" disabled="true">\n\
                                <option value="ninguno" selected="yes">--- SELECCIONAR ---</option>';
    var elegido = '';
    for (var index in usuarios) {
      if (usuarios[index]["idusuarios"] === userId1) {
        elegido = "selected";
      }
      else {
        elegido = "";
      };
      tr += '<option value="'+usuarios[index]["idusuarios"]+'" '+elegido+'><a href="#">'+usuarios[index]["nombre"]+' '+usuarios[index]["apellido"]+'</a></option>';
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
      tr += '<option value="'+usuarios[index]["idusuarios"]+'" '+elegido+'><a href="#">'+usuarios[index]["nombre"]+' '+usuarios[index]["apellido"]+'</a></option>';
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
    tr += '<tr><td colspan="6" class="pieTabla"><input type="button" id="nuevaRef" name="nuevaRef" value="NUEVA REFERENCIA" class="btn-success"></td></tr>'
    tr += '<tr><td style="display:none"><input type="text" id="activity" name="activity" value='+activity+'></td></tr>';
    tabla += tr;
    tabla += '</table>';
    var cargar = '<h2>DETALLES</h2>';
    cargar += tabla;
    var formu = '<form name="activity" method="post" action="referencia.php">';
    formu += '<h2></h2>';
    formu += tabla;
    formu += '</form>';
    $('#content').html(cargar);
  });//** fin del getJSON req1 ***  
}

/***********************************************************************************************************************
/// *********************************************** FIN FUNCIONES ACTIVIDADES ******************************************
************************************************************************************************************************
*/



/***********************************************************************************************************************
/// *********************************************** FUNCIONES REFERENCIAS **********************************************
************************************************************************************************************************
*/

/**
 * \brief Función que carga en el form referencia los datos de la referencia.
 * Básicamente a partir de la parte de la url pasada como parámetro, detecta el idreferencia, consulta
 * a la base de datos y recupera los valores.
 * @param {String} parametros String que contiene la parte de la url a partir del ? (incluyéndolo). 
 */  
function mostrarReferencia(parametros) {
  var temp = parametros.split('?');
  var temp1 = temp[1].split('=');
  var idref = parseInt(temp1[1], 10);

  var url = "data/loadReference.php";
  var query = 'select referencias.idreferencias, referencias.actividad, referencias.codigo, referencias.lugar, referencias.plataforma, referencias.aplicacion, referencias.resumen, referencias.detalles, hsm.idhsm, slots.idslots as idslot from referencias inner join slots on referencias.slot=slots.idslots inner join hsm on hsm.idhsm=slots.hsm where referencias.idreferencias="'+idref+'"';
  
  $.getJSON(url, {query: ""+query+""}).done(function(request) {
    var referencia = request.referencia;
    
    var slots = request.slots;
    var hsms = request.hsms;
    var nombreSlot = request.nombreSlot;
    var temp = nombreSlot.split("_");
    var cliente = temp[0];
    var idref = referencia['idreferencias'];
    var actividad = referencia['actividad'];
    var codigo = referencia['codigo'];
    var resumen = referencia['resumen'];
    var idslot = referencia['idslot'];
    var idhsm = referencia['idhsm'];
    var lugar = referencia['lugar'];
    var plataforma = referencia['plataforma'];
    var aplicacion = referencia['aplicacion'];
    if (aplicacion === null) aplicacion = '';
    var detalles = referencia['detalles'];
    //alert('idref: '+idref+'\nactividad: '+actividad+'\ncodigo: '+codigo+'\nresumen: '+resumen+'\nhsm: '+referencia['hsm']+'\nslot: '+referencia['slot']+'\nlugar: '+lugar+'\nplataforma: '+plataforma+'\naplicacion: '+aplicacion+'\ndetalles: '+detalles);
    
    var advantis = '';
    var convego = '';
    var cosmo = '';
    var ninguno = '';
    var divs = "<div id='fila' class='row'>\n\
                  <div id='selector' class='col-md-6 col-sm-12'></div>\n\
                  <div id='content' class='col-md-6 col-sm-12'></div>\n\
                </div>";
    
    url = "data/selectQuery.php";
    query = 'select idusuarios as id, nombre, apellido, empresa from usuarios order by empresa asc, apellido asc';
    
    $.getJSON(url, {query: ""+query+""}).done(function(request) {
      var usuarios = request.resultado;
      
      url = "data/selectQuery.php";
      query = "select usuario, rol from involucrados inner join usuarios on involucrados.usuario=usuarios.idusuarios where referencia='"+idref+"' order by usuarios.empresa asc, usuarios.apellido asc";
      
      $.getJSON(url, {query: ""+query+""}).done(function(request) {
        var involucrados = request.resultado;
        
        var tabla = '<table id="ref" class="tabla2">';
        tabla += '<tr><th colspan="6" class="tituloTabla">GENERAL</th></tr>';
        var tr = '';
        tr += '<tr>\n\
                 <th>Lugar</th><td><input type="text" id="lugar" name="lugar" value="'+lugar+'"></td>';
        tr += '<th>HSM</th>\n\
                <td>\n\
                  <select id="hsm" name="hsm" style="width:100%;" disabled="true">\n\
                    <option value="ninguno" selected="yes">--- SELECCIONAR ---</option>';
        var elegido = '';
        for (var index in hsms) {
          if (hsms[index]["idhsm"] === idhsm) {
            elegido = "selected";
          }
          else {
            elegido = "";
          };
          tr += '<option value="'+hsms[index]["nombre"]+'" '+elegido+'>'+hsms[index]["nombre"]+'</option>';
        };
        tr += '</select></td>';
        tr += '<th>SLOT</th>\n\
                <td>\n\
                  <select id="slot" name="slot" style="width:100%;" disabled="true">\n\
                    <option value="ninguno" selected="yes">--- SELECCIONAR ---</option>';
        for (var index1 in slots) {
          if (slots[index1]["nombre"] === nombreSlot) {
            elegido = "selected";
          }
          else {
            elegido = "";
          };
          tr += '<option value="'+slots[index1]["nombre"]+'" ' + elegido + '>' + slots[index1]["nombre"] + '</option>';
        };
        tr += '</select></td>';
        tr += '<tr>\n\
                 <th>Plataforma</th><td colspan="3">';
        switch (plataforma) {
          case 'Advantis 4.1': advantis = 'selected';
                               break;
          case 'Convego 6.2': convego = 'selected';
                              break;
          case 'Cosmo 5': cosmo = 'selected';
                          break;
          default: ninguno = 'selected';
                   break;
        }
        tr += '<select id="plataforma" name="plataforma" style="width:100%">\n\
                <option value="ninguno" '+ ninguno + '>--- SELECCIONAR ---</option>\n\
                <option value="Advantis 4.1" '+ advantis + '>Advantis 4.1</option>\n\
                <option value="Convego 6.2" '+ convego + '>Convego 6.2</option>\n\
                <option value="Cosmo 5" '+ cosmo + '>Cosmo 5</option>\n\
              </select>\n\
              </td>';
        tr += '<th>Aplicación</th><td><input type="text" id="aplicacion" name="aplicacion" value="'+aplicacion+'"></td>\n\
              </tr>';
        tr += '<tr><th colspan="6">RESUMEN</th></tr>';
        tr += '<tr><td colspan="6"><input type="text" id="resumen" name="resumen" value="'+resumen+'"></td></tr>';
        tr += '<tr><th colspan="6">DETALLES</th></tr>';
        tr += '<tr><td colspan="6"><input type="text" id="detalles" name="detalles" value="'+detalles+'" ></td></tr>';
        tr += '<tr><th colspan="6">INVOLUCRADOS</th></tr>';
        tr += '<tr>\n\
                  <th colspan="2">Nombre</th>\n\
                  <th colspan="2">Empresa</th>\n\
                  <th colspan="2">Rol</th>\n\
               </tr>';
        
        var roles = ['user/officer', 'Testigo', 'User', 'Officer'];
        for (var i in involucrados) {
          tr += '<tr>\n\
                    <td colspan="2">\n\
                      <select id="nombreUsuario" name="nombreUsuario" class="nombreUsuario">';
          var empresa = '';
          var rol = '';
          for (var index in usuarios)
            {
            if (involucrados[i]["usuario"] === usuarios[index]["id"]) {
              elegido = 'selected';
              empresa = usuarios[index]["empresa"];
              rol = involucrados[i]["rol"];
            }
            else {
              elegido = '';
            }          
            tr += '<option id="'+usuarios[index]["id"]+'" value="'+usuarios[index]["id"]+'" '+elegido+'>'+usuarios[index]["nombre"]+' '+usuarios[index]["apellido"]+'</option>';
          }
          tr += '</select>\n\
                  </td>\n\
                  <td colspan="2">\n\
                    <input type="text" name="empresaUsuario" value="'+empresa+'">\n\
                  </td>';
          tr += '</td>\n\
                 <td colspan="2">\n\
                   <select name="rolUsuario" class="rolUsuario">';
          for (var index in roles)
            {
            if (rol === roles[index]) {
              elegido = 'selected';
            }
            else {
              elegido = '';
            }          
            tr += '<option value="'+roles[index]+'" '+elegido+'>'+roles[index]+'</option>';
          }
          tr += '</select>\n\
                </td>\n\
              </tr>';
          }
        tr += '<tr>\n\
                 <td colspan="2" class="pieTablaIzquierdo"><input type="button" id="editarReferencia" name="editarReferencia" value="EDITAR" onclick="cambiarEdicion()" class="btn-info"></td>\n\
                 <td colspan="2"><input type="button" id="actualizarReferencia" name="actualizarReferencia" value="ACTUALIZAR" class="btn-warning"></td>\n\
                 <td colspan="2"  class="pieTablaDerecho"><input type="button" id="eliminarReferencia" name="eliminarReferencia" value="ELIMINAR" class="btn-danger"></td>\n\
               </tr>';
        tr += '<tr>\n\
                  <td style="display:none"><input type="text" id="actividad" name="actividad" value="'+actividad+'"></td>\n\
                  <td style="display:none"><input type="text" id="codigo" name="codigo" value="'+codigo+'"></td>\n\
                  <td style="display:none"><input type="text" id="fuente" name="fuente" value="referencia"></td>\n\
                  <td style="display:none"><input type="text" id="idslot" name="idslot" value="'+idslot+'"></td>\n\
                  <td style="display:none"><input type="text" id="idref" name="idref" value="'+idref+'"></td>\n\
              </tr>';
        //tr += '<tr><td colspan="6"><input type="button" name="newReference" id="newReference" value="AGREGAR" class="btn-success"></td></tr>';
        tabla += tr;
        tabla += '</table>';    
        var formu = '<form name="reference" method="post" action="index.php">';
        formu += tabla;
        var volver = '<br><a href="#" name="'+actividad+'" id="volverActividad">Volver</a>';
        var cargar = '';
        cargar += tabla;
        cargar += volver;
        var encabezado = '<h1 id="titulo" class="encabezado">' + codigo + '</h1>';
        encabezado += '<h3>'+resumen+' <b>('+cliente+')</b></h3>';
        $("#main-content").empty();
        $('#main-content').html(encabezado);
        $("#main-content").append(divs);
        $("#selector").html(cargar);
        inhabilitarReferencia();
        cargarObjetos(idref, "#content", true, 'llave',0);
      });
    });
  });
}

/**
  \brief Función que deshabilita los input del form Referencia.
*/
function inhabilitarReferencia() {
  document.getElementById("lugar").disabled = true;
  document.getElementById("hsm").disabled = true;
  document.getElementById("slot").disabled = true;
  document.getElementById("aplicacion").disabled = true;
  document.getElementById("plataforma").disabled = true;
  document.getElementById("resumen").disabled = true; 
  document.getElementById("detalles").disabled = true; 
  $("select[name='nombreUsuario']").prop('disabled', true);
  $("input[name='empresaUsuario']").prop('disabled', true);
  $("select[name='rolUsuario']").prop('disabled', true);
  document.getElementById("editarReferencia").value = "EDITAR";
  document.getElementById("actualizarReferencia").disabled = true;
}

/**
  \brief Función que habilita los input del form Referencia.
*/
function habilitarReferencia() {
  document.getElementById("lugar").disabled = false;
  document.getElementById("hsm").disabled = false;
  document.getElementById("slot").disabled = false;
  document.getElementById("aplicacion").disabled = false;
  document.getElementById("plataforma").disabled = false;
  document.getElementById("resumen").disabled = false; 
  document.getElementById("detalles").disabled = false; 
  $("select[name='nombreUsuario']").prop('disabled', false);
  $("select[name='rolUsuario']").prop('disabled', false);
  document.getElementById("editarReferencia").value = "BLOQUEAR";
  document.getElementById("actualizarReferencia").disabled = false;
}

/**
 * \brief Función que valida los datos pasados para la Referencia.
 * @returns {Boolean} Devuelve un booleano que indica si se pasó o no la validación de los datos para la Referencia.
 */
function validarReferencia()
  {
  var seguir = true;
  var indicePlataforma = document.getElementById("plataforma").selectedIndex;
  var indiceSlot = document.getElementById("slot").selectedIndex;
  var indiceHSM = document.getElementById("hsm").selectedIndex;
  
  if (document.getElementById("codigo").value.length === 0)
    {
    alert('Debe ingresar el CÓDIGO para la referencia.');
    document.getElementById("codigo").focus();
    seguir = false;
  }
  else
    {
    if (document.getElementById("hsm").options[indiceHSM].value === 'ninguno')
      {
      alert('Debe seleccionar un HSM.');
      document.getElementById("hsm").focus();
      seguir = false;
    }
    else
      {  
      if (document.getElementById("slot").options[indiceSlot].value === 'ninguno')
        {
        alert('Debe seleccionar un SLOT.');
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
            } // if detalles
          } // if resumen
        } // if plataforma
      } // if slot
    } // if HSM
  } // if codigo  

  if (seguir) return true;
  else return false;
}

/**
 * \brief Función que carga en el div Content todos los objetos asociados a la referencia (si los hay).
 * @param {int} ref Entero que representa el identificador de la referencia.
 * @param {String} selector String que identifica el div en el cual se deben cargar los objetos.
 * @param {Boolean} link Booleano que indica si los objetos se deben cargar con datos en la url o no.
 * @param {String} origen String que indica si vengo de llaves o de certificados.
 * @param {int} idobject Entero que, de ser diferente de 0, indica que se debe resaltar la llave o certificado con ese id.
 * @returns {Object} resultdo Array que tiene como primer objeto el array con los idKeys de la referencia, y como segundo el array con los idscerts de la misma. 
 */
function cargarObjetos(ref, selector, link, origen, idobject) {
  var url = "data/selectQuery.php";
  var query = 'select referencias.codigo, referencias.resumen, tareas.accion, slots.nombre as slot, llaves.idkeys, llaves.nombre, llaves.owner, llaves.kcv from slots inner join referencias on referencias.slot=slots.idslots inner join tareas on referencias.idreferencias=tareas.referencia inner join llaves on tareas.idtareas=llaves.tarea where idreferencias="'+ref+'" and llaves.estado="activa" order by llaves.owner';
  
  $.getJSON(url, {query: ""+query+""}).done(function(request) {
    var totalLlaves = parseInt(request.rows, 10);
    var llaves = request.resultado;
    
    var query = 'select referencias.codigo, referencias.resumen, tareas.accion, slots.nombre as slot, certificados.idcertificados, certificados.nombre, certificados.owner from slots inner join referencias on referencias.slot=slots.idslots inner join tareas on referencias.idreferencias=tareas.referencia inner join certificados on tareas.idtareas=certificados.tarea where idreferencias="'+ref+'" and certificados.estado="activo" order by certificados.owner';
    
    $.getJSON(url, {query: ""+query+""}).done(function(request) {
      var totalCertificados = parseInt(request.rows, 10);
      var certificados = request.resultado;
      var tabla = '';
      var tr = '';
      
      idobject = parseInt(idobject, 10);
      if (origen === 'llave') {
        var idkey = idobject;
        var idcert = 0;
      }
      else {
        idkey = 0;
        idcert = idobject;
      }
      if (totalLlaves > 0){
        var codigo = llaves[0]["codigo"];
        var slot = llaves[0]["slot"];
        var temp = slot.split("_");
        var cliente = temp[0];
        var resumen = llaves[0]["resumen"];
      }
      else {
        if (totalCertificados > 0) {
          if (codigo === "undefined") var codigo = llaves[0]["codigo"];
          if (slot === "undefined") {
            var slot = llaves[0]["slot"];
            var temp = slot.split("_");
            var cliente = temp[0];
          }
          if (resumen === "undefined") var resumen = llaves[0]["resumen"];
        }
      }
      tabla = '<table id="objects" class="tabla2">';
      tabla += '<tr><th colspan="5" class="tituloTabla">LLAVES</th></tr>';
      tabla += '<tr>\n\
                  <td style="display:none"><input type="text" id="codigo" name="codigo" value="'+codigo+'"></td>\n\
                  <td style="display:none"><input type="text" id="slot" name="slot" value="'+slot+'"></td>\n\
                  <td style="display:none"><input type="text" id="idref" name="idref" value="'+ref+'"></td>\n\
                  <td style="display:none"><input type="text" id="resumen" name="resumen" value="'+resumen+'"></td>\n\
               </tr>';
      if (totalLlaves > 0) {      
        tr += '<tr>\n\
                 <th>Ítem</th>\n\
                 <th>Acción</th>\n\
                 <th>Nombre</th>\n\
                 <th>Owner</th>\n\
                 <th>KCV</th>\n\
               </tr>';
        var j = 0;
        var id = 0;
        
        for (var index in llaves) {
          j += 1;
          id = parseInt(llaves[index]["idkeys"], 10);
          var clase;
          if ((idkey !== 0) && (idkey === id)){
              clase = 'resaltado';
          }
          else {
            clase = '';
          }
          tr += '<tr>\n\
                   <td>'+j+'</td>\n\
                   <td>'+llaves[index]["accion"]+'</td>';
          if (link) {
            tr += '<td><a name="llave" href="llave.php?idkey='+id+'&ref='+ref+'" id="'+id+'" class="detailObject '+clase+'">'+llaves[index]["nombre"]+'</a></td>';
          }
          else {
            tr += '<td><a name="llave" href="#titulo" id="'+id+'" class="detailObject '+clase+'">'+llaves[index]["nombre"]+'</a></td>';
          }
          tr +=  '<td>'+llaves[index]["owner"]+'</td>\n\
                  <td style="background-color: #efd874"><b>'+llaves[index]["kcv"]+'</b></td>\n\
                </tr>';
        }
      }
      tr += '<tr><td colspan="5"><input type="button" id="nuevaLlave" name="'+ref+'" value="NUEVA LLAVE" class="btn-success"></td></tr>';
      var tr1 = '<tr><th colspan="5">CERTIFICADOS</th></tr>';
      if (totalCertificados > 0) {
        tr1 += '<tr>\n\
                 <th>Ítem</th>\n\
                 <th>Acción</th>\n\
                 <th colspan="2">Nombre</th>\n\
                 <th>Owner</th>\n\
              </tr>';
        var i = 0;
        var id1 = 0;
        for (var index in certificados) {
          i += 1;
          id1 = parseInt(certificados[index]["idcertificados"], 10);
          var clase1;
          if ((idcert !== 0) && (idcert === id1)){
              clase1 = 'resaltado';
          }
          else {
            clase1 = '';
          }
          tr1 += '<tr>\n\
                   <td>'+i+'</td>\n\
                   <td>'+certificados[index]["accion"]+'</td>';
          if (link) {
            tr1 += '<td colspan="2"><a name="certificado" href="certificado.php?idcertificado='+id1+'&ref='+ref+'" id="'+id1+'" class="detailObject '+clase1+'">'+certificados[index]["nombre"]+'</a></td>';
          }
          else {
            tr1 += '<td colspan="2"><a name="certificado" href="#titulo" id="'+id1+'" class="detailObject '+clase1+'">'+certificados[index]["nombre"]+'</a></td>';
          }
          tr1 += '<td>'+certificados[index]["owner"]+'</td>\n\
                 </tr>';
        }
      }
      tr1 += '<tr><td colspan="5" class="pieTabla"><input type="button" id="nuevoCertificado" name="'+ref+'" value="NUEVO CERT." class="btn-success"></td></tr>';
      tabla += tr;
      tabla += tr1;
      tabla += '</table>';
      if ($("#content").length === 0) {
      var divs = "<div id='fila' class='row'>\n\
                <div id='selector' class='col-md-5 col-sm-12'></div>\n\
                <div id='content' class='col-md-7 col-sm-12'></div>\n\
              </div>";
      $("#main-content").empty();
      var encabezado = '<h1 class="encabezado" id="titulo">'+codigo+'</h1>';
      encabezado += '<h3>'+resumen+' <b>('+cliente+')<b></h3>'; 
      $("#main-content").html(encabezado);
      $("#main-content").append(divs);
    }
    $(selector).html(tabla);
    });
  });
}

/***********************************************************************************************************************
/// ********************************************* FIN FUNCIONES REFERENCIAS ********************************************
************************************************************************************************************************
*/



/***********************************************************************************************************************
/// ************************************************** FUNCIONES LLAVES ************************************************
************************************************************************************************************************
*/

/**
  \brief Función que deshabilita los input del form Llave.
*/
function inhabilitarLlave(){
  document.getElementById("nombre").disabled = true;
  document.getElementById("owner").disabled = true;
  document.getElementById("kcv").disabled = true;
  document.getElementById("tipo").disabled = true;
  document.getElementById("bits").disabled = true;
  document.getElementById("exponente").disabled = true;
  document.getElementById("generacion").disabled = true;
  document.getElementById("accion").disabled = true;
  document.getElementById("version").disabled = true;
  document.getElementById("observaciones").disabled = true;
  document.getElementById("uso_encrypt").disabled = true;
  document.getElementById("uso_decrypt").disabled = true;
  document.getElementById("uso_sign").disabled = true;
  document.getElementById("uso_verify").disabled = true;
  document.getElementById("uso_wrap").disabled = true;
  document.getElementById("uso_unwrap").disabled = true; 
  document.getElementById("uso_import").disabled = true;
  document.getElementById("uso_export").disabled = true;
  document.getElementById("uso_derive").disabled = true;
  document.getElementById("att_sensitive").disabled = true;
  document.getElementById("att_modifiable").disabled = true;
  document.getElementById("att_trusted").disabled = true;
  document.getElementById("att_wrapwtrusted").disabled = true;
  document.getElementById("att_derivemask").disabled = true;
  document.getElementById("att_unwrapmask").disabled = true;
  document.getElementById("att_extractable").disabled = true;
  document.getElementById("att_exportable").disabled = true;
  document.getElementById("att_deletable").disabled = true;
  document.getElementById("att_private").disabled = true;
  document.getElementById("editarLlave").value = "EDITAR";
  document.getElementById("actualizarLlave").disabled = true;
}

/**
  \brief Función que habilita los input del form Llave.
*/
function habilitarLlave(){
  document.getElementById("nombre").disabled = false;
  document.getElementById("owner").disabled = false;
  document.getElementById("kcv").disabled = false;
  document.getElementById("tipo").disabled = false;
  document.getElementById("bits").disabled = false;
  document.getElementById("exponente").disabled = false;
  document.getElementById("generacion").disabled = false;
  document.getElementById("accion").disabled = false;
  document.getElementById("version").disabled = false;
  document.getElementById("observaciones").disabled = false;
  document.getElementById("uso_encrypt").disabled = false;
  document.getElementById("uso_decrypt").disabled = false;
  document.getElementById("uso_sign").disabled = false;
  document.getElementById("uso_verify").disabled = false;
  document.getElementById("uso_wrap").disabled = false;
  document.getElementById("uso_unwrap").disabled = false; 
  document.getElementById("uso_import").disabled = false;
  document.getElementById("uso_export").disabled = false;
  document.getElementById("uso_derive").disabled = false;
  document.getElementById("att_sensitive").disabled = false;
  document.getElementById("att_modifiable").disabled = false;
  document.getElementById("att_trusted").disabled = false;
  document.getElementById("att_wrapwtrusted").disabled = false;
  document.getElementById("att_derivemask").disabled = false;
  document.getElementById("att_unwrapmask").disabled = false;
  document.getElementById("att_extractable").disabled = false;
  document.getElementById("att_exportable").disabled = false;
  document.getElementById("att_deletable").disabled = false;
  document.getElementById("att_private").disabled = false;
  document.getElementById("editarLlave").value = "BLOQUEAR";
  document.getElementById("actualizarLlave").disabled = false;
}

/**
 * \brief Función que carga en el form llave los datos de la misma.
 * Básicamente a partir de la parte de la url pasada como parámetro, detecta el idkey, consulta
 * a la base de datos y recupera los valores.
 * @param {String} id Int con el idkey de la llave a mostrar.
 * @param {String} selector String con el div en donde se deben cargar los datos de la llave. 
 */  
function mostrarLlave(id, selector) {
  var url = "data/selectQuery.php";
  var query = "select llaves.idkeys, llaves.nombre, llaves.owner, llaves.version, llaves.exponente, llaves.bits, llaves.modoGeneracion, llaves.kcv, llaves.tipo, \n\
              llaves.uso_encrypt, llaves.uso_decrypt, llaves.uso_sign, llaves.uso_verify, llaves.uso_wrap, llaves.uso_unwrap, llaves.uso_export, llaves.uso_import, llaves.uso_derive, \n\
              llaves.att_sensitive, llaves.att_modifiable, llaves.att_trusted, llaves.att_wrapwtrusted, llaves.att_private, llaves.att_unwrapmask, llaves.att_extractable, llaves.att_derivemask, llaves.att_exportable, llaves.att_deletable, \n\
              tareas.accion, tareas.observaciones, referencias.codigo, referencias.actividad, referencias.resumen, referencias.idreferencias as ref, slots.nombre as slot from llaves inner join tareas on llaves.tarea=tareas.idtareas inner join referencias on referencias.idreferencias=tareas.referencia inner join slots on referencias.slot=slots.idslots where idkeys='"+id+"' and llaves.estado='activa'";
  
  $.getJSON(url, {query: ""+query+""}).done(function(request) {
    var llave = request.resultado[0];
    
    var tabla1 = '';
    var nombre = llave["nombre"];
    var owner = llave["owner"];
    var kcv = llave["kcv"];
    var tipo = llave["tipo"];
    var des2 = '';
    var rsa = '';
    switch (tipo)
      {
      case 'DES2': des2 = 'selected';
                   break;
      case 'RSA':  rsa = 'selected';
                   break;
      default: break;                       
    }
    var bits = llave["bits"];
    var exponente = llave["exponente"];if (parseInt(exponente, 10) === 0) exponente = '';
    var generacion = llave["modoGeneracion"];
    var aleatoria = '';
    var importada = '';
    var componentes = '';
    var desdeComponentes = '';
    switch (generacion)
      {
      case 'Aleatoria': aleatoria = 'selected';
                        break;
      case 'Importada': importada = 'selected';
                        break;
      case 'En componentes': componentes = 'selected';
                             break;
      case 'Desde componentes': desdeComponentes = 'selected';
                                break;
      default: break;                       
    }
    var accion = llave["accion"];
    var carga = '';
    var genSelected = '';
    var importacion = '';
    var exportacion = '';
    var borrado = '';
    var edicion = '';
    switch (accion)
        {
        case 'Carga': carga = 'selected';
                      break;
        case 'Generación': genSelected = 'selected';
                           break;
        case 'Importación': importacion = 'selected';
                            break;
        case 'Exportación': exportacion = 'selected';
                            break;
        case 'Borrado': borrado = 'selected';
                        break;
        case 'Edición': edicion = 'selected';
                        break;            
        default: break;                       
    }
    var version = llave["version"];
    var observaciones = llave["observaciones"];
    //alert(nombre+'\n'+owner+'\n'+kcv+'\n'+tipo+'\n'+bits+'\n'+exponente+'\n'+generacion+'\n'+accion+'\n'+version+'\n'+observaciones);
    var uso_encrypt = llave["uso_encrypt"]; if (uso_encrypt === "1") uso_encrypt = "checked"; else uso_encrypt = "";
    var uso_decrypt = llave["uso_decrypt"]; if (uso_decrypt === "1") uso_decrypt = "checked"; else uso_decrypt = "";
    var uso_sign = llave["uso_sign"]; if (uso_sign === "1") uso_sign = "checked"; else uso_sign = "";
    var uso_verify = llave["uso_verify"]; if (uso_verify === "1") uso_verify = "checked"; else uso_verify = "";
    var uso_wrap = llave["uso_wrap"]; if (uso_wrap === "1") uso_wrap = "checked"; else uso_wrap = "";
    var uso_unwrap = llave["uso_unwrap"]; if (uso_unwrap === "1") uso_unwrap = "checked"; else uso_unwrap = "";
    var uso_export = llave["uso_export"]; if (uso_export === "1") uso_export = "checked"; else uso_export = "";
    var uso_import = llave["uso_import"]; if (uso_import === "1") uso_import = "checked"; else uso_import = "";
    var uso_derive = llave["uso_derive"]; if (uso_derive === "1") uso_derive = "checked"; else uso_derive = "";
    //alert(uso_encrypt+'\n'+uso_decrypt+'\n'+uso_sign+'\n'+uso_verify+'\n'+uso_export+'\n'+uso_import+'\n'+uso_wrap+'\n'+uso_unwrap+'\n'+uso_derive);
    var att_sensitive = llave["att_sensitive"]; if (att_sensitive === "1") att_sensitive = "checked"; else att_sensitive = "";
    var att_trusted = llave["att_trusted"]; if (att_trusted === "1") att_trusted = "checked"; else att_trusted = "";
    var att_modifiable = llave["att_modifiable"]; if (att_modifiable === "1") att_modifiable = "checked"; else att_modifiable = "";
    var att_wrapwtrusted = llave["att_wrapwtrusted"]; if (att_wrapwtrusted === "1") att_wrapwtrusted = "checked"; else att_wrapwtrusted = "";
    var att_private = llave["att_private"]; if (att_private === "1") att_private = "checked"; else att_private = "";
    var att_unwrapmask = llave["att_unwrapmask"]; if (att_unwrapmask === "1") att_unwrapmask = "checked"; else att_unwrapmask = "";
    var att_derivemask = llave["att_derivemask"]; if (att_derivemask === "1") att_derivemask = "checked"; else att_derivemask = "";
    var att_extractable = llave["att_extractable"]; if (att_extractable === "1") att_extractable = "checked"; else att_extractable = "";
    var att_exportable = llave["att_exportable"]; if (att_exportable === "1") att_exportable = "checked"; else att_exportable = "";
    var att_deletable = llave["att_deletable"]; if (att_deletable === "1") att_deletable = "checked"; else att_deletable = "";
    //alert(att_sensitive+'\n'+att_modifiable+'\n'+att_trusted+'\n'+att_wrapwtrusted+'\n'+att_private+'\n'+att_unwrapmask+'\n'+att_derivemask+'\n'+att_extractable+'\n'+att_exportable+'\n'+att_deletable);
    var codigo = llave["codigo"];
    var actividad = llave["actividad"];
    var resumen = llave["resumen"];
    var ref = llave["ref"];
    var slot = llave["slot"];
    var temp = slot.split('_');
    var cliente = temp[0];
    
    tabla1 = '<table id="llave" class="tabla2">';
    var tr = '<tr><th colspan="10" class="tituloTabla">DATOS GENERALES</th></tr>';
    tr += '<tr>\n\
            <th>Nombre:</th><td colspan="2"><input id="nombre" class="resaltado" type="text" value="'+nombre+'"></td>\n\
            <th>Owner:</th><td colspan="3"><input id="owner" class="resaltado" type="text" value="'+owner+'"></td>\n\
            <th>KCV:</th><td colspan="2"><input id="kcv" type="text" value="'+kcv+'"></td>\n\
           </tr>';
    tr += '<tr>\n\
             <th>Tipo:</th>\n\
             <td colspan="2">\n\
               <select id="tipo" name="tipo" style="width:100%">\n\
                  <option value="DES2" '+des2+'>DES2</option>\n\
                  <option value="RSA" '+rsa+'>RSA</option>\n\
               </select>\n\
             </td>\n\
             <th>Tamaño:</th>\n\
             <td colspan="3"><input id="bits" type="text" value="'+bits+'"></td>\n\
             <th>Exponente:</th>\n\
             <td colspan="2"><input id="exponente" type="text" value="'+exponente+'"></td>\n\
           </tr>';
    tr += '<tr>\n\
             <th>Generación:</th>\n\
             <td colspan="2">\n\
               <select id="generacion" name="generacion" style="width:100%">\n\
                 <option value="Desde componentes"'+desdeComponentes+'>Desde componentes</option>\n\
                 <option value="En componentes"'+ componentes+'>En componentes</option>\n\
                 <option value="Aleatoria"'+ aleatoria+'>Aleatoria</option>\n\
                 <option value="Importada"'+ importada +'>Importada</option>\n\
               </select>\n\
             </td>\n\
             <th>Acción:</th>\n\
             <td colspan="3">\n\
               <select id="accion" name="accion" style="width:100%">\n\
                 <option value="Carga"'+ carga +'>Carga</option>\n\
                 <option value="Generaci&oacute;n"'+ genSelected+' >Generaci&oacute;n</option>\n\
                 <option value="Importaci&oacute;n"'+ importacion +'>Importaci&oacute;n</option>\n\
                 <option value="Exportaci&oacute;n" '+ exportacion +'>Exportaci&oacute;n</option>\n\
                 <option value="Borrado" '+ borrado +'>Borrado</option>\n\
                 <option value="Edici&oacute;n" '+ edicion +'>Edici&oacute;n</option>\n\
               </select>\n\
             </td>\n\
             <th>Versión:</th>\n\
             <td colspan="2"><input type="text" id="version" name="version" value="'+version+'"></td>\n\
           </tr>';
    tr += '<tr>\n\
             <th colspan="2" style="text-align: left">Observaciones:</th>\n\
             <td colspan="8">\n\
               <textarea id="observaciones" name="observaciones" style="width: 100%;resize: none">'+ observaciones +'</textarea>\n\
             </td>\n\
           </tr>';
    tr += '<tr>\n\
             <th colspan="10">USOS</th>\n\
          </tr>';
    tr += '<tr><td colspan="2" style="text-align: left"><input id="uso_encrypt" name="uso_encrypt" type="checkbox" '+ uso_encrypt +'> Encrypt</td>\n\
               <td colspan="2" style="text-align: left"><input id="uso_sign" name="uso_sign" type="checkbox"'+ uso_sign +'> Sign</td>\n\
               <td colspan="2" style="text-align: left"><input id="uso_wrap" name="uso_wrap" type="checkbox"'+ uso_wrap +'> Wrap</td>\n\
               <td colspan="2" style="text-align: left"><input id="uso_export" name="uso_export" type="checkbox"'+ uso_export +'> Export</td>\n\
               <td colspan="2" style="text-align: left"><input id="uso_derive" name="uso_derive" type="checkbox"'+ uso_derive +'> Derive</td>\n\
           </tr>';
    tr += '<tr>\n\
              <td colspan="2" style="text-align: left"><input id="uso_decrypt" name="uso_decrypt" type="checkbox"'+ uso_decrypt+'> Decrypt</td>\n\
              <td colspan="2" style="text-align: left"><input id="uso_verify" name="uso_verify" type="checkbox"'+ uso_verify +'> Verify</td>\n\
              <td colspan="2" style="text-align: left"><input id="uso_unwrap" name="uso_unwrap" type="checkbox"'+ uso_unwrap +'> Unwrap</td>\n\
              <td colspan="2" style="text-align: left"><input id="uso_import" name="uso_import" type="checkbox"'+ uso_import +'> Import</td>\n\
              <td colspan="2" style="text-align: left"></td>\n\
          </tr>';
    tr += '<tr>\n\
            <th colspan="10">ATRIBUTOS</th>\n\
           </tr>';
    tr += '<tr>\n\
              <td colspan="2" style="text-align: left"><input id="att_sensitive" name="att_sensitive" type="checkbox"'+ att_sensitive +'> Sensitive</td>\n\
              <td colspan="2" style="text-align: left"><input id="att_modifiable" name="att_modifiable" type="checkbox"'+ att_modifiable +'> Modifiable</td>\n\
              <td colspan="2" style="text-align: left"><input id="att_private" name="att_private" type="checkbox"'+ att_private +'> Private</td>\n\
              <td colspan="2" style="text-align: left"><input id="att_extractable" name="att_extractable" type="checkbox"'+ att_extractable +'> Extractable</td>\n\
              <td colspan="2" style="text-align: left"><input id="att_exportable" name="att_exportable" type="checkbox"'+ att_exportable +'> Exportable</td>\n\
          </tr>';
    tr += '<tr>\n\
              <td colspan="2" style="text-align: left"><input id="att_trusted" name="att_trusted" type="checkbox"'+ att_trusted +'> Trusted</td>\n\
              <td colspan="2" style="text-align: left"><input id="att_wrapwtrusted" name="att_wrapwtrusted" type="checkbox"'+ att_wrapwtrusted +'> Wrap w/Trusted</td>\n\
              <td colspan="2" style="text-align: left"><input id="att_unwrapmask" name="att_unwrapmask" type="checkbox"'+ att_unwrapmask +'> Unwrap Mask</td>\n\
              <td colspan="2" style="text-align: left"><input id="att_derivemask" name="att_derivemask" type="checkbox"'+ att_derivemask +'> Derive Mask</td>\n\
              <td colspan="2" style="text-align: left"><input id="att_deletable" name="att_deletable" type="checkbox"'+ att_deletable +'> Deletable</td>\n\
          </tr>';
    tr += '<tr>\n\
              <td colspan="4" class="pieTablaIzquierdo"><input type="button" id="editarLlave" name="editarLlave" value="EDITAR" onclick="cambiarEdicion()" class="btn-info"></td>\n\
              <td colspan="3"><input type="button" id="actualizarLlave" name="actualizarLlave" disabled="true" value="ACTUALIZAR" class="btn-warning"></td>\n\
              <td colspan="3" class="pieTablaDerecho"><input type="button" id="eliminarLlave" name="eliminarLlave" value="ELIMINAR" class="btn-danger"></td>\n\
              <td style="display:none"><input type="text" id="fuente" name="fuente" value="llave"></td>\n\
              <td style="display:none"><input type="text" id="idkey" name="idkey" value="'+id+'"></td>\n\
              <td style="display:none"><input type="text" id="idref" name="idref" value="'+ref+'"></td>\n\
          </tr>';                              
    tr += '</table>';
    tabla1 += tr;
    if ($("#content").length === 0) {
      var divs = "<div id='fila' class='row'>\n\
                <div id='selector' class='col-md-5 col-sm-12'></div>\n\
                <div id='content' class='col-md-7 col-sm-12'></div>\n\
              </div>";
      $("#main-content").empty();
      encabezado = '<h1 id="titulo" class="encabezado">' + codigo + '</h1>';
      encabezado += '<h3>'+resumen+' <b>('+cliente+')</b></h3>';
      $("#main-content").html(encabezado);
      $("#main-content").append(divs);
    } 
    var volver = '<br><a href="#" name="'+actividad+'" id="volverActividad">Volver</a>';
    $(selector).html(tabla1);
    $(selector).append(volver);
    inhabilitarLlave();
  });
}

/**
 * \brief Función que valida los datos pasados para la Llave.
 * @returns {Boolean} Devuelve un booleano que indica si se pasó o no la validación de los datos para la Llave.
 */
function validarLlave()
  {
  var seguir = false;
  var indice = document.getElementById("tipo").selectedIndex;
  
  if (document.getElementById("nombre").value.length === 0)
    {
    alert('Debe ingresar el nombre de la llave.');
    document.getElementById("nombre").focus();
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

/***********************************************************************************************************************
/// ************************************************ FIN FUNCIONES LLAVES **********************************************
************************************************************************************************************************
*/



/***********************************************************************************************************************
/// *********************************************** FUNCIONES CERTIFICADOS *********************************************
************************************************************************************************************************
*/

/**
  \brief Función que deshabilita los input del form Certificado.
*/
function inhabilitarCertificado(){
  document.getElementById("nombre").disabled = true;
  document.getElementById("owner").disabled = true;
  document.getElementById("version").disabled = true;
  document.getElementById("accion").disabled = true;
  document.getElementById("bandera").disabled = true;
  document.getElementById("vencimiento").disabled = true;
  document.getElementById("observaciones").disabled = true;
  document.getElementById("editarCertificado").value = "EDITAR";
  document.getElementById("actualizarCertificado").disabled = true;
}

/**
  \brief Función que habilita los input del form Certificado.
*/
function habilitarCertificado(){
  document.getElementById("nombre").disabled = false;
  document.getElementById("owner").disabled = false;
  document.getElementById("version").disabled = false;
  document.getElementById("accion").disabled = false;
  document.getElementById("bandera").disabled = false;
  document.getElementById("vencimiento").disabled = false;
  document.getElementById("observaciones").disabled = false;
  document.getElementById("editarCertificado").value = "BLOQUEAR";
  document.getElementById("actualizarCertificado").disabled = false;
}

/**
 * \brief Función que valida los datos pasados para el certificado.
 * @returns {Boolean} Devuelve un booleano que indica si se pasó o no la validación de los datos para el certificado.
 */
function validarCertificado()
  {
  var seguir = false;
  var indiceBandera = document.getElementById("bandera").selectedIndex;
  var indiceAccion = document.getElementById("accion").selectedIndex;
  
  if (document.getElementById("nombre").value.length === 0)
    {
    alert('Debe ingresar el nombre del certificado.');
    document.getElementById("nombre").focus();
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
      if (indiceBandera === 0)
        {
        alert("Debe seleccionar a que bandera pertenece el certificado.");
        document.getElementById("bandera").focus();
        seguir = false;
      }
      else {
        if (document.getElementById("vencimiento").value.length === 0)
          {
          alert('Debe ingresar el vencimiento del certificado.');
          document.getElementById("vencimiento").focus();
          seguir = false;
        }
        else {
          if (indiceAccion === 0)
            {
            alert('Debe seleccionar la acción del certificado.');
            document.getElementById("accion").focus();
            seguir = false;
          }
          else {
            if (document.getElementById("version").value.length === 0)
              {
              alert('Debe ingresar la versión del certificado.');
              document.getElementById("version").focus();
              seguir = false;
            }
            else {
              seguir = true;
            }
          }// version
        }// acción 
      }// vencimiento
    } // bandera 
  }// owner
  
  if (seguir) return true;
  else return false;
}

/**
 * \brief Función que carga en el form cert los datos del mismo.
 * Básicamente a partir de la parte de la url pasada como parámetro, detecta el idcertificado, consulta
 * a la base de datos y recupera los valores.
 * @param {String} id Int con el idcertificado del certificado a mostrar.
 * @param {String} selector String con el div en donde se deben cargar los datos del certificado. 
 */  
function mostrarCertificado(id, selector){
  var url = "data/selectQuery.php";
  var query = "select certificados.nombre, certificados.owner, certificados.version, certificados.bandera, certificados.vencimiento, \n\
              tareas.accion, tareas.observaciones, referencias.codigo, referencias.actividad, referencias.resumen, referencias.idreferencias as ref, slots.nombre as slot from certificados inner join tareas on certificados.tarea=tareas.idtareas inner join referencias on referencias.idreferencias=tareas.referencia inner join slots on referencias.slot=slots.idslots where idcertificados='"+id+"' and certificados.estado='activo'";
  
  $.getJSON(url, {query: ""+query+""}).done(function(request) {
    var cert = request.resultado[0];
    var nombre = cert["nombre"];
    var owner = cert["owner"];
    var version = cert["version"];
    var bandera = cert["bandera"];
    var vencimiento = cert["vencimiento"];
    var accion = cert["accion"];
    var obs = cert["observaciones"];
    var codigo = cert["codigo"];
    var actividad = cert["actividad"];
    var resumen = cert["resumen"];
    var ref = cert["ref"];
    var slot = cert["slot"];
    //alert('idcert: '+id+'\nnombre: '+nombre+'\nowner: '+owner+'\nversion: '+version+'\nbandera: '+bandera+'\nvencimiento: '+vencimiento+'\naccion: '+accion+'\nobs: '+obs+'\ncodigo: '+codigo+'\nactividad: '+actividad+'\nresumen: '+resumen+'\nref: '+ref+'\nslot: '+slot);
    var carga = '';
    var genSelected = '';
    var importacion = '';
    var exportacion = '';
    var borrado = '';
    var edicion = '';
    switch (accion)
      {
      case 'Carga': carga = 'selected';
                    break;
      case 'Generación': genSelected = 'selected';
                         break;
      case 'Importación': importacion = 'selected';
                          break;
      case 'Exportación': exportacion = 'selected';
                          break;
      case 'Borrado': borrado = 'selected';
                      break;
      case 'Edición': edicion = 'selected';
                      break;            
      default: break;                       
    }
    var master = '';
    var visa = '';
    var amex = '';
    switch (bandera)
      {
      case 'MASTER': master = 'selected';
                   break;
      case 'VISA':  visa = 'selected';
                   break;
      case 'AMEX':  amex = 'selected';
                   break;             
      default: break;                       
    }
    var nom = slot.split('_');
    var cliente = nom[0];
    var tabla = '<table id="cert" class="tabla2" style="max-width:95%">';
    var tr = '<tr><th colspan="8" class="tituloTabla">DATOS GENERALES</th></tr>';
    tr += '<tr>\n\
            <th>Nombre:</th><td><input id="nombre" class="resaltado" type="text" value="'+nombre+'"></td>\n\
            <th colspan="2">Owner:</th><td><input id="owner" class="resaltado" type="text" value="'+owner+'"></td>\n\
            <th>Bandera:</th>\n\
            <td colspan="2">\n\
              <select id="bandera" name="bandera" style="width:100%">\n\
                <option value="sleccionar">---SELECCIONAR---</option>\n\
                <option value="MASTER"'+ master +'>MASTER</option>\n\
                <option value="VISA"'+ visa+' >VISA</option>\n\
                <option value="AMEX"'+ amex+' >AMEX</option>\n\
              </select>\n\
            </td>\n\
           </tr>';
    tr += '<tr>\n\
            <th>Fecha</th>\n\
            <td><input id="vencimiento" name="vencimiento" type="date" value="'+vencimiento+'" style="width:100%; text-align: center" min="2016-10-01"></td>\n\
            <th>Acción:</th>\n\
            <td colspan="2">\n\
              <select id="accion" name="accion" style="width:100%">\n\
                <option value="sleccionar">---SELECCIONAR---</option>\n\
                <option value="Carga"'+ carga +'>Carga</option>\n\
                <option value="Generaci&oacute;n"'+ genSelected+' >Generaci&oacute;n</option>\n\
                <option value="Importaci&oacute;n"'+ importacion +'>Importaci&oacute;n</option>\n\
                <option value="Exportaci&oacute;n" '+ exportacion +'>Exportaci&oacute;n</option>\n\
                <option value="Borrado" '+ borrado +'>Borrado</option>\n\
                <option value="Edici&oacute;n" '+ edicion +'>Edici&oacute;n</option>\n\
              </select>\n\
            </td>\n\
            <th>Versión:</th><td colspan="2"><input id="version" type="text" value="'+version+'"></td>\n\
          </tr>';
    tr += '<tr>\n\
             <th>Observaciones:</th>\n\
             <td colspan="8">\n\
               <textarea id="observaciones" name="observaciones" style="width: 100%;resize: none">'+ obs +'</textarea>\n\
             </td>\n\
           </tr>';
    tr += '<tr>\n\
              <td colspan="2" class="pieTablaIzquierdo"><input type="button" id="editarCertificado" name="editarCertificado" value="EDITAR" onclick="cambiarEdicion()" class="btn-info"></td>\n\
              <td colspan="3"><input type="button" id="actualizarCertificado" name="actualizarCertificado" disabled="true" value="ACTUALIZAR" class="btn-warning"></td>\n\
              <td colspan="2" class="pieTablaDerecho"><input type="button" id="eliminarCertificado" name="eliminarCertificado" value="ELIMINAR" class="btn-danger"></td>\n\
              <td style="display:none"><input type="text" id="fuente" name="fuente" value="certificado"></td>\n\
              <td style="display:none"><input type="text" id="idcert" name="idcert" value="'+id+'"></td>\n\
              <td style="display:none"><input type="text" id="idref" name="idref" value="'+ref+'"></td>\n\
              <td style="display:none"><input type="text" id="actividad" name="actividad" value="'+actividad+'"></td>\n\
          </tr>';                              
    tr += '</table>';
    tabla += tr;
    var cargar = '';
    cargar += tabla;
    if ($("#content").length === 0) {
      var divs = "<div id='fila' class='row'>\n\
                <div id='selector' class='col-md-5 col-sm-12'></div>\n\
                <div id='content' class='col-md-7 col-sm-12'></div>\n\
              </div>";
      $("#main-content").empty();
      var encabezado = '<h1 class="encabezado" id="titulo">'+codigo+'</h1>';
      encabezado += '<h3>'+resumen+' <b>('+cliente+')<b></h3>'; 
      $("#main-content").html(encabezado);
      $("#main-content").append(divs);
    }
    var volver = '<br><a href="#" name="'+actividad+'" id="volverActividad">Volver</a>';
    $(selector).html(cargar);
    $(selector).append(volver);
    inhabilitarCertificado();
  });    
}

/***********************************************************************************************************************
/// ********************************************* FIN FUNCIONES CERTIFICADOS *******************************************
************************************************************************************************************************
**/



/***********************************************************************************************************************
/// ************************************************* FUNCIONES USUARIOS ***********************************************
************************************************************************************************************************
*/

/**
 * \brief Función que carga en el form pasado como parámetro todos los usuarios.
 * @param {String} selector String con el DIV donde se deben de cargar los datos.
 * @param {Int} user Id del usuario a resaltar en el listado.
 */ 
function cargarUsuarios(selector, user){
  var url = "data/selectQuery.php";
  var query = "select idusuarios, apellido, nombre, empresa from usuarios where estado='activo' order by empresa asc, apellido asc, idusuarios asc";
  
  $.getJSON(url, {query: ""+query+""}).done(function(request) {
    var usuario = request.resultado;
    var total = parseInt(request.rows, 10);
    var encabezado = '<h2 id="titulo" class="encabezado">LISTADO DE USUARIOS</h2>';
    var cargar = '';
    cargar += encabezado;
    if (total >= 1) {
      var tabla = '<table id="usuarios" name="usuarios" class="tabla2">';
      var tr = '<tr>\n\
                  <th colspan="4" class="tituloTabla">USUARIOS</th>\n\
                </tr>';
      tr += '<tr>\n\
                <th>Ítem</th>\n\
                <th>Apellido</th>\n\
                <th>Nombre</th>\n\
                <th>Empresa</th>\n\
            </tr>';
      for (var index in usuario) {
        var nombre = usuario[index]["nombre"];
        var apellido = usuario[index]["apellido"];
        var empresa = usuario[index]["empresa"];
        var id = usuario[index]["idusuarios"];
        var i = parseInt(index, 10) + 1;
        var clase = '';
        if ((id !== 0) && (id === user)){
                clase = 'resaltado';
            }
            else {
              clase = '';
            }
        tr += '<tr>\n\
                  <td>'+i+'</td>\n\
                  <td><a href="#" id="'+id+'" class="detailUser '+clase+'">'+apellido+'</a></td>\n\
                  <td><a href="#" id="'+id+'" class="detailUser '+clase+'">'+nombre+'</a></td>\n\
                  <td><b>'+empresa+'</b></td>\n\
              </tr>';
      }
      tr += '<tr>\n\
                <td class="pieTabla" colspan="4"><input type="button" value="NUEVO" id="nuevoUsuario" class="btn-success"></td>\n\
             </tr>';
      tr += '</table>';
      tabla += tr;
      cargar += tabla;
      $(selector).html(cargar);
    }
    else {
      var texto = '<h2>Ya NO quedan usuarios activos!.</h2>';
      cargar += texto;
      vaciarContent("#main-content");
      $("#main-content").html(cargar);
    }    
    
  });
}

/**
  \brief Función que recupera y carga los datos del usuario pasado como parámetro.
  @param {Int} user Entero con el índice del usuario a recuperar.
*/
function cargarDetalleUsuario(user) {
  var url = "data/selectQuery.php"; 
  var query = "select nombre, apellido, empresa, mail, telefono, observaciones from usuarios where idusuarios='"+user+"'";
  
  $.getJSON(url, {query: ""+query+""}).done(function(request) {
    var usuario = request.resultado[0];
    var nombre = usuario["nombre"];
    var apellido = usuario["apellido"];
    var empresa = usuario["empresa"];
    var mail = usuario["mail"];if (mail === null) mail = '';
    var tel = usuario["telefono"];if (tel === null) tel = '';
    var obs = usuario["observaciones"];if (obs === null) obs = '';
    if ($("#content").length === 0) {
      var divs = "<div id='fila' class='row'>\n\
                    <div id='selector' class='col-md-6 col-sm-12'></div>\n\
                    <div id='content' class='col-md-6 col-sm-12'></div>\n\
                  </div>";
      $("#main-content").empty();
      $("#main-content").append(divs);
    }
    cargarUsuarios('#selector', user);
    $("#selector").css('padding-right', '30px');
    
    var emsa = '';
    var bbva = '';
    var itau = '';
    var scotia = '';
    switch (empresa) {
      case "EMSA": emsa = 'selected';
                   break;
      case "BBVA": bbva = 'selected';
                   break;
      case "ITAU": itau = 'selected';
                   break;
      case "SCOTIA": scotia = 'selected';
                     break;
      default: break;               
    }
    var tabla = '<table id="detalleUsuario" name="detalleUsuario" class="tabla2">';
    var tr = '<tr>\n\
                <th colspan="4" class="tituloTabla">DATOS DEL USUARIO</th>\n\
              </tr>';
    tr += '<tr>\n\
              <th>Apellido</th>\n\
              <td><input id="apellido" name="apellido" class="resaltado" type="text" value="'+apellido+'" disabled="true"></td>\n\
              <th>Nombre</th>\n\
              <td><input id="nombre" name="nombre" class="resaltado" type="text" value="'+nombre+'" disabled="true"></td>\n\
          </tr>';
    tr += '<tr>\n\
              <th>Empresa</th>\n\
              <td colspan="3">\n\
                <select id="empresa" name="empresa" style="width:100%" disabled="true">\n\
                  <option value="seleccionar">---SELECCIONAR---</option>\n\
                  <option value="EMSA" '+emsa+'>EMSA</option>\n\
                  <option value="BBVA" '+bbva+'>BBVA</option>\n\
                  <option value="ITAU" '+itau+'>ITAU</option>\n\
                  <option value="SCOTIA" '+scotia+'>SCOTIA</option>\n\
                </select>\n\
              </td>\n\
          </tr>';
    tr += '<tr>\n\
              <th>Mail</th>\n\
              <td colspan="3"><input id="mail" name="mail" type="text" value="'+mail+'" disabled="true"></td>\n\
           </tr>';
    tr += '<tr>\n\
              <th>Teléfono</th>\n\
              <td colspan="3"><input id="telefono" name="telefono" type="text" value="'+tel+'" disabled="true"></td>\n\
           </tr>';
    tr += '<tr>\n\
              <th>Observaciones</th>\n\
              <td colspan="3"><textarea id="observaciones" name="observaciones" style="width: 100%;resize: none" disabled="true">'+ obs +'</textarea></td>\n\
           </tr>';
    tr += '<tr>\n\
              <td class="pieTablaIzquierdo"><input type="button" id="editarUsuario" name="editarUsuario" value="EDITAR" onclick="cambiarEdicion()" class="btn-info"></td>\n\
              <td colspan="2"><input type="button" id="actualizarUsuario" name="actualizarUsuario" disabled="true" value="ACTUALIZAR" class="btn-warning"></td>\n\
              <td class="pieTablaDerecho"><input type="button" id="eliminarUsuario" name="eliminarUsuario" value="ELIMINAR" class="btn-danger"></td>\n\
              <td style="display:none"><input type="text" id="fuente" name="fuente" value="usuario"></td>\n\
              <td style="display:none"><input type="text" id="iduser" name="iduser" value="'+user+'"></td>\n\
          </tr>'; 
    tr += '</table>';
    tabla += tr;
    var encabezado = '<h3 id="titulo" class="encabezado">DETALLES DEL USUARIO</h3>';
    var cargar = '';
    cargar += encabezado;
    cargar += tabla;
    $("#content").html(cargar);
  });
}

/**
  \brief Función que deshabilita los input del form Usuario.
*/
function inhabilitarUsuario(){
  document.getElementById("nombre").disabled = true;
  document.getElementById("apellido").disabled = true;
  document.getElementById("empresa").disabled = true;
  document.getElementById("mail").disabled = true;
  document.getElementById("telefono").disabled = true;
  document.getElementById("observaciones").disabled = true;
  document.getElementById("editarUsuario").value = "EDITAR";
  document.getElementById("actualizarUsuario").disabled = true;
}

/**
  \brief Función que habilita los input del form Usuario.
*/
function habilitarUsuario(){
  document.getElementById("nombre").disabled = false;
  document.getElementById("apellido").disabled = false;
  document.getElementById("empresa").disabled = false;
  document.getElementById("mail").disabled = false;
  document.getElementById("telefono").disabled = false;
  document.getElementById("observaciones").disabled = false;
  document.getElementById("editarUsuario").value = "BLOQUEAR";
  document.getElementById("actualizarUsuario").disabled = false;
}

/**
 * \brief Función que valida los datos pasados para el usuario.
 * @returns {Boolean} Devuelve un booleano que indica si se pasó o no la validación de los datos para el usuario.
 */
function validarUsuario()
  {
  var seguir = false;
  
  if (document.getElementById("nombre").value.length === 0)
    {
    alert('Debe ingresar el nombre del usuario.');
    document.getElementById("nombre").focus();
    seguir = false;
  }
  else
    {
    if (document.getElementById("apellido").value.length === 0)
      {
      alert('Debe ingresar el apellido del usuario.');
      document.getElementById("apellido").focus();
      seguir = false;
    } 
    else
      {
      if (document.getElementById("empresa").value.length === 0)
        {
        alert('Debe ingresar la empresa donde trabaja el usuario.');
        document.getElementById("empresa").focus();
        seguir = false;
      }
      else
        {
        if (document.getElementById("empresa").value === 'seleccionar')
          {
          alert('Debe seleccionar una empresa.');
          document.getElementById("empresa").focus();
          seguir = false;
        }
        else
          {
          seguir = true;
        }// empresa = seleccionar  
      }// empresa
    }// apellido
  }// nombre
  
  if (seguir) return true;
  else return false;
}

/***********************************************************************************************************************
/// *********************************************** FIN FUNCIONES USUARIOS *********************************************
************************************************************************************************************************
**/



/***********************************************************************************************************************
/// ************************************************** FUNCIONES SLOTS *************************************************
************************************************************************************************************************
*/

/**
  \brief Función que habilita los input del form Slot.
*/
function habilitarSlot(){
  document.getElementById("slot").disabled = false;
  document.getElementById("slotobserva").disabled = false;
  document.getElementById("nombrehsm").disabled = false;
  $("select[name='nombreUsuario']").prop('disabled', false);
  //$("input[name='empresaUsuario']").prop('disabled', false);
  $("select[name='rolUsuario']").prop('disabled', false);
  document.getElementById("editarSlot").value = "BLOQUEAR";
  document.getElementById("actualizarSlot").disabled = false;
}

/**
  \brief Función que inhabilita los input del form Slot.
*/
function inhabilitarSlot(){
  document.getElementById("slot").disabled = true;
  document.getElementById("slotobserva").disabled = true;
  document.getElementById("nombrehsm").disabled = true;
  $("select[name='nombreUsuario']").prop('disabled', true);
  //$("input[name='empresaUsuario']").prop('disabled', true);
  $("select[name='rolUsuario']").prop('disabled', true);
  document.getElementById("editarSlot").value = "EDITAR";
  document.getElementById("actualizarSlot").disabled = true;
}

/**
 * \brief Función que carga en el form pasado como parámetro todos los slots.
 * @param {String} selector String con el DIV donde se deben de cargar los datos.
 * @param {Int} slot Id del slot a resaltar en el listado.
 */ 
function cargarSlots(selector, slot){
  var url = "data/selectQuery.php";
  var query = "select idslots, slots.nombre as nombre, hsm.nombre as hsm from slots inner join hsm on slots.hsm=hsm.idhsm where slots.estado='activo' order by slots.nombre asc, hsm.nombre asc";
  
  $.getJSON(url, {query: ""+query+""}).done(function(request) {
    var slots = request.resultado;
    var total = parseInt(request.rows, 10);
    var encabezado = '<h2 id="titulo" class="encabezado">LISTADO DE SLOTS</h2>';
    var cargar = '';
    cargar += encabezado;
    if (total >= 1) {
      var tabla = '<table id="slots" name="slots" class="tabla2">';
      var tr = '<tr>\n\
                  <th colspan="3" class="tituloTabla">SLOTS</th>\n\
                </tr>';
      tr += '<tr>\n\
                <th>Ítem</th>\n\
                <th>Nombre</th>\n\
                <th>HSM</th>\n\
            </tr>';
      for (var index in slots) {
        var nombre = slots[index]["nombre"];
        var hsm = slots[index]["hsm"];
        var id = slots[index]["idslots"];
        var i = parseInt(index, 10) + 1;
        var clase = '';
        if ((id !== 0) && (id === slot)){
                clase = 'resaltado';
            }
            else {
              clase = '';
            }
        tr += '<tr>\n\
                  <td>'+i+'</td>\n\
                  <td><a href="#" id="'+id+'" name="'+nombre+'" class="detailSlot '+clase+'">'+nombre+'</a></td>\n\
                  <td class="pull-left">'+hsm+'</td>\n\
              </tr>';
      }
      tr += '<tr>\n\
                <td class="pieTabla" colspan="3"><input type="button" value="NUEVO" id="nuevoSlot" class="btn-success"></td>\n\
             </tr>';
      tr += '</table>';
      tabla += tr;
      cargar += tabla;
      $(selector).html(cargar);
    }
    else {
      var texto = '<h2>Ya NO quedan slots activos!.</h2>';
      cargar += texto;
      vaciarContent("#main-content");
      $("#main-content").html(cargar);
    }    
    
  });
}

/**
  \brief Función que recupera y carga los datos del slot pasado como parámetro.
  @param {Int} slot Entero con el índice del slot a recuperar.
  @param {String} nombreSlot String con el nombre del slot a recuperar.                                                                                                                
*/
function cargarDetalleSlot(slot, nombreSlot) {
  var url = "data/selectQuery.php"; 
  var query = "select * from hsm";
  
  var empresa = nombreSlot.split("_")[0];
  
  /// datos de los hsms:
  $.getJSON(url, {query: ""+query+""}).done(function(request) {
    var hsms = request["resultado"];
    
    /// levanto datos de los posibles usuarios del slot. Los que pertenecen al banco o a EMSA
    var query = "select idusuarios, apellido, nombre, empresa from usuarios where empresa='EMSA' or empresa='"+empresa+"' and estado='activo' order by empresa";
    
    $.getJSON(url, {query: ""+query+""}).done(function(request) {
      var posiblesUsuarios = request["resultado"];
      
      /// recupero la información genérica del slot:
      var query = "select observaciones as slotobserva, hsm from slots where idslots="+slot+"";
      
      $.getJSON(url, {query: ""+query+""}).done(function(request) {
        var datosSlot = request.resultado;
        var slotobserva = datosSlot[0]["slotobserva"];
        var idhsm = datosSlot[0]["hsm"];
        
        /// recupero la información de los usuarios del slot. No se puede hacer un inner join con la consulta anterior
        /// pues de hacerlo, si se le llega a dar Quitar al último usuario el inner join daría vacío pues no habría
        /// ningún usuario con estado='activo'. Por esto se separan las consultas.
        var query = "select idslotusers, usuario, usuariokms from slotusers where slot="+slot+" and estado='activo'";
        $.getJSON(url, {query: ""+query+""}).done(function(request) {
          var datosUsuariosSlot = request.resultado;
          var totalUsuarios = request.rows;
          
          if (totalUsuarios > 0) {
            var slotUsers = new Array();
            var rolUsers = new Array();
            var slotUsersIds = new Array();
            for (var ind in datosUsuariosSlot) {
              slotUsers.push(datosUsuariosSlot[ind]["usuario"]);
              rolUsers.push(datosUsuariosSlot[ind]["usuariokms"]);
              slotUsersIds.push(datosUsuariosSlot[ind]["idslotusers"]);
            }
          }
          if ($("#content").length === 0) {
            var divs = "<div id='fila' class='row'>\n\
                          <div id='selector' class='col-md-6 col-sm-12'></div>\n\
                          <div id='content' class='col-md-6 col-sm-12'></div>\n\
                        </div>";
            $("#main-content").empty();
            $("#main-content").append(divs);
          }
          var elegido = '';

          cargarSlots('#selector', slot);
          $("#selector").css('padding-right', '30px');

          var tabla = '<table id="detalleSlot" name="detalleSlot" class="tabla2">';
          var tr = '<tr>\n\
                      <th colspan="6" class="tituloTabla">DATOS DEL SLOT</th>\n\
                    </tr>';
          tr += '<tr>\n\
                    <th>Slot</th>\n\
                    <td><input id="slot" name="slot" class="resaltado" type="text" value="'+nombreSlot+'" disabled="true"></td>\n\
                    <td colspan="4"></td>\n\
                </tr>';
          tr += '<tr>\n\
                    <th>Observaciones</th>\n\
                    <td colspan="5">\n\
                      <textarea id="slotobserva" name="slotobserva" style="width: 100%;resize: none" disabled="true">'+ slotobserva +'</textarea>\n\
                    </td>\n\
                 </tr>';
          tr += '<tr>\n\
                    <th colspan="6">DATOS DEL HSM</th>\n\
                </tr>';
          tr += '<th>Nombre</th>\n\
                    <td>\n\
                      <select id="nombrehsm" name="nombrehsm" style="width:100%" disabled="true">\n\
                        <option value="ninguno">---SELECCIONAR---</option>';
          for (var index in hsms) {
            if (hsms[index]["idhsm"] === idhsm) {
              elegido = 'selected';
              var indice = index;
            }
            else {
              elegido = '';
            }
            tr += '<option value="'+hsms[index]["idhsm"]+'" '+elegido+'>'+hsms[index]["nombre"]+'</option>';
          }
          tr += '     </select>\n\
                    </td>\n\
                    <th>Serie</th>\n\
                    <td colspan="3"><input id="serie" name="serie" type="text" value="'+hsms[indice]["serie"]+'" disabled="true"></td>\n\
                 </tr>';
          tr += '<tr>\n\
                    <th>Marca</th>\n\
                    <td><input id="marca" name="marca" type="text" value="'+hsms[indice]["marca"]+'" disabled="true"></td>\n\
                    <th>Modelo</th>\n\
                    <td colspan="3"><input id="modelo" name="modelo" type="text" value="'+hsms[indice]["modelo"]+'" disabled="true"></td>\n\
                 </tr>';
          tr += '<tr>\n\
                    <th>Observaciones</th>\n\
                    <td colspan="5"><textarea id="observaciones" name="observaciones" style="width: 100%;resize: none" disabled="true">'+ hsms[indice]["observaciones"] +'</textarea></td>\n\
                 </tr>';
          tr += '<tr>\n\
                  <th colspan="6">USUARIOS</th>\n\
                 </tr>';
          tr += '<tr>\n\
                  <th colspan="2">Nombre</th>\n\
                  <th>Empresa</th>\n\
                  <th colspan="3">Usuario KMS</th>\n\
                 </tr>';
          if (totalUsuarios > 0) {
            var roles = ['so01/us01', 'so02/us02', 'so03/us03', 'so04/us04', 'so01', 'so02', 'so03', 'so04', 'us01', 'us02', 'us03', 'us04'];

            for (var index in slotUsers)
              {
              tr += '<tr>\n\
                       <td colspan="2">\n\
                         <select id="nombreUsuario" name="nombreUsuario" style="width:100%" disabled="true" class="nombreUsuario">';
              var empresa = '';
              for (var i in posiblesUsuarios) {
                if (posiblesUsuarios[i]["idusuarios"] === slotUsers[index]) {
                  elegido = 'selected';
                  empresa = posiblesUsuarios[i]["empresa"];
                }
                else {
                  elegido = '';
                }
                tr += '<option id="'+posiblesUsuarios[i]["idusuarios"]+'" value="'+posiblesUsuarios[i]["nombre"]+' '+posiblesUsuarios[i]["apellido"]+'" '+elegido+'>'+posiblesUsuarios[i]["nombre"]+' '+posiblesUsuarios[i]["apellido"]+'</option>';
              }
              tr += ' </select>\n\
                  </td>\n\
                  <td>\n\
                    <input type="text" name="empresaUsuario" value="'+empresa+'" disabled="true">\n\
                  </td>';
              tr += '<td colspan="2"><select id="rolUsuario" name="rolUsuario" style="width:100%" disabled="true" class="rolUsuario">';
              for (var j in roles) {
                if (roles[j] === rolUsers[index]) {
                  elegido = 'selected';
                }
                else {
                  elegido = '';
                }          
                tr += '<option id="'+roles[j]+'" value="'+roles[j]+'" '+elegido+'>'+roles[j]+'</option>';
              }
              tr += '</select>\n\
                    </td>\n\
                    <td><input type="button" name="quitarUser" class="quitarUser" value="Quitar"></td>\n\
                    <td style="display:none"><input type="text" id="slotUserId" name="slotUserId" class="slotUserId" value="'+slotUsersIds[index]+'"></td></tr>';
            }
          }
          tr += '<tr><td colspan="6"><input type="button" name="nuevoUsuarioSlot" id="nuevoUsuarioSlot" value="Agregar"></td></tr>';
          tr += '<tr>\n\
                    <td class="pieTablaIzquierdo"><input type="button" id="editarSlot" name="editarSlot" value="EDITAR" onclick="cambiarEdicion()" class="btn-info"></td>\n\
                    <td colspan="2"><input type="button" id="actualizarSlot" name="actualizarSlot" disabled="true" value="ACTUALIZAR" class="btn-warning"></td>\n\
                    <td class="pieTablaDerecho"><input type="button" id="eliminarSlot" name="eliminarSlot" value="ELIMINAR" class="btn-danger"></td>\n\
                    <td style="display:none"><input type="text" id="fuente" name="fuente" value="slot"></td>\n\
                    <td style="display:none"><input type="text" id="idslot" name="idslot" value="'+slot+'"></td>\n\
                </tr>'; 
          tr += '</table>';
          tabla += tr;
          var encabezado = '<h3 id="titulo" class="encabezado">DETALLES DEL SLOT</h3>';
          var cargar = '';
          cargar += encabezado;
          cargar += tabla;
          $("#content").html(cargar);
        });    
      });
    });
  });  
}

/**
 * \brief Función que valida los datos pasados para el slot.
 * @returns {Boolean} Devuelve un booleano que indica si se pasó o no la validación de los datos para el slot.
 */
function validarSlot()
  {
  var seguir = false;
  
  if (document.getElementById("slot").value.length === 0)
    {
    alert('Debe ingresar el nombre para el slot.');
    document.getElementById("slot").focus();
    seguir = false;
  }
  else
    {
    if (document.getElementById("nombrehsm").value === "ninguno")
      {
      alert('Debe sleleccionar el hsm en el cual se encuentra el slot.');
      document.getElementById("nombrehsm").focus();
      seguir = false;
    } 
    else
      {
      seguir = true;
    }// nombrehsm
  }// nombre
  
  if (seguir) return true;
  else return false;
}

/***********************************************************************************************************************
/// ************************************************ FIN FUNCIONES SLOTS ***********************************************
************************************************************************************************************************
**/


/**
  \brief Función que se ejecuta al cargar la página.
En la misma se ve primero desde que página se llamó, y en base a eso
se llama a la función correspondiente para cargar lo que corresponda (actividades, referencias, etc.)
Además, en la función también están los handlers para los distintos eventos jquery.
*/
function todo () {
  ///Levanto la url actual: 
  var urlActual = jQuery(location).attr('pathname');
  ///Según en que url esté, es lo que se carga:
  switch (urlActual) {
    case "/testKMS/": 
      {
      cargarActividades('#main-content', false, false, false);
      break;
    }
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
        mostrarReferencia(parametros);
      }
      else {
        alert('en ref, pero sin parámetros. Generar form en blanco para nueva ref.');
      }
      break;
    }
    case "/testKMS/llave.php":
      {
      ///Verifico si la url viene con parámetros o no.
      ///Si los tiene es porque viene del click de una referencia la cual hay que mostrar.
      ///Si no los tiene es porque ya estoy en llave.php y debo cargar en content solo los datos de la llave seleccionada.
      var parametros = jQuery(location).attr('search');
      if (parametros) {
        var temp = parametros.split('?');
        var temp1 = temp[1].split('&');
        var temp2 = temp1[0].split('=');
        var idkey = parseInt(temp2[1], 10);var idkey = temp2[1];
        var temp3 = temp1[1].split('=');
        var ref = temp3[1];
        mostrarLlave(idkey, "#content");
        cargarObjetos(ref, "#selector", false, 'llave', idkey);
      }
      else {
        ///ver de eliminar pues nunca llega a ejecturse. Esta parte va en click de detailObject
        var idkey = $(this).attr("id");alert(idkey+' desde ppal sin parametros');
        mostrarLlave(idkey, "#content");
      }
      break;
    }
    case "/testKMS/certificado.php":
      {
      ///Verifico si la url viene con parámetros o no.
      ///Si los tiene es porque viene del click de un certificado la cual hay que mostrar.
      ///Si no los tiene es porque ya estoy en certificado.php y debo cargar en content solo los datos del certificado seleccionado.
      var parametros = jQuery(location).attr('search');
      if (parametros) {
        var temp = parametros.split('?');
        var temp1 = temp[1].split('&');
        var temp2 = temp1[0].split('=');
        var idcert = parseInt(temp2[1], 10);var idcert = temp2[1];
        var temp3 = temp1[1].split('=');
        var ref = temp3[1];
        mostrarCertificado(idcert, "#content");
        cargarObjetos(ref, "#selector", false, 'certificado', idcert);
      }
      else {
        ///ver de eliminar pues nunca llega a ejecturse. Esta parte va en click de detailObject
        var idcert = $(this).attr("id");alert(idcert+' desde ppal sin parametros');
        mostrarCertificado(idcert, "#content");
      }
      break;
    }
    case "/testKMS/usuario.php": 
      {
      cargarUsuarios("#main-content", 0);
      break;
    }
    case "/testKMS/slot.php": 
      {
      cargarSlots("#main-content", 0);
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
      var activity = $(this).attr("id");
      cargarDetalleActividad(activity);
    });//*** fin del click detailActivity ***
  
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
    });//*** fin del click eliminarActividad ***
  
  ///Disparar funcion al hacer clic en el botón actualizar.
  ///Se validan todos los campos antes de hacer la actualización, y una vez hecha se inhabilita el form y parte de los botones.
  $(document).on("click", "#actualizarActividad", function () {
    var seguir = true;  
    seguir = validarActividad();
    
    ///En caso de que se valide todo, se prosigue a enviar la consulta con la actualización en base a los parámetros pasados
    if (seguir) {
      ///Recupero valores editados y armo la consulta para el update:  
      var usuario1 = (document.getElementById("usuario1").value).trim();
      var usuario2 = (document.getElementById("usuario2").value).trim();
      var rol1 = (document.getElementById("rol1").value).trim();
      var rol2 = (document.getElementById("rol2").value).trim();
      var inicio = (document.getElementById("horaInicio").value).trim();
      var fin = (document.getElementById("horaFin").value).trim();
      var motivo = (document.getElementById("motivo").value).trim();
      var fecha = (document.getElementById("fecha").value).trim();
      var actividad = (document.getElementById("activity").value).trim();
      
      var query = "select idactividades, motivo, fecha from actividades where motivo='"+motivo+"' and fecha='"+fecha+"'";
      var url = "data/selectQuery.php";
      //alert(query);
      $.getJSON(url, {query: ""+query+""}).done(function(request) {
        var total = request["rows"];
        var id;
        if (total > 0) {
          var id = request["resultado"][0]["idactividades"];
        }
        if (((total <= 1) && (actividad === id)) || ((actividad !== id) && (total < 1))){
          var url = "data/updateQuery.php";
          var query = "update actividades set fecha='" + fecha + "', horaInicio='" + inicio + "', horaFin='" + fin + "', motivo='" + motivo + "', usuario1='" + usuario1 + "', usuario2='" + usuario2 + "', rolUsuario1='" + rol1 + "', rolUsuario2='" + rol2 + "'  where idactividades='" + actividad + "'";

          ///Ejecuto la consulta y muestro mensaje según resultado:
          $.getJSON(url, {query: ""+query+""}).done(function(request) {
            var resultado = request["resultado"];
            if (resultado === "OK") {
              alert('Registro modificado correctamente!');
              $("#actualizarActividad").attr("disabled", "disabled");
              document.getElementById("editarActividad").value = "EDITAR";
              cargarActividades("#selector", true, false, true);
              inhabilitarActividad();
            }
            else {
              alert('Hubo un error. Por favor verifique.');
            }
          });
        }
        else {
          alert('Ya existe una actividad con esos datos. Por favor verifique.');
        }
      });
    }
  });//*** fin del click actualizarActividad ***
    
  ///Disparar funcion al hacer clic en el botón Agregar.
  ///Se validan todos los campos antes de hacer el insert en la base de datos.
  $(document).on("click", "#newActivity", function () {
    
    var seguir = validarActividad();
    
    ///En caso de que se valide todo, se prosigue a enviar la consulta con el ingreso del nuevo registro en base a los parámetros pasados
    if (seguir) {
      ///Recupero valores editados y armo la consulta para el update: 
      var usuario1 = (document.getElementById("usuario1").value).trim();
      var usuario2 = (document.getElementById("usuario2").value).trim();
      var rolUsuario1 = (document.getElementById("rol1").value).trim();
      var rolUsuario2 = (document.getElementById("rol2").value).trim();
      var horaInicio = (document.getElementById("horaInicio").value).trim();
      var horaFin = (document.getElementById("horaFin").value).trim();
      var motivo = (document.getElementById("motivo").value).trim();
      var fecha = (document.getElementById("fecha").value).trim();
      
      var query = "select motivo, fecha from actividades where motivo='"+motivo+"' and fecha='"+fecha+"'";
      var url = "data/selectQuery.php";
      //alert(query);
      $.getJSON(url, {query: ""+query+""}).done(function(request) {
        var total = request["rows"];
        if (total === 0) {
          var url = "data/updateQuery.php"; 
          var query = "insert into actividades (fecha, horaInicio, horaFin, motivo, usuario1, usuario2, rolUsuario1, rolUsuario2, estado) values ('" + fecha + "', '" + horaInicio + "', '" + horaFin + "', '" + motivo + "', " + usuario1 + ", " + usuario2 + ", '" + rolUsuario1 + "', '" + rolUsuario2 + "', 'activa')";
      
          ///Ejecuto la consulta y muestro mensaje según resultado:
          $.getJSON(url, {query: ""+query+""}).done(function(request) {
            var resultado = request["resultado"];
            if (resultado === "OK") {
              alert('Registro agregado correctamente!');
              cargarActividades('#selector', true, false, true);
              inhabilitarActividad();
              //alert(document.getElementById())
              $("#newActivity").remove();
            }
            else {
              alert('Hubo un error. Por favor verifique.');
            }
          });
        }
        else {
          alert('Ya existe una actividad con esos datos. Por favor verifique.');
        }
      });
    }
  });//*** fin del click newActivity ***
    
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
      var tabla = '';
      tabla = '<table id="datos" class="tabla2 table table-bordered table-striped table-hover table-responsive">';
      tabla += '<tr><th colspan="6" class="tituloTabla">GENERAL</th></tr>';
      tabla += '<tr><th>Motivo</th><td colspan="5" style="vertical-align: middle;"><input id="motivo" name="motivo" style="width:100%; resize: none; text-align: center; font-size: 18pt; font-weight: bolder;"></td></tr>';
      var tr = '';
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
      tr += '<tr><td colspan="6" class="pieTabla"><input type="button" name="newActivity" id="newActivity" value="AGREGAR" class="btn-success"></td></tr>';
      tabla += tr;
      tabla += '</table>';
      formu = '<form name="activity" method="post" action="index.php">';
      formu += tabla;
      formu += '</form>';
      $('#content').html(formu);  
      $("#agregarActividad").attr("disabled", "disabled");   
    });
  });//*** fin del click agregarActividad ***
  
  ///Disparar función al hacer click en el link Volver.
  ///Esto hace que se vuelvan a cargar los datos de la actividad a la cual pertenece
  $(document).on("click", "#volverActividad", function (){
    var activity = $(this).attr("name");
    var divs = "<div id='fila' class='row'>\n\
                <div id='selector' class='col-md-5 col-sm-12'></div>\n\
                <div id='content' class='col-md-7 col-sm-12'></div>\n\
              </div>";
    $("#main-content").empty();
    $("#main-content").append(divs);
    cargarDetalleActividad(activity);
    cargarActividades('#selector', true, false, true);
    inhabilitarActividad();
  });//*** fin del click volverActividad ***
  
/**************************************************************************************************************************
/// ************************************************** FIN ACTIVIDADES ****************************************************
***************************************************************************************************************************
*/
 
 
 
/***************************************************************************************************************************
/// Comienzan las funciones que manejan los eventos relacionados a las REFERENCIAS como ser creación, edición y eliminación.
****************************************************************************************************************************
*/

///Disparar funcion al hacer clic en el botón actualizar.
///Se validan todos los campos antes de hacer la actualización, y una vez hecha se inhabilita el form y parte de los botones.
$(document).on("click", "#actualizarReferencia", function (){
    var seguir = true;  
    seguir = validarReferencia();
    
    var elementos = $(".nombreUsuario");
    var tam = elementos.size();
    var arrayID = [];
    for (var i=0; i<tam; i++) {
      var selectActual = $(elementos[i]);
      var id = $(selectActual).val();
      arrayID.push(id);
    }
    
    var arrayRoles = [];
    var elem = $(".rolUsuario");
    for (var i=0; i<tam; i++) {
      //var selectActual = $(elem[i]);
      var rol = $(elem[i]).val();
      arrayRoles.push(rol);
    }
    
    var i = 1;
    var j = 0;
    var repetidos = false;
    var continuar = true;
    var subArray = arrayID.slice(0);
    
    while ((i<arrayID.length) && (continuar===true)) {
      subArray.splice(0, 1);
      var ind = subArray.indexOf(arrayID[j]);
      if (ind === -1) { 
        i++;
        j++;
      }
      else {
        repetidos = true;
        continuar = false;
      }
    }
    
    if (repetidos) {
      alert('Hay involucrados que están repetidos. Por favor verifique.');
      seguir = false;
    }

    ///En caso de que se valide todo, se prosigue a enviar la consulta con la actualización en base a los parámetros pasados
    if (seguir) {
      ///Recupero valores editados y armo la consulta para el update:
      var url = "data/selectQuery.php";
      var hsm = (document.getElementById("hsm").value).trim();
      var slot = (document.getElementById("slot").value).trim();
      var query = 'select slots.idslots from slots inner join hsm on slots.hsm=hsm.idhsm where slots.nombre="'+slot+'" and hsm.nombre="'+hsm+'"';
      
      ///Ejecuto la consulta y muestro mensaje según resultado:
      $.getJSON(url, {query: ""+query+""}).done(function(request) {
        var resultado = request.resultado;
        var idslot = resultado[0]['idslots'];
        var lugar = (document.getElementById("lugar").value).trim();
        var idref = document.getElementById("idref").value;
        var aplicacion = (document.getElementById("aplicacion").value).trim();
        var plataforma = (document.getElementById("plataforma").value).trim();
        var resumen = (document.getElementById("resumen").value).trim();
        var detalles = (document.getElementById("detalles").value).trim();
        
        query = "select idinvolucrados from involucrados where referencia='"+idref+"'";
        
        $.getJSON(url, {query: ""+query+""}).done(function(request) {
          var invo = request["resultado"];
          
          var query = "update referencias set lugar='" + lugar + "', aplicacion='" + aplicacion + "', plataforma='" + plataforma + "', resumen='" + resumen + "', detalles='" + detalles + "', slot='" + idslot + "'  where idreferencias='" + idref + "'";
          var url = "data/updateQuery.php";

          ///Ejecuto la consulta y muestro mensaje según resultado:
          $.getJSON(url, {query: ""+query+""}).done(function(request) {
            var resultado = request["resultado"];
            if (resultado === "OK") {
              query = "update involucrados set usuario = case idinvolucrados ";
              for (var i in invo){
                query += "when "+invo[i]["idinvolucrados"]+" then "+arrayID[i]+" ";
              }
              query += "end, rol = case idinvolucrados ";
              for (var i in invo){
                query += "when "+invo[i]["idinvolucrados"]+" then '"+arrayRoles[i]+"' ";
              }
              query += " end where idinvolucrados in (";
              var tope = parseInt(invo.length, 10) - 1;
              for (var j in invo){
                if (j == tope) {
                  query += invo[j]["idinvolucrados"]+")";
                }
                else {
                  query += invo[j]["idinvolucrados"]+", ";
                } 
              }
              alert(query);  
              $.getJSON(url, {query: ""+query+""}).done(function(request){
                var resultado = request["resultado"];
                if (resultado === "OK") {
                  alert('Registro modificado correctamente!');
                  $("#actualizarReferencia").attr("disabled", "disabled");
                  document.getElementById("editarReferencia").value = "EDITAR";
                  inhabilitarReferencia();
                }
                else {
                  alert('Hubo un error. Por favor verifique.');
                }
              });
            }
            else {
              alert('Hubo un error. Por favor verifique.');
            }
          });
        }); 
      });
    }  
  });//*** fin del click actualizarReferencia ***

///Disparar funcion al hacer clic en el botón eliminar.
///Esto hace que el registro correspondiente a la referencia pase a estado de inactiva.
///Además, se "limpia" el form del div #selector quitando la referencia eliminada.
$(document).on("click", "#eliminarReferencia", function () {
    var pregunta = confirm('Está a punto de eliminar el registro. ¿Desea continuar?');
    if (pregunta) {
      var url = "data/updateQuery.php";
      var referencia;
      var activity = document.getElementById("actividad").value;
      ///Chequeo si quiero eliminar el elemento que recién se agregó u otro anterior.
      ///Esto varía pues el campo activity no está en el DOM si recién se agregó por lo cual 
      ///debo sacar el último elemento agregado de #selector bajo el nombre: ultimaReferencia
      if (document.getElementById("idref")) {
        referencia = document.getElementById("idref").value;
      }
      else {
        referencia = document.getElementById("ultimaReferencia").value;
      }

      var query = "update referencias set estado='inactiva' where idreferencias='" + referencia + "'";

      $.getJSON(url, {query: ""+query+""}).done(function(request) {
        var resultado = request["resultado"];
        if (resultado === "OK") {
          vaciarContent("#main-content");
          cargarActividades('#selector', false, false, false);
          cargarDetalleActividad(activity);
        }
        else {
          alert('Hubo un error. Por favor verifique.');
        }
      });
    }
    else {
      //alert('no quiso borrar');
    }
  });//*** fin del click eliminarReferencia ***
  
///Función que se dispara al hacer click en el botón Nueva Referencia.
///Consulta los hsms y los slots disponibles y genera un nuevo form en blanco
///para agregar la nueva referencia.
$(document).on("click", "#nuevaRef", function() {
  var actividad = document.getElementById("activity").value;
  var url = "data/selectQuery.php";
  var query = "select distinct slots.nombre from slots";
  
  $.getJSON(url, {query: ""+query+""}).done(function(request) {
    var slots = request.resultado;
    var query = "select idhsm, nombre from hsm";
    $.getJSON(url, {query: ""+query+""}).done(function(request) {
      var hsms = request.resultado;
      tabla = '<table id="newRef" class="table table-bordered table-striped table-hover table-responsive tabla2">';
      tabla += '<tr><th colspan="6" class="tituloTabla">GENERAL</th></tr>';
      tr = '';
      tr += '<tr><th>CODIGO</th><td colspan="5"><input type="text" name="codigo" id="codigo"></td></tr>';
      tr += '<tr>\n\
               <th>Lugar</th><td><input type="text" id="lugar" name="lugar"></td>';
      tr += '<th>HSM</th>\n\
              <td>\n\
                <select id="hsm" name="hsm" style="width:100%;">\n\
                  <option value="ninguno" selected="yes">--- SELECCIONAR ---</option>';
      
      for (var index in hsms) {
        tr += '<option value="'+hsms[index]["nombre"]+'">'+hsms[index]["nombre"]+'</option>';
      };
      tr += '</select></td>';
      tr += '<th>SLOT</th>\n\
              <td>\n\
                <select id="slot" name="slot" style="width:100%;">\n\
                  <option value="ninguno" selected="yes">--- SELECCIONAR ---</option>';
      
      for (var index1 in slots) {
        tr += '<option value="'+slots[index1]["nombre"]+'">' + slots[index1]["nombre"] + '</option>';
      };
      tr += '</select></td></tr>';
      tr += '<tr>\n\
               <th>Plataforma</th><td colspan="3">';
      tr += '<select id="plataforma" name="plataforma" style="width:100%">\n\
              <option value="ninguno" selected="yes">--- SELECCIONAR ---</option>\n\
              <option value="Advantis 4.1">Advantis 4.1</option>\n\
              <option value="Convego 6.2">Convego 6.2</option>\n\
              <option value="Cosmo 5">Cosmo 5</option>\n\
            </select>\n\
            </td>';
      tr += '<th>Aplicación</th><td><input type="text" id="aplicacion" name="aplicacion"></td>\n\
            </tr>';
      tr += '<tr><th colspan="6">RESUMEN</th></tr>';
      tr += '<tr><td colspan="6"><input type="text" id="resumen" name="resumen"></td></tr>';
      tr += '<tr><th colspan="6">DETALLES</th></tr>';
      tr += '<tr><td colspan="6"><input type="text" id="detalles" name="detalles"></td></tr>';
      tr += '<tr>\n\
               <td colspan="6" class="pieTabla"><input type="button" id="addRef" name="addRef" value="AGREGAR" class="btn-success"></td>\n\
             </tr>';
      tr += '<tr>\n\
              <td style="display:none"><input type="text" id="actividad" name="actividad" value="'+actividad+'"></td>\n\
          </tr>';
      tabla += tr;
      tabla += '</table>';    
      formu = '<form name="newReference" method="post" action="index.php">';
      formu += tabla;
      volver = '<br><a href="#" name="'+actividad+'" id="volverActividad">Volver</a>';
      formu += '</form>';
      formu += volver;
      encabezado = '<h1 class="encabezado">NUEVA REFERENCIA</h1>';
      $("#main-content").empty();
      $('#main-content').html(encabezado);
      $("#main-content").append(formu);
    });
  });
});//*** fin del click nuevaRef ***

///Disparar funcion al hacer clic en el botón Agregar (del formulario nueva referencia).
///Se validan todos los campos antes de hacer el insert en la base de datos.
$(document).on("click", "#addRef", function () {
    var seguir = validarReferencia();
    
    ///En caso de que se valide todo, se prosigue a enviar la consulta con el ingreso del nuevo registro en base a los parámetros pasados
    if (seguir) {
      ///Recupero valores editados y armo la consulta para el update:
      var url = "data/selectQuery.php"; 
      
      var hsm = (document.getElementById("hsm").value).trim();
      var slot = (document.getElementById("slot").value).trim();
      //alert('codigo: '+codigo+'\nlugar: '+lugar+'\nhsm: '+hsm+'\nslot: '+slot+'\nplataforma: '+ plataforma+'\napp: '+aplicacion+'\nresumen: '+resumen+'\ndetalles: '+detalles);
      var query = 'select slots.idslots from slots inner join hsm on slots.hsm=hsm.idhsm where hsm.nombre="'+hsm+'" and slots.nombre="'+slot+'"';
      
      $.getJSON(url, {query: ""+query+""}).done(function(request) {
        var idslot;
        if (request.rows === 0) {
          alert('La configuración elegida no es posible. Por favor verifique.');
          return;
        }
        else {
          idslot = request.resultado[0]["idslots"];
        }
        
        var url = "data/updateQuery.php";
        
        var codigo = (document.getElementById("codigo").value).trim();
        var actividad = (document.getElementById("actividad").value).trim();
        var lugar = (document.getElementById("lugar").value).trim();
        if (lugar === "undefined") lugar='';
        var aplicacion = (document.getElementById("aplicacion").value).trim();
        if (aplicacion === "undefined") aplicacion='';
        var plataforma = (document.getElementById("plataforma").value).trim();
        var resumen = (document.getElementById("resumen").value).trim();
        var detalles = (document.getElementById("detalles").value).trim();
        
        var query = "select codigo from referencias where codigo='"+codigo+"'";
        var url = "data/selectQuery.php";
        //alert(query);
        $.getJSON(url, {query: ""+query+""}).done(function(request) {
          var total = request["rows"];
          if (total === 0) {
            var query = "insert into referencias (codigo, actividad, slot, lugar, plataforma, aplicacion, resumen, detalles, estado) values ('" + codigo + "', " + actividad + ", " + idslot + ", '" + lugar + "', '" + plataforma + "', '" + aplicacion + "', '" + resumen + "', '" + detalles + "', 'activa')";
               
            ///Ejecuto la consulta y muestro mensaje según resultado:
            $.getJSON(url, {query: ""+query+""}).done(function(request) {
              var resultado = request["resultado"];
              if (resultado === "OK") {
                alert('Registro agregado correctamente!');
                cargarActividades('#selector', true, false, true);
                cargarDetalleActividad(actividad);
              }
              else {
                alert('Hubo un error. Por favor verifique.');
              }
            });
          }
          else {
            alert('Ya existe una referencia con esos datos. Por favor verifique.');
          }
        });
      });
    }
  });//*** fin del click addRef ***
  
///Disparar funcion al cambiar alguno de los nombres del select de involucrados.
///Se busca la empresa a la que corresponde el nuevo usuario y se actualiza el valor del input empresaUsuario.
$(document).on("change", "#nombreUsuario", function (){
  var iduser = this.value;
  var url = "data/selectQuery.php";
  var query = 'select empresa from usuarios where idusuarios = "'+iduser+'"';
  var selector = $(this).parent().next().children("input");
  $.getJSON(url, {query: ""+query+""}).done(function(request){
    var empresa = request["resultado"][0]["empresa"];
    $(selector).val(empresa);
  });
});//*** fin del change nombreUsuario ***
   
/**************************************************************************************************************************
/// ************************************************** FIN REFERENCIAS ****************************************************
***************************************************************************************************************************
*/



/***************************************************************************************************************************
/// Comienzan las funciones que manejan los eventos relacionados a las LLAVES como ser creación, edición y eliminación.
****************************************************************************************************************************
*/

///Disparar funcion al hacer click en el botón eliminar.
///Esto hace que el registro correspondiente a la llave pase a estado de inactiva.
///Además, se "limpia" el form del div #selector quitando la llave eliminada.
$(document).on("click", "#eliminarLlave", function () {
  var pregunta = confirm('Está a punto de eliminar el registro. ¿Desea continuar?');
  if (pregunta) {
    var url = "data/selectQuery.php";
    var llave = document.getElementById("idkey").value;
    var idref = document.getElementById("idref").value;
    var query = "select idkeys from llaves inner join tareas on tareas.idtareas=llaves.tarea inner join referencias on referencias.idreferencias=tareas.referencia where llaves.estado='activa' and referencias.idreferencias='"+idref+"' order by llaves.owner";
    
    $.getJSON(url, {query: ""+query+""}).done(function(request) {
      var ids = new Array();
      var idks = request["resultado"];
      var total = request["rows"];
      var ids = new Array();
      for (var index in idks) {
        ids.push(idks[index]["idkeys"]);
      }
      
      var indiceActual = ids.indexOf(llave);
      var llave1 = 0;
      
      if (total === 1)  {
        var volver = '<br><a href="referencia.php?idreferencia='+idref+' name="'+idref+'" id="volverReferencia">Volver</a>';
        var texto = '<h2>Ya NO quedan llaves!.</h2>';
        texto += volver;
        $("#content").html(texto);
      }
      else {
        if ((indiceActual !== 0)&&(indiceActual !== -1)) {
          llave1 = indiceActual - 1;
        }
        else {
          if (indiceActual === 0) {
            llave1 = indiceActual + 1;
          }
        }
      }
      var url = "data/updateQuery.php";
      var query = "update llaves set estado='inactiva' where idkeys='" + llave + "'";
      
      $.getJSON(url, {query: ""+query+""}).done(function(request) {
        var resultado = request["resultado"];
        if (resultado === "OK") {
          if (total >= 1) {
            mostrarLlave(ids[llave1], "#content");
          }
          cargarObjetos(idref, "#selector", false, 'llave', ids[llave1]);
        }
        else {
          alert('Hubo un error. Por favor verifique.');
        }
      });
    });
  }
  else {
    //alert('no quiso borrar');
  }
});//*** fin del click eliminarLlave ***
  
///Disparar funcion al hacer click en el link del objeto.
///Se cargan en el DIV #content los datos del mismo.
///y además, se cargan en el DIV selector el listado de objetos de esa referencia
$(document).on("click", ".detailObject", function () {
  var objeto = $(this).attr("name");
  if (objeto === 'llave') {
    var idkey = $(this).attr("id");
    var idref = document.getElementById("idref").value;
    cargarObjetos(idref, "#selector", false, 'llave', idkey);
    mostrarLlave(idkey, "#content");
  }
  else {
    var idcert = $(this).attr("id");
    var idref = document.getElementById("idref").value;
    cargarObjetos(idref, "#selector", false, 'certificado', idcert);
    vaciarContent("#content");
    mostrarCertificado(idcert, "#content");
  }
});//*** fin del click detailObject ***

///Disparar funcion al hacer clic en el botón actualizar.
///Se validan todos los campos antes de hacer la actualización, y una vez hecha se inhabilita el form y parte de los botones.
$(document).on("click", "#actualizarLlave", function (){
    var seguir = true;
    seguir = validarLlave();
    
    ///En caso de que se valide todo, se prosigue a enviar la consulta con la actualización en base a los parámetros pasados
    if (seguir) {
      ///Recupero valores editados y armo la consulta para el update:
      var llave = document.getElementById("idkey").value;
      var idref = document.getElementById("idref").value;
      var nombre = (document.getElementById("nombre").value).trim();
      var owner = (document.getElementById("owner").value).trim();
      var kcv = (document.getElementById("kcv").value).trim();
      var tipo = (document.getElementById("tipo").value).trim();
      var bits = parseInt(document.getElementById("bits").value, 10);
      var version = (document.getElementById("version").value).trim();
      var accion = (document.getElementById("accion").value).trim();
      var generacion = (document.getElementById("generacion").value).trim();
      var exponente;
      if (document.getElementById("exponente").value === '') exponente = 0; else exponente = parseInt(document.getElementById("exponente").value, 10);
      var obs = (document.getElementById("observaciones").value).trim();
      //alert('nombre: '+nombre+'\nowner: '+owner+'\nkcv: '+kcv+'\ntipo: '+tipo+'\nbits: '+bits+'\nexponente: '+exponente+'\ngeneracion: '+generacion+'\naccion: '+accion+'\nversion: '+version+'\nobs: '+obs);
      
      var uso_encrypt, uso_decrypt, uso_sign, uso_verify, uso_wrap, uso_unwrap, uso_import, uso_export, uso_derive;
      var att_sensitive, att_trusted, att_modifiable, att_wrapwtrusted, att_private, att_derivemask, att_unwrapmask, att_exportable, att_extractable, att_deletable;
      if (document.getElementById("uso_encrypt").checked) uso_encrypt = 1; else uso_encrypt = 0;
      if (document.getElementById("uso_decrypt").checked) uso_decrypt = 1; else uso_decrypt = 0;
      if (document.getElementById("uso_sign").checked) uso_sign = 1; else uso_sign = 0;
      if (document.getElementById("uso_verify").checked) uso_verify = 1; else uso_verify = 0;
      if (document.getElementById("uso_wrap").checked) uso_wrap = 1; else uso_wrap = 0;
      if (document.getElementById("uso_unwrap").checked) uso_unwrap = 1; else uso_unwrap = 0;
      if (document.getElementById("uso_import").checked) uso_import = 1; else uso_import = 0;
      if (document.getElementById("uso_export").checked) uso_export = 1; else uso_export = 0;
      if (document.getElementById("uso_derive").checked) uso_derive = 1; else uso_derive = 0;
      if (document.getElementById("att_sensitive").checked) att_sensitive = 1; else att_sensitive = 0;
      if (document.getElementById("att_trusted").checked) att_trusted = 1; else att_trusted = 0;
      if (document.getElementById("att_modifiable").checked) att_modifiable = 1; else att_modifiable = 0;
      if (document.getElementById("att_wrapwtrusted").checked) att_wrapwtrusted = 1; else att_wrapwtrusted = 0;
      if (document.getElementById("att_private").checked) att_private = 1; else att_private = 0;
      if (document.getElementById("att_derivemask").checked) att_derivemask = 1; else att_derivemask = 0;
      if (document.getElementById("att_unwrapmask").checked) att_unwrapmask = 1; else att_unwrapmask = 0;
      if (document.getElementById("att_exportable").checked) att_exportable = 1; else att_exportable = 0;
      if (document.getElementById("att_extractable").checked) att_extractable = 1; else att_extractable = 0;
      if (document.getElementById("att_deletable").checked) att_deletable = 1; else att_deletable = 0;
      //alert('encrypt: '+uso_encrypt+'\ndecrypt: '+uso_decrypt+'\nsign: '+uso_sign+'\nverify: '+uso_verify+'\nwrap: '+uso_wrap+'\nunwrap: '+uso_unwrap+'\nexport: '+uso_export+'\nimport: '+uso_import+'\nderive: '+uso_derive);
      //alert('sensitive: '+att_sensitive+'\ntrusted: '+att_trusted+'\nmodifiable: '+att_modifiable+'\nwrap w trusted: '+att_wrapwtrusted+'\nprivate: '+att_private+'\nunwrap mask: '+att_unwrapmask+'\nextractable: '+att_extractable+'\nderive mask: '+att_derivemask+'\nexportable: '+att_exportable+'\ndeletable: '+att_deletable);
      
      var query = "select idkeys, nombre from llaves inner join tareas on tareas.idtareas=llaves.tarea where nombre='"+nombre+"' and owner='"+owner+"' and version='"+version+"' and referencia='"+idref+"'";
      var url = "data/selectQuery.php";
      //alert(query);
      $.getJSON(url, {query: ""+query+""}).done(function(request) {
        var total = request["rows"];
        var id;
        if (total > 0) {
          id = request["resultado"][0]["idkeys"];
        }
        if (((total <= 1) && (llave === id)) || ((llave !== id) && (total < 1))){
          var query = "update llaves inner join tareas on llaves.tarea=tareas.idtareas set nombre='" + nombre + "', owner='" + owner + "', version='" + version + "', tipo='" + tipo + "', modoGeneracion='" + generacion + "', kcv='" + kcv + "', bits=" + bits + ", exponente=" + exponente + ", accion='"+accion+"', tareas.observaciones='"+obs+"', \n\
                   uso_encrypt="+uso_encrypt+", uso_decrypt="+uso_decrypt+", uso_sign="+uso_sign+", uso_verify="+uso_verify+", uso_wrap="+uso_wrap+", uso_unwrap="+uso_unwrap+", uso_import="+uso_import+", uso_export="+uso_export+", uso_derive="+uso_derive+", \n\
                   att_sensitive="+att_sensitive+", att_trusted="+att_trusted+", att_modifiable="+att_modifiable+", att_wrapwtrusted="+att_wrapwtrusted+", att_private="+att_private+", att_unwrapmask="+att_unwrapmask+", att_extractable="+att_extractable+", att_derivemask="+att_derivemask+", att_exportable="+att_exportable+", att_deletable="+att_deletable+" where idkeys='" + llave + "'";
          var url = "data/updateQuery.php";

          ///Ejecuto la consulta y muestro mensaje según resultado:
          $.getJSON(url, {query: ""+query+""}).done(function(request) {
            var resultado = request["resultado"];
            if (resultado === "OK") {
              alert('Registro modificado correctamente!');  
              $("#actualizarLlave").attr("disabled", "disabled");
              document.getElementById("editarLlave").value = "EDITAR";
              inhabilitarLlave();
              cargarObjetos(idref, "#selector", false, 'llave', llave);
            }
            else {
              alert('Hubo un error. Por favor verifique.');
            }
          });
        }
        else {
          alert('Ya existe una llave con esos datos. Por favor verifique.');
        }
      });
    }
  });//*** fin del click actualizarLlave ***
  
///Disparar función al hacer click en el botón Nueva Llave.
///Se vuelve al DIV #main-content y se genera un form en blanco para agregar los datos de la llave.
$(document).on("click", "#nuevaLlave", function() {
  var idref = document.getElementById("nuevaLlave").name;
  var codigo = document.getElementById("codigo").value;
  var resumen = document.getElementById("resumen").value;
  var slot = document.getElementById("slot").value;
  var nom = slot.split('_');
  var cliente = nom[0];
  var encabezado = '<h1 class="encabezado">NUEVA LLAVE</h1>';
  encabezado += '<h3>'+codigo+' <b>('+cliente+')<b></h3>';
  var tabla = '<table id="newKey" name="newKey" class="tabla2">';
  var tr = '<tr><th colspan="10" class="tituloTabla">DATOS GENERALES</th></tr>';
  tr += '<tr>\n\
          <th>Nombre:</th><td colspan="2"><input id="nombre" class="resaltado" type="text"></td>\n\
          <th>Owner:</th><td colspan="3"><input id="owner" class="resaltado" type="text"></td>\n\
          <th>KCV:</th><td colspan="2"><input id="kcv" type="text"></td>\n\
         </tr>';
  tr += '<tr>\n\
           <th>Tipo:</th>\n\
           <td colspan="2">\n\
             <select id="tipo" name="tipo" style="width:100%">\n\
                <option value="DES2">DES2</option>\n\
                <option value="RSA">RSA</option>\n\
             </select>\n\
           </td>\n\
           <th>Tamaño:</th>\n\
           <td colspan="3"><input id="bits" type="text"></td>\n\
           <th>Exponente:</th>\n\
           <td colspan="2"><input id="exponente" type="text"></td>\n\
         </tr>';
  tr += '<tr>\n\
           <th>Generación:</th>\n\
           <td colspan="2">\n\
             <select id="generacion" name="generacion" style="width:100%">\n\
               <option value="Desde componentes">Desde componentes</option>\n\
               <option value="En componentes">En componentes</option>\n\
               <option value="Aleatoria">Aleatoria</option>\n\
               <option value="Importada">Importada</option>\n\
             </select>\n\
           </td>\n\
           <th>Acción:</th>\n\
           <td colspan="3">\n\
             <select id="accion" name="accion" style="width:100%">\n\
               <option value="Carga">Carga</option>\n\
               <option value="Generaci&oacute;n">Generaci&oacute;n</option>\n\
               <option value="Importaci&oacute;n">Importaci&oacute;n</option>\n\
               <option value="Exportaci&oacute;n">Exportaci&oacute;n</option>\n\
               <option value="Borrado">Borrado</option>\n\
               <option value="Edici&oacute;n">Edici&oacute;n</option>\n\
             </select>\n\
           </td>\n\
           <th>Versión:</th>\n\
           <td colspan="2"><input type="text" id="version" name="version"></td>\n\
         </tr>';
  tr += '<tr>\n\
           <th colspan="2" style="text-align: left">Observaciones:</th>\n\
           <td colspan="8">\n\
             <textarea id="observaciones" name="observaciones" style="width: 100%;resize: none"></textarea>\n\
           </td>\n\
         </tr>';
  tr += '<tr>\n\
           <th colspan="10">USOS</th>\n\
        </tr>';
  tr += '<tr><td colspan="2" style="text-align: left"><input id="uso_encrypt" name="uso_encrypt" type="checkbox"> Encrypt</td>\n\
             <td colspan="2" style="text-align: left"><input id="uso_sign" name="uso_sign" type="checkbox"> Sign</td>\n\
             <td colspan="2" style="text-align: left"><input id="uso_wrap" name="uso_wrap" type="checkbox"> Wrap</td>\n\
             <td colspan="2" style="text-align: left"><input id="uso_export" name="uso_export" type="checkbox"> Export</td>\n\
             <td colspan="2" style="text-align: left"><input id="uso_derive" name="uso_derive" type="checkbox"> Derive</td>\n\
         </tr>';
  tr += '<tr>\n\
            <td colspan="2" style="text-align: left"><input id="uso_decrypt" name="uso_decrypt" type="checkbox"> Decrypt</td>\n\
            <td colspan="2" style="text-align: left"><input id="uso_verify" name="uso_verify" type="checkbox"> Verify</td>\n\
            <td colspan="2" style="text-align: left"><input id="uso_unwrap" name="uso_unwrap" type="checkbox"> Unwrap</td>\n\
            <td colspan="2" style="text-align: left"><input id="uso_import" name="uso_import" type="checkbox"> Import</td>\n\
            <td colspan="2" style="text-align: left"></td>\n\
        </tr>';
  tr += '<tr>\n\
          <th colspan="10">ATRIBUTOS</th>\n\
         </tr>';
  tr += '<tr>\n\
            <td colspan="2" style="text-align: left"><input id="att_sensitive" name="att_sensitive" type="checkbox"> Sensitive</td>\n\
            <td colspan="2" style="text-align: left"><input id="att_modifiable" name="att_modifiable" type="checkbox"> Modifiable</td>\n\
            <td colspan="2" style="text-align: left"><input id="att_private" name="att_private" type="checkbox"> Private</td>\n\
            <td colspan="2" style="text-align: left"><input id="att_extractable" name="att_extractable" type="checkbox"> Extractable</td>\n\
            <td colspan="2" style="text-align: left"><input id="att_exportable" name="att_exportable" type="checkbox"> Exportable</td>\n\
        </tr>';
  tr += '<tr>\n\
            <td colspan="2" style="text-align: left"><input id="att_trusted" name="att_trusted" type="checkbox"> Trusted</td>\n\
            <td colspan="2" style="text-align: left"><input id="att_wrapwtrusted" name="att_wrapwtrusted" type="checkbox"> Wrap w/Trusted</td>\n\
            <td colspan="2" style="text-align: left"><input id="att_unwrapmask" name="att_unwrapmask" type="checkbox"> Unwrap Mask</td>\n\
            <td colspan="2" style="text-align: left"><input id="att_derivemask" name="att_derivemask" type="checkbox"> Derive Mask</td>\n\
            <td colspan="2" style="text-align: left"><input id="att_deletable" name="att_deletable" type="checkbox"> Deletable</td>\n\
        </tr>';
  tr += '<tr>\n\
            <td colspan="10" class="pieTabla"><input type="button" id="agregarLlave" name="agregarLlave" value="AGREGAR" class="btn-success"></td>\n\
            <td style="display:none"><input type="text" id="fuente" name="fuente" value="llave"></td>\n\
            <td style="display:none"><input type="text" id="idref" name="idref" value="'+idref+'"></td>\n\
            <td style="display:none"><input type="text" id="codigo" name="codigo" value="'+codigo+'"></td>\n\
            <td style="display:none"><input type="text" id="resumen" name="resumen" value="'+resumen+'"></td>\n\
            <td style="display:none"><input type="text" id="cliente" name="cliente" value="'+cliente+'"></td>\n\
        </tr>';                            
  tr += '</table>';
  tabla += tr;
  var cargar = encabezado;
  cargar += tabla;
  var volver = '<br><a href="referencia.php?idreferencia='+idref+'" id="volverReferencia">Volver</a>';
  cargar += volver;
  vaciarContent("#main-content");
  $("#main-content").html(cargar);  
});//*** fin del click nuevaLlave ***

///Disparar función al hacer click en el botón Agregar Llave.
///Se validan los datos para la llave, luego 
///se cargan los dos DIVs (#selector y #content), en #selector se cargan todos los objetos de la referencia y en 
///#content los datos de la llave recién agregada, siempre y cuando haya pasado la validación.
$(document).on("click", "#agregarLlave", function(){
  var seguir = true;
  seguir = validarLlave();
  
  ///En caso de que se valide todo, se prosigue a enviar la consulta con la actualización en base a los parámetros pasados
  if (seguir) {
    ///Recupero valores editados y armo la consulta para el update:
    var codigo = (document.getElementById("codigo").value).trim();
    var resumen = (document.getElementById("resumen").value).trim();
    var cliente = (document.getElementById("cliente").value).trim();
    var idref = document.getElementById("idref").value;
    var nombre = (document.getElementById("nombre").value).trim();
    var owner = (document.getElementById("owner").value).trim();
    var kcv = (document.getElementById("kcv").value).trim();
    var tipo = (document.getElementById("tipo").value).trim();
    var bits = parseInt(document.getElementById("bits").value, 10);
    var version = (document.getElementById("version").value).trim();
    var accion = (document.getElementById("accion").value).trim();
    var generacion = (document.getElementById("generacion").value).trim();
    var exponente;
    if (document.getElementById("exponente").value === '') exponente = 0; else exponente = parseInt(document.getElementById("exponente").value, 10);
    var obs = (document.getElementById("observaciones").value).trim();
    //alert('nombre: '+nombre+'\nowner: '+owner+'\nkcv: '+kcv+'\ntipo: '+tipo+'\nbits: '+bits+'\nexponente: '+exponente+'\ngeneracion: '+generacion+'\naccion: '+accion+'\nversion: '+version+'\nobs: '+obs);
    
    var uso_encrypt, uso_decrypt, uso_sign, uso_verify, uso_wrap, uso_unwrap, uso_import, uso_export, uso_derive;
    var att_sensitive, att_trusted, att_modifiable, att_wrapwtrusted, att_private, att_derivemask, att_unwrapmask, att_exportable, att_extractable, att_deletable;
    if (document.getElementById("uso_encrypt").checked) uso_encrypt = 1; else uso_encrypt = 0;
    if (document.getElementById("uso_decrypt").checked) uso_decrypt = 1; else uso_decrypt = 0;
    if (document.getElementById("uso_sign").checked) uso_sign = 1; else uso_sign = 0;
    if (document.getElementById("uso_verify").checked) uso_verify = 1; else uso_verify = 0;
    if (document.getElementById("uso_wrap").checked) uso_wrap = 1; else uso_wrap = 0;
    if (document.getElementById("uso_unwrap").checked) uso_unwrap = 1; else uso_unwrap = 0;
    if (document.getElementById("uso_import").checked) uso_import = 1; else uso_import = 0;
    if (document.getElementById("uso_export").checked) uso_export = 1; else uso_export = 0;
    if (document.getElementById("uso_derive").checked) uso_derive = 1; else uso_derive = 0;
    if (document.getElementById("att_sensitive").checked) att_sensitive = 1; else att_sensitive = 0;
    if (document.getElementById("att_trusted").checked) att_trusted = 1; else att_trusted = 0;
    if (document.getElementById("att_modifiable").checked) att_modifiable = 1; else att_modifiable = 0;
    if (document.getElementById("att_wrapwtrusted").checked) att_wrapwtrusted = 1; else att_wrapwtrusted = 0;
    if (document.getElementById("att_private").checked) att_private = 1; else att_private = 0;
    if (document.getElementById("att_derivemask").checked) att_derivemask = 1; else att_derivemask = 0;
    if (document.getElementById("att_unwrapmask").checked) att_unwrapmask = 1; else att_unwrapmask = 0;
    if (document.getElementById("att_exportable").checked) att_exportable = 1; else att_exportable = 0;
    if (document.getElementById("att_extractable").checked) att_extractable = 1; else att_extractable = 0;
    if (document.getElementById("att_deletable").checked) att_deletable = 1; else att_deletable = 0;
    //alert('encrypt: '+uso_encrypt+'\ndecrypt: '+uso_decrypt+'\nsign: '+uso_sign+'\nverify: '+uso_verify+'\nwrap: '+uso_wrap+'\nunwrap: '+uso_unwrap+'\nexport: '+uso_export+'\nimport: '+uso_import+'\nderive: '+uso_derive);
    //alert('sensitive: '+att_sensitive+'\ntrusted: '+att_trusted+'\nmodifiable: '+att_modifiable+'\nwrap w trusted: '+att_wrapwtrusted+'\nprivate: '+att_private+'\nunwrap mask: '+att_unwrapmask+'\nextractable: '+att_extractable+'\nderive mask: '+att_derivemask+'\nexportable: '+att_exportable+'\ndeletable: '+att_deletable);

    var query = "select nombre from llaves inner join tareas on tareas.idtareas=llaves.tarea where nombre='"+nombre+"' and owner='"+owner+"' and version='"+version+"' and referencia='"+idref+"'";
      var url = "data/selectQuery.php";
    //alert(query);
    $.getJSON(url, {query: ""+query+""}).done(function(request) {
      var total = request["rows"];
      if (total === 0) {
        var query = 'insert into tareas (referencia, accion, observaciones) values ('+idref+', "'+accion+'", "'+obs+'")';
        var url = "data/updateQuery.php";
        $.getJSON(url, {query: ""+query+""}).done(function(request) {
          var resultado = request["resultado"];
          if (resultado === "OK") {
            var query = 'select max(idtareas) as ultimaTarea from tareas';
            var url = "data/selectQuery.php";
            $.getJSON(url, {query: ""+query+""}).done(function(request) {
              var idtarea = request.resultado[0]["ultimaTarea"];

              var query = "insert into llaves (tarea, nombre, owner, version, tipo, modoGeneracion, kcv, bits, exponente, estado, uso_encrypt, uso_decrypt, uso_sign, uso_verify, uso_wrap, uso_unwrap, uso_export, uso_import, uso_derive,\n\
                    att_sensitive, att_trusted, att_modifiable, att_wrapwtrusted, att_private, att_unwrapmask, att_extractable, att_derivemask, att_exportable, att_deletable) values \n\
                    ("+idtarea+", '" + nombre + "', '" + owner + "', '" + version + "', '" + tipo + "', '" + generacion + "', '" + kcv + "', " + bits + ", " + exponente + ", 'activa', " + uso_encrypt + ", " + uso_decrypt + ", " + uso_sign+ ", " + uso_verify
                    + ", " + uso_wrap + ", " + uso_unwrap + ", " + uso_export + ", " + uso_import + ", " + uso_derive + ", " + att_sensitive + ", " + att_trusted + ", " + att_modifiable + ", " + att_wrapwtrusted + ", " + att_private + ", " + att_unwrapmask
                    + ", " + att_extractable + ", " + att_derivemask + ", " + att_exportable + ", " + att_deletable + ")";
              var url = "data/updateQuery.php";

              $.getJSON(url, {query: ""+query+""}).done(function(request) {
                var resultado = request["resultado"];
                if (resultado === "OK") {
                  var query = 'select max(idkeys) as ultimaLlave from llaves';
                  var url = "data/selectQuery.php";
                  $.getJSON(url, {query: ""+query+""}).done(function(request) {
                    var idllave = request.resultado[0]["ultimaLlave"];
                    alert('Registro agregado correctamente!');
                    var divs = "<div id='fila' class='row'>\n\
                                <div id='selector' class='col-md-5 col-sm-12'></div>\n\
                                <div id='content' class='col-md-7 col-sm-12'></div>\n\
                              </div>";
                    $("#main-content").empty();
                    encabezado = '<h1 id="titulo" class="encabezado">' + codigo + '</h1>';
                    encabezado += '<h3>'+resumen+'<b>('+cliente+')</b></h3>';
                    $("#main-content").html(encabezado);
                    $("#main-content").append(divs);
                    cargarObjetos(idref, "#selector", false, 'llave', idllave);
                    mostrarLlave(idllave, "#content");
                    inhabilitarLlave();
                  });
                }
                else {
                  alert('Hubo un error... Por favor verifique.');
                }
              });
            });
          }
          else {
            alert('Hubo un error. Por favor verifique.');
          }
        });
      }
      else {
          alert('Ya existe una llave con esos datos. Por favor verifique.');
        }
    }); 
  }
});//*** fin del click agregarLlave ***

/**************************************************************************************************************************
/// ***************************************************** FIN LLAVES ******************************************************
***************************************************************************************************************************
*/



/***************************************************************************************************************************
/// Comienzan las funciones que manejan los eventos relacionados a las CERTIFICADOS como ser creación, edición y eliminación.
****************************************************************************************************************************
*/

///Disparar funcion al hacer click en el botón eliminar.
///Esto hace que el registro correspondiente al certificado pase a estado de inactivo.
///Además, se "limpia" el form del div #selector quitando el certificado eliminado.
$(document).on("click", "#eliminarCertificado", function () {
  var pregunta = confirm('Está a punto de eliminar el registro. ¿Desea continuar?');
  if (pregunta) {
    ///Se hace consulta primero para averiguar todos los idcerts correspondientes a la actividad.
    ///De esta forma, al eliminar el certificado se resalta automáticamente el anterior (si hay).
    var url = "data/selectQuery.php";
    var cert = document.getElementById("idcert").value;
    var idref = document.getElementById("idref").value;
    var query = "select idcertificados as idcerts from certificados inner join tareas on tareas.idtareas=certificados.tarea inner join referencias on referencias.idreferencias=tareas.referencia where certificados.estado='activo' and referencias.idreferencias='"+idref+"' order by owner";
    
    $.getJSON(url, {query: ""+query+""}).done(function(request) {
      var idks = request["resultado"];
      var total = request["rows"];//alert(total);
      var ids = new Array();
      for (var index in idks) {
        ids.push(idks[index]["idcerts"]);
      }
      
      var indiceActual = ids.indexOf(cert);//alert(indiceActual);
      var cert1 = 0;
      
      if (total === 1)  {//alert('total = 1. Este es el último');
        var volver = '<br><a href="referencia.php?idreferencia='+idref+' name="'+idref+'" id="volverReferencia">Volver</a>';
        var texto = '<h2>Ya NO quedan certificados!.</h2>';
        texto += volver;
        $("#content").html(texto);
      }
      else {
        if ((indiceActual !== 0)&&(indiceActual !== -1)) {
          cert1 = indiceActual - 1;
        }
        else {
          if (indiceActual === 0) {
            cert1 = indiceActual + 1;
          }
        }
      }
      var url = "data/updateQuery.php";
      var query = "update certificados set estado='inactivo' where idcertificados='" + cert + "'";
      
      $.getJSON(url, {query: ""+query+""}).done(function(request) {
        var resultado = request["resultado"];
        if (resultado === "OK") {
          if (total >= 1) {
            mostrarCertificado(ids[cert1], "#content");
          }
          cargarObjetos(idref, "#selector", false, 'cert', ids[cert1]);
        }
        else {
          alert('Hubo un error. Por favor verifique.');
        }
      });
    });
  }
  else {
    //alert('no quiso borrar');
  }
});//*** fin del click eliminarCertificado ***

///Disparar funcion al hacer clic en el botón actualizar.
///Se validan todos los campos antes de hacer la actualización, y una vez hecha se inhabilita el form y parte de los botones.
$(document).on("click", "#actualizarCertificado", function (){
    var seguir = true;
    seguir = validarCertificado();
    
    ///En caso de que se valide todo, se prosigue a enviar la consulta con la actualización en base a los parámetros pasados
    if (seguir) {
      ///Recupero valores editados y armo la consulta para el update:
      var idcert = document.getElementById("idcert").value;
      var idref = document.getElementById("idref").value;
      var nombre = (document.getElementById("nombre").value).trim();
      var owner = (document.getElementById("owner").value).trim();
      var bandera = (document.getElementById("bandera").value).trim();
      var vencimiento = document.getElementById("vencimiento").value;
      var version = (document.getElementById("version").value).trim();
      var accion = (document.getElementById("accion").value).trim();
      var obs = (document.getElementById("observaciones").value).trim();
      //alert('idcert: '+idcert+'\nidref: '+idref+'\nactividad: '+actividad+'\nnombre: '+nombre +'\nowner: '+owner+'\nbandera: '+bandera+'\naccion: '+accion+'\nversion: '+version+'\nobs: '+obs);
      
      var query = "select idcertificados, nombre from certificados inner join tareas on tareas.idtareas=certificados.tarea where nombre='"+nombre+"' and owner='"+owner+"' and version='"+version+"' and referencia='"+idref+"'";
      var url = "data/selectQuery.php";
      //alert(query);
      $.getJSON(url, {query: ""+query+""}).done(function(request) {
        var total = request["rows"];
        var id;
        if (total > 0) {
          id = request["resultado"][0]["idcertificados"];
        }
        if (((total <= 1) && (idcert === id)) || ((idcert !== id) && (total < 1))) {
          var query = "update certificados inner join tareas on certificados.tarea=tareas.idtareas set nombre='" + nombre + "', owner='" + owner + "', vencimiento='"+vencimiento+"' , bandera='"+bandera+"', version='" + version + "', accion='"+accion+"', tareas.observaciones='"+obs+"' where idcertificados='" + idcert + "'";
          var url = "data/updateQuery.php";
          //alert(query);
          ///Ejecuto la consulta y muestro mensaje según resultado:
          $.getJSON(url, {query: ""+query+""}).done(function(request) {
            var resultado = request["resultado"];
            if (resultado === "OK") {
              alert('Registro modificado correctamente!');  
              $("#actualizarCertificado").attr("disabled", "disabled");
              document.getElementById("editarCertificado").value = "EDITAR";
              inhabilitarCertificado();
              cargarObjetos(idref, "#selector", false, 'cert', idcert);
            }
            else {
              alert('Hubo un error. Por favor verifique.');
            }
          });
        }
        else {
          alert('Ya existe un certificado con esos datos. Por favor verifique.');
        }
      });  
    }
  });//*** fin del click actualizarCertificado ***

///Disparar función al hacer click en el botón Nuevo Certificado.
///Se vuelve al DIV #main-content y se genera un form en blanco para agregar los datos del certificado.
$(document).on("click", "#nuevoCertificado", function() {
  var idref = document.getElementById("nuevoCertificado").name;
  var codigo = document.getElementById("codigo").value;
  var resumen = document.getElementById("resumen").value;
  var slot = document.getElementById("slot").value;
  var nom = slot.split('_');
  var cliente = nom[0];
  var encabezado = '<h1 class="encabezado">NUEVO CERTIFICADO</h1>';
  encabezado += '<h3>'+codigo+' <b>('+cliente+')<b></h3>';
  var tabla = '<table id="newCert" name="newCert" class="tabla2" style="max-width:75%">';
  var tr = '<tr><th colspan="8" class="tituloTabla">DATOS GENERALES</th></tr>';
  tr += '<tr>\n\
          <th>Nombre:</th><td><input id="nombre" name="nombre" class="resaltado" type="text"></td>\n\
          <th colspan="2">Owner:</th><td><input id="owner" name="owner" class="resaltado" type="text"></td>\n\
          <th>Bandera:</th>\n\
          <td colspan="2">\n\
            <select id="bandera" name="bandera" style="width:100%">\n\
              <option value="seleccionar" selected="yes">---SELECCIONAR---</option>\n\
              <option value="MASTER">MASTER</option>\n\
              <option value="VISA">VISA</option>\n\
              <option value="AMEX">AMEX</option>\n\
            </select>\n\
          </td>\n\
         </tr>';
  tr += '<tr>\n\
          <th>Fecha</th>\n\
          <td><input id="vencimiento" name="vencimiento" type="date" " style="width:100%; text-align: center" min="2016-10-01"></td>\n\
          <th>Acción:</th>\n\
          <td colspan="2">\n\
            <select id="accion" name="accion" style="width:100%">\n\
              <option value="seleccionar" selected="yes">---SELECCIONAR---</option>\n\
              <option value="Carga">Carga</option>\n\
              <option value="Generaci&oacute;n">Generaci&oacute;n</option>\n\
              <option value="Importaci&oacute;n">Importaci&oacute;n</option>\n\
              <option value="Exportaci&oacute;n">Exportaci&oacute;n</option>\n\
              <option value="Borrado">Borrado</option>\n\
              <option value="Edici&oacute;n">Edici&oacute;n</option>\n\
            </select>\n\
          </td>\n\
          <th>Versión:</th><td colspan="2"><input id="version" name="version" type="text"></td>\n\
        </tr>';
  tr += '<tr>\n\
           <th>Observaciones:</th>\n\
           <td colspan="8">\n\
             <textarea id="observaciones" name="observaciones" style="width: 100%;resize: none"></textarea>\n\
           </td>\n\
         </tr>';                             
  tr += '<tr>\n\
            <td colspan="8" class="pieTabla"><input type="button" id="agregarCertificado" name="agregarCertificado" value="AGREGAR" class="btn-success"></td>\n\
            <td style="display:none"><input type="text" id="fuente" name="fuente" value="certificado"></td>\n\
            <td style="display:none"><input type="text" id="idref" name="idref" value="'+idref+'"></td>\n\
            <td style="display:none"><input type="text" id="codigo" name="codigo" value="'+codigo+'"></td>\n\
            <td style="display:none"><input type="text" id="resumen" name="resumen" value="'+resumen+'"></td>\n\
            <td style="display:none"><input type="text" id="cliente" name="cliente" value="'+cliente+'"></td>\n\
        </tr>';                            
  tr += '</table>';
  tabla += tr;
  var cargar = encabezado;
  cargar += tabla;
  var volver = '<br><a href="referencia.php?idreferencia='+idref+'" id="volverReferencia">Volver</a>';
  cargar += volver;
  vaciarContent("#main-content");
  $("#main-content").html(cargar);  
});//*** fin del click nuevoCertificado ***

///Disparar función al hacer click en el botón Agregar Certificado.
///Se validan los datos para el certificado, luego 
///se cargan los dos DIVs (#selector y #content), en #selector se cargan todos los objetos de la referencia y en 
///#content los datos del certificado recién agregado, siempre y cuando haya pasado la validación.
$(document).on("click", "#agregarCertificado", function(){
  var seguir = true;
  seguir = validarCertificado();
  
  ///En caso de que se valide todo, se prosigue a enviar la consulta con la actualización en base a los parámetros pasados
  if (seguir) {
    ///Recupero valores editados y armo la consulta para el update:
    var idref = document.getElementById("idref").value;
    var nombre = (document.getElementById("nombre").value).trim();
    var owner = (document.getElementById("owner").value).trim();
    var bandera = (document.getElementById("bandera").value).trim();
    var vencimiento = document.getElementById("vencimiento").value;
    var version = (document.getElementById("version").value).trim();
    var accion = (document.getElementById("accion").value).trim();
    var obs = (document.getElementById("observaciones").value).trim();
    var codigo = (document.getElementById("codigo").value).trim();
    var cliente = (document.getElementById("cliente").value).trim();
    var resumen = (document.getElementById("resumen").value).trim();
    //alert('idref: '+idref+'\nnombre: '+nombre +'\nowner: '+owner+'\nbandera: '+bandera+'\nvencimiento'+vencimiento+'\naccion: '+accion+'\nversion: '+version+'\nobs: '+obs);
    
    var query = "select nombre from certificados inner join tareas on tareas.idtareas=certificados.tarea where nombre='"+nombre+"' and owner='"+owner+"' and version='"+version+"' and referencia='"+idref+"'";
    var url = "data/selectQuery.php";
    //alert(query);
    $.getJSON(url, {query: ""+query+""}).done(function(request) {
      var total = request["rows"];
      if (total === 0) {
        var query = 'insert into tareas (referencia, accion, observaciones) values ('+idref+', "'+accion+'", "'+obs+'")';
        var url = "data/updateQuery.php";
        $.getJSON(url, {query: ""+query+""}).done(function(request) {
          var resultado = request["resultado"];
          if (resultado === "OK") {
            var query = 'select max(idtareas) as ultimaTarea from tareas';
            var url = "data/selectQuery.php";
            $.getJSON(url, {query: ""+query+""}).done(function(request) {
              var idtarea = request.resultado[0]["ultimaTarea"];

              var query = "insert into certificados (tarea, nombre, owner, version, bandera, vencimiento, estado) values \n\
                    ("+idtarea+", '" + nombre + "', '" + owner + "', '" + version + "', '" + bandera + "', '" + vencimiento + "', 'activo')";
              var url = "data/updateQuery.php";

              $.getJSON(url, {query: ""+query+""}).done(function(request) {
                var resultado = request["resultado"];
                if (resultado === "OK") {
                  var query = 'select max(idcertificados) as ultimoCert from certificados';
                  var url = "data/selectQuery.php";
                  $.getJSON(url, {query: ""+query+""}).done(function(request) {
                    var idcert = request.resultado[0]["ultimoCert"];
                    alert('Registro agregado correctamente!');
                    if ($("#content").length === 0) {
                      var divs = "<div id='fila' class='row'>\n\
                                <div id='selector' class='col-md-5 col-sm-12'></div>\n\
                                <div id='content' class='col-md-7 col-sm-12'></div>\n\
                              </div>";
                    }  
                    $("#main-content").empty();
                    var encabezado = '<h1 class="encabezado" id="titulo">'+codigo+'</h1>';
                    encabezado += '<h3>'+resumen+' <b>('+cliente+')<b></h3>'; 
                    $("#main-content").html(encabezado);
                    $("#main-content").append(divs);
                    cargarObjetos(idref, "#selector", false, 'cert', idcert);
                    mostrarCertificado(idcert, "#content");
                    inhabilitarCertificado();
                  });
                }
                else {
                  alert('Hubo un error... Por favor verifique.');
                }
              });
            });
          }
          else {
            alert('Hubo un error. Por favor verifique.');
          }
        });
      }
      else {
          alert('Ya existe un certificado con esos datos. Por favor verifique.');
        }
    });  
  }
});//*** fin del click agregarCertificado ***

/**************************************************************************************************************************
/// ************************************************** FIN CERTIFICADOS ***************************************************
***************************************************************************************************************************
*/

/**************************************************************************************************************************
/// Comienzan las funciones que manejan los eventos relacionados a las USUARIOS como ser creación, edición y eliminación.
***************************************************************************************************************************
*/

///Disparar funcion al hacer clic en el link del usuario.
///Se cargan en el DIV #content los datos del mismo.
$(document).on("click", ".detailUser", function () {
    var user = $(this).attr("id");
    cargarDetalleUsuario(user);
  });//*** fin del click detailUser ***
  
///Disparar funcion al hacer click en el botón eliminar.
///Esto hace que el registro correspondiente al usuario pase a estado de inactivo.
///Además, se "limpia" el form del div #selector quitando el usuario eliminado.
$(document).on("click", "#eliminarUsuario", function () {
  var pregunta = confirm('Está a punto de eliminar el registro. ¿Desea continuar?');
  if (pregunta) {
    var url = "data/selectQuery.php";
    var user = document.getElementById("iduser").value;
    var query = "select idusuarios as iduser from usuarios where estado='activo' order by empresa asc, apellido asc, idusuarios asc";
    
    $.getJSON(url, {query: ""+query+""}).done(function(request) {
      var idks = request["resultado"];
      var total = request["rows"];
      var ids = new Array();
      for (var index in idks) {
        ids.push(idks[index]["iduser"]);
      }
      
      var indiceActual = ids.indexOf(user);//alert(indiceActual);
      var user1 = 0;
      
      if (total === 1)  {//alert('total = 1. Este es el último');
        var volver = '<br><a href="index.php">Volver</a>';
        var texto = '<h2>Ya NO quedan usuarios!.</h2>';
        texto += volver;
        vaciarContent("#main-content");
        $("#main-content").html(texto);
      }
      else {
        if ((indiceActual !== 0)&&(indiceActual !== -1)) {
          user1 = indiceActual - 1;
        }
        else {
          if (indiceActual === 0) {
            user1 = indiceActual + 1;
          }
        }
      }
      var url = "data/updateQuery.php";
      var query = "update usuarios set estado='inactivo' where idusuarios='" + user + "'";
      
      $.getJSON(url, {query: ""+query+""}).done(function(request) {
        var resultado = request["resultado"];
        if (resultado === "OK") {
          if (total > 1) {
            cargarDetalleUsuario(ids[user1]);
          }
        }
        else {
          alert('Hubo un error. Por favor verifique.');
        }
      });
    });
  }
  else {
    //alert('no quiso borrar');
  }
});//*** fin del click eliminarUsuario ***

///Disparar funcion al hacer clic en el botón actualizar.
///Se validan todos los campos antes de hacer la actualización, y una vez hecha se inhabilita el form y parte de los botones.
$(document).on("click", "#actualizarUsuario", function (){
    var seguir = true;
    seguir = validarUsuario();

    ///En caso de que se valide todo, se prosigue a enviar la consulta con la actualización en base a los parámetros pasados
    if (seguir) {
      ///Recupero valores editados y armo la consulta para el update:
      var iduser = document.getElementById("iduser").value;
      var nombre = (document.getElementById("nombre").value).trim();
      var apellido = (document.getElementById("apellido").value).trim();
      var empresa = (document.getElementById("empresa").value).trim();
      var mail = (document.getElementById("mail").value).trim();
      var tel = (document.getElementById("telefono").value).trim();
      var obs = (document.getElementById("observaciones").value).trim();
      //alert('iduser: '+iduser+'\nnombre: '+nombre +'\napellido: '+apellido+'\nempresa: '+empresa+'\nmail: '+mail+'\ntel: '+tel+'\nobs: '+obs);
      
      var query = "select idusuarios as id, apellido from usuarios where nombre='"+nombre+"' and apellido='"+apellido+"' and empresa='"+empresa+"'";
      var url = "data/selectQuery.php";
      //alert(query);
      $.getJSON(url, {query: ""+query+""}).done(function(request) {
        var total = request["rows"];
        var id;
        if (total > 0) {
          id = request["resultado"][0]["id"];
        }
        if (((total <= 1) && (iduser === id)) || ((iduser !== id) && (total < 1))) {  
          var query = "update usuarios set nombre='" + nombre + "', apellido='" + apellido + "', empresa='"+empresa+"' , mail='"+mail+"', telefono='" + tel +"', observaciones='"+obs+"' where idusuarios='" + iduser + "'";
          var url = "data/updateQuery.php";
          //alert(query);
          ///Ejecuto la consulta y muestro mensaje según resultado:
          $.getJSON(url, {query: ""+query+""}).done(function(request) {
            var resultado = request["resultado"];
            if (resultado === "OK") {
              alert('Registro modificado correctamente!');  
              $("#actualizarUsuario").attr("disabled", "disabled");
              document.getElementById("editarUsuario").value = "EDITAR";
              inhabilitarUsuario();
              cargarUsuarios("#selector", iduser);
            }
            else {
              alert('Hubo un error. Por favor verifique.');
            }
          });
        }
        else {
          alert('Ya existe un usuario con esos datos. Por favor verifique.');
        }
      });  
    }
  });//*** fin del click actualizarUsuario ***
  
///Disparar función al hacer click en el botón Nuevo Usuario.
///Se vuelve al DIV #main-content y se genera un form en blanco para agregar los datos del usuario.
$(document).on("click", "#nuevoUsuario", function() {
  var encabezado = '<h1 class="encabezado">NUEVO USUARIO</h1>';
  var tabla = '<table id="datosUsuario" name="datosUsuario" class="tabla2" style="max-width:40%">';
  var tr = '<tr>\n\
              <th colspan="4" class="tituloTabla">DATOS DEL USUARIO</th>\n\
            </tr>';
  tr += '<tr>\n\
            <th>Apellido</th>\n\
            <td><input id="apellido" name="apellido" class="resaltado" type="text"></td>\n\
            <th>Nombre</th>\n\
            <td><input id="nombre" name="nombre" class="resaltado" type="text"></td>\n\
        </tr>';
  tr += '<tr>\n\
          <th>Empresa</th>\n\
          <td colspan="3">\n\
            <select id="empresa" name="empresa" style="width:100%">\n\
              <option value="seleccionar" selected="yes">---SELECCIONAR---</option>\n\
              <option value="EMSA" style="margin:auto; padding:auto">EMSA</option>\n\
              <option value="BBVA">BBVA</option>\n\
              <option value="ITAU">ITAU</option>\n\
              <option value="SCOTIA">SCOTIA</option>\n\
            </select>\n\
          </td>\n\
        </tr>';
  tr += '<tr>\n\
            <th>Mail</th>\n\
            <td colspan="3"><input id="mail" name="mail" type="text"></td>\n\
         </tr>';
  tr += '<tr>\n\
            <th>Teléfono</th>\n\
            <td colspan="3"><input id="telefono" name="telefono" type="text"></td>\n\
         </tr>';
  tr += '<tr>\n\
            <th>Observaciones</th>\n\
            <td colspan="3"><textarea id="observaciones" name="observaciones" style="width: 100%;resize: none"></textarea></td>\n\
         </tr>';
  tr += '<tr>\n\
            <td colspan="4" class="pieTabla"><input type="button" id="agregarUsuario" name="agregarUsuario" value="AGREGAR" class="btn-success"></td>\n\
         </tr>'; 
  tr += '</table>';
  tabla += tr;
  var cargar = encabezado;
  cargar += tabla;
  var volver = '<br><a id="volverUsuario" href="usuario.php">Volver</a>';
  cargar += volver;
  vaciarContent("#main-content");
  $("#main-content").html(cargar);  
});//*** fin del click nuevoUsuario ***

///Disparar función al hacer click en el botón Agregar Usuario.
///Se validan los datos para el usuario, luego 
///se cargan los dos DIVs (#selector y #content), en #selector se cargan el listado de usuarios y en 
///#content los datos del usuario recién agregado, siempre y cuando haya pasado la validación.
$(document).on("click", "#agregarUsuario", function(){
  var seguir = true;
  seguir = validarUsuario();
  
  ///En caso de que se valide todo, se prosigue a enviar la consulta con la actualización en base a los parámetros pasados
  if (seguir) {
    ///Recupero valores y armo la consulta para el insert:
    var apellido = (document.getElementById("apellido").value).trim();
    var nombre = (document.getElementById("nombre").value).trim();
    var empresa = (document.getElementById("empresa").value).trim();
    var tel = (document.getElementById("telefono").value).trim();
    var mail = (document.getElementById("mail").value).trim();
    var obs = (document.getElementById("observaciones").value).trim();
    //alert('apellido: '+apellido+'\nnombre: '+nombre +'\nempresa: '+empresa+'\nmail: '+mail+'\ntel: '+tel+'\nobs: '+obs);
      
    var query = "select apellido from usuarios where nombre='"+nombre+"' and apellido='"+apellido+"' and empresa='"+empresa+"'";
    var url = "data/selectQuery.php";
    //alert(query);
    $.getJSON(url, {query: ""+query+""}).done(function(request) {
      var total = request["rows"];
      if (total === 0) {
        var query = 'insert into usuarios (nombre, apellido, empresa, telefono, mail, observaciones) values ("'+nombre+'", "'+apellido+'", "'+empresa+'", "'+tel+'", "'+mail+'", "'+obs+'")';
        var url = "data/updateQuery.php";
        //alert(query);
   
        $.getJSON(url, {query: ""+query+""}).done(function(request) {
          var resultado = request["resultado"];
          if (resultado === "OK") {  
            var query = 'select max(idusuarios) as ultimoUser from usuarios';
            var url = "data/selectQuery.php";
            $.getJSON(url, {query: ""+query+""}).done(function(request) {
              var iduser = request.resultado[0]["ultimoUser"];
              alert('Registro agregado correctamente!');
              if ($("#content").length === 0) {
                var divs = "<div id='fila' class='row'>\n\
                              <div id='selector' class='col-md-5 col-sm-12'></div>\n\
                              <div id='content' class='col-md-7 col-sm-12'></div>\n\
                            </div>";
              }  
              $("#main-content").empty();
              $("#main-content").append(divs);
              cargarUsuarios("#selector", iduser);
              cargarDetalleUsuario(iduser);
              inhabilitarUsuario();
            });
          } 
          else {
            alert('Hubo un error... Por favor verifique.');
          }
        }); 
      }
      else {
        alert('Ya existe un usuario con esos datos. Por favor verifique.');
      }
    });
  }
});//*** fin del click agregarUsuario ***
    
/**************************************************************************************************************************
/// **************************************************** FIN USUARIOS *****************************************************
***************************************************************************************************************************
*/

/**************************************************************************************************************************
/// Comienzan las funciones que manejan los eventos relacionados a las SLOTS como ser creación, edición y eliminación.
***************************************************************************************************************************
*/

///Disparar funcion al hacer clic en el link del slot.
///Se cargan en el DIV #content los datos del mismo.
$(document).on("click", ".detailSlot", function () {
    var slot = $(this).attr("id");
    var nombreSlot = $(this).attr("name");
    cargarDetalleSlot(slot, nombreSlot);
  });//*** fin del click detailSlot ***
  
///Disparar funcion al cambiar alguno de los nombres del select del nombre del HSM.
///Se buscan los datos correspondientes al nuevo hsm y se actualiza el valor del input nombrehsm.
$(document).on("change", "#nombrehsm", function (){
  var idhsm = this.value;
  var url = "data/selectQuery.php";
  var query = 'select nombre, serie, modelo, marca, observaciones from hsm where idhsm ='+idhsm;
  
  $.getJSON(url, {query: ""+query+""}).done(function(request){
    var hsm = request["resultado"][0];
    $("#serie").val(hsm["serie"]);
    $("#modelo").val(hsm["modelo"]);
    $("#marca").val(hsm["marca"]);
    $("#observaciones").val(hsm["observaciones"]);
    //inhabilitarSlot();      
  });
  
});//*** fin del change nombrehsm *** 

///Disparar funcion al hacer clic en el botón actualizar.
///Se validan todos los campos antes de hacer la actualización, y una vez hecha se inhabilita el form y parte de los botones.
$(document).on("click", "#actualizarSlot", function (){
    var seguir = true;
    seguir = validarSlot();

    var elementos = $(".nombreUsuario");
    var ids = $(".slotUserId");
    var tam = elementos.size();
    var arrayID = [];
    var slotUsersId = [];
    for (var i=0; i<tam; i++) {
      var selectActual = $(elementos[i]);
      var id = $(selectActual).val();
      var actual = $(ids[i]);
      var userId = $(actual).val();
      arrayID.push(id);
      slotUsersId.push(userId);
    }
    //alert(arrayID);
    var arrayRoles = [];
    var elem = $(".rolUsuario");
    for (var i=0; i<tam; i++) {
      var rol = $(elem[i]).val();
      arrayRoles.push(rol);
    }
    //alert(arrayRoles);
    var i = 1;
    var j = 0;
    var usuariosRepetidos = false;
    var continuar = true;
    var subArray = arrayID.slice(0);
    
    while ((i<arrayID.length) && (continuar===true)) {
      subArray.splice(0, 1);
      var ind = subArray.indexOf(arrayID[j]);
      if (ind === -1) { 
        i++;
        j++;
      }
      else {
        usuariosRepetidos = true;
        continuar = false;
      }
    }
    
    if (usuariosRepetidos) {
      alert('Hay usuarios que están repetidos. Por favor verifique.');
      seguir = false;
    }

    var rolesRepetidos = false;
    var continuar = true;
    
    var i = 0;
    while ((i<arrayRoles.length - 1) && (continuar===true)) {
      var elemento = arrayRoles[i].split("/");//alert('i: '+ i + ' - elemento 1: '+elemento[0]);
      var j = i + 1;
      var continuar1 = true;
      while ((j<arrayRoles.length) && (continuar1 === true)) {
        var existe = arrayRoles[j].includes(elemento[0]);//alert('j: '+ j +' - ' + arrayRoles[j]);
        if (existe) {
          continuar1 = false;
          continuar = false;
          rolesRepetidos = true;//alert('existió para el elemento 1');
        }
        else {
          j++;
        }
      }
      if ((continuar1 === true) && (elemento[1] !== "undefined"))
        {
        var k = i + 1;
        var continuar2 = true;//alert('i: '+ i + '- elemento 2: '+elemento[1]);
        while ((k<arrayRoles.length) && (continuar2 === true)) {
          var existe = arrayRoles[k].includes(elemento[1]);//alert('k: '+ k +' - ' + arrayRoles[k]);
          if (existe) {
            continuar2 = false;
            continuar = false;
            rolesRepetidos = true;//alert('existió para el segundo elemento');
          }
          else {
            k++;
          }
        }
      }
      i++;
    }
    
    if (rolesRepetidos) {
      alert('Hay usuarios que tienen el mismo rol. Por favor verifique.');
      seguir = false;
    }

    ///En caso de que se valide todo, se prosigue a enviar la consulta con la actualización en base a los parámetros pasados
    if (seguir) {
      ///Recupero valores editados y armo la consulta para el update:
      var idslot = document.getElementById("idslot").value;
      var nombre = (document.getElementById("slot").value).trim();
      var obs = (document.getElementById("slotobserva").value).trim();
      var hsm = document.getElementById("nombrehsm").value;
      //alert('idslot: '+idslot+'\nnombre: '+nombre +'\nhsm:'+hsm+'\nobs: '+obs);
      
      var query = "select idslots as id, nombre from slots where nombre='"+nombre+"' and hsm="+hsm+"";
      var url = "data/selectQuery.php";
      //alert(query);
      $.getJSON(url, {query: ""+query+""}).done(function(request) {
        var total = request["rows"];
        var id;
        if (total > 0) {
          id = request["resultado"][0]["id"];
        }
        if (((total <= 1) && (idslot === id)) || ((idslot !== id) && (total < 1))) {  
          var query = "update slots set nombre='" + nombre + "', observaciones='" + obs + "', hsm="+hsm+" where idslots='" + idslot + "'";
          var url = "data/updateQuery.php";
          //alert(query);
          ///Ejecuto la consulta y en caso de que se haya realizado sin problemas continúo con el update de los ususarios:
          $.getJSON(url, {query: ""+query+""}).done(function(request) {
            var resultado = request["resultado"];
            if (resultado === "OK") {
              var query = "update slotusers set usuariokms = case idslotusers ";
              for (var i in slotUsersId){
                query += "when "+slotUsersId[i]+" then '"+arrayRoles[i]+"' ";
              }
              query += " end where idslotusers in (";
              var tope = parseInt(slotUsersId.length, 10) - 1;
              for (var j in slotUsersId){
                if (j == tope) {
                  query += slotUsersId[j]+")";
                }
                else {
                  query += slotUsersId[j]+", ";
                } 
              }
              //alert(query);
              ///Ejecuto la consulta y muestro mensaje según resultado:
              $.getJSON(url, {query: ""+query+""}).done(function(request) {
                var resultado = request["resultado"];
                if (resultado === "OK") {
                  alert('Registro modificado correctamente!');  
                  inhabilitarSlot();
                  cargarSlots("#selector", idslot);
                }
                else {
                  alert('Hubo un error. Por favor verifique.');
                }
              });
            }  
            else {
              alert('Hubo un error. Por favor verifique.');
            }
          });
        }
        else {
          alert('Ya existe un slot con esos datos. Por favor verifique.');
        }
      });  
    }
  });//*** fin del click actualizarSlot ***

///Disparar funcion al hacer click en el botón eliminar.
///Esto hace que el registro correspondiente al slot pase a estado de inactivo.
///Además, se "limpia" el form del div #selector quitando el slot eliminado.
$(document).on("click", "#eliminarSlot", function () {
  var pregunta = confirm('Está a punto de eliminar el registro. ¿Desea continuar?');
  if (pregunta) {
    var url = "data/selectQuery.php";
    var slot = document.getElementById("idslot").value;
    var query = "select idslots, nombre from slots where estado='activo' order by nombre asc, idslots asc";
        
    $.getJSON(url, {query: ""+query+""}).done(function(request) {
      var idks = request["resultado"];
      var total = request["rows"];
      var ids = new Array();
      var nombres = new Array();
      for (var index in idks) {
        ids.push(idks[index]["idslots"]);
        nombres.push(idks[index]["nombre"]);
      }
      
      var indiceActual = ids.indexOf(slot);//alert(indiceActual);
      var slot1 = 0;
      
      if (total === 1)  {//alert('total = 1. Este es el último');
        var volver = '<br><a href="index.php">Volver</a>';
        var texto = '<h2>Ya NO quedan slots!.</h2>';
        texto += volver;
        vaciarContent("#main-content");
        $("#main-content").html(texto);
      }
      else {
        if ((indiceActual !== 0)&&(indiceActual !== -1)) {
          slot1 = indiceActual - 1;
        }
        else {
          if (indiceActual === 0) {
            slot1 = indiceActual + 1;
          }
        }
      }
      var url = "data/updateQuery.php";
      var query = "update slots set estado='inactivo' where idslots='" + slot + "'";
      
      $.getJSON(url, {query: ""+query+""}).done(function(request) {
        var resultado = request["resultado"];
        if (resultado === "OK") {
          if (total > 1) {
            cargarDetalleSlot(ids[slot1], nombres[slot1]);
          }
        }
        else {
          alert('Hubo un error. Por favor verifique.');
        }
      });
    });
  }
  else {
    //alert('no quiso borrar');
  }
});//*** fin del click eliminarSlot ***

///Disparar funcion al hacer clic en el botón de Quitar de alguno de los usuarios del slot.
///Se cargan en el DIV #content los datos del mismo.
$(document).on("click", ".quitarUser", function () {
  var iduser = $(this).parent().next().children().val();
  var nombreUser = $(this).parent().prev().prev().prev().children().val();
  var idslot = document.getElementById("idslot").value;
  var nombreslot = document.getElementById("slot").value;
  var url = "data/updateQuery.php"; 
  var query = "update slotusers set estado='inactivo' where idslotusers='"+iduser+"'";
  var pregunta = confirm('Está a punto de quitar a '+nombreUser+' del slot '+nombreslot+'. ¿Desea continuar?');
  if (pregunta) {
    $.getJSON(url, {query: ""+query+""}).done(function(request) {
      var resultado = request["resultado"];
      if (resultado === "OK") {
        //alert('Registro modificado correctamente!');  
        cargarDetalleSlot(idslot, nombreslot);
        inhabilitarSlot();
      }
      else {
        alert('Hubo un error. Por favor verifique.');
      }
    });
  }
  else {
    //alert('no quiso quitar al usuario');
  } 
});//*** fin del click quitarUser ***

///Disparar funcion al hacer clic en el botón de Agregar que está luego de los usuarios del slot.
///Se cargan en la tabla una nueva fila para agregar el nuevo usuario.
$(document).on("click", "#nuevoUsuarioSlot", function () {
  var trs=$("#detalleSlot tr").length;
  var nuevaFila = '<tr><td colspan="6">ALGO</td></tr>';
  var indice = trs - 3;
  var selector = '#detalleSlot tr:eq('+indice+')';
  
  
  $(selector).after(nuevaFila);
  //$("#detalleSlot").append(nuevaFila);
});

/*
///Disparar funcion al cambiar alguno de los nombres del select de nombreUsuario.
///Se busca la empresa a la que corresponde el nuevo usuario y se actualiza el valor del input empresaUsuario.
$(document).on("change", "#nombreUsuario", function (){
  var iduser = this.value;
  var url = "data/selectQuery.php";
  var query = 'select empresa from usuarios where idusuarios = "'+iduser+'"';
  var selector = $(this).parent().next().children("input");
  $.getJSON(url, {query: ""+query+""}).done(function(request){
    var empresa = request["resultado"][0]["empresa"];
    $(selector).val(empresa);
  });
});//*** fin del change nombreUsuario ***
*/

/**************************************************************************************************************************
/// ***************************************************** FIN SLOTS *******************************************************
***************************************************************************************************************************
*/


}

/**
 * \brief Función que envuelve todos los eventos JQUERY con sus respectivos handlers.
 */
$(document).on("ready", todo());//*** fin del ready ***