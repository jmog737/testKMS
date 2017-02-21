$(document).ready(function () {
  
  //Disparar funcion al hacer clic en el link de la actividad.
  //Se cargan en el DIV #content los datos de la misma.
  $(".detail").click(function () {
    var url = "data/handleLogbook.php";  
    var activity = $(this).attr("id");
    var query = "select * from actividades where estado='activa' and idactividades='"+activity+"'";
    
    $("#selector").css('padding-right', '30px');
    $("#editar").removeAttr('disabled');
    $("#eliminar").removeAttr('disabled');
    
    $.getJSON(url, {query: ""+query+"", actividad: ""+activity+""}).done(function(request) {
      var actividad = request.actividad;
      var referencia = request.referencia;
      var slot1 = request.slot;
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
      
      slot = slot1.nombre;
          
      
      tabla = '<table id="datos" class="tabla2 izquierda">';
      tabla += '<tr><th colspan="6">GENERAL</th></tr>';
      tabla += '<tr><th>Motivo</th><td colspan="5" style="vertical-align: middle;"><input id="motivo" name="motivo" disabled="true" style="width:100%; resize: none; text-align: center; font-size: 18pt; font-weight: bolder;" value="'+motivo+'"></td></tr>';
      tr = '';
      tr += '<tr><th>Fecha</th><td><input id="fecha" name="fecha" type="date" disabled="true" style="width:100%; text-align: center" min="2016-10-01" value='+fecha+'></td>\n\
                 <th>Inicio</th><td><input id="horaInicio" name="horaInicio" disabled="true" type="time" style="width:100%; text-align: center" min="09:00" max="18:00" step="600" value='+horaInicio+'></td>\n\
                 <th>Inicio</th><td><input id="horaFin" name="horaFin" disabled="true" type="time" style="width:100%; text-align: center" min="09:00" max="18:00" step="600" value='+horaFin+'></td>\n\
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
      tr += '<tr><th colspan="6">REFERENCIAS</th></tr>';
      for (var indice in referencia) {
        tr += '<tr>\n\
                <td colspan="3"><a href="referencia.php?idreferencia='+referencia[indice].idreferencias+'">'+referencia[indice].codigo+'</td>\n\
                <td colspan="3" style="text-align:left">'+referencia[indice].resumen+'</td>\n\
              </tr>';
      }
      tr += '<tr><td style="display:none"><input type="text" id="activity" name="activity" value='+activity+'></td></tr>';
      tabla += tr;
      tabla += '</table>';
      formu = '<form name="activity" method="post" action="index.php">';
      formu += tabla;
      formu += '</form>';
      $('#content').html( formu );
    });//** fin del getJSON req1 ***       
  });//*** fin del click ***
    
  //Disparar funcion al hacer clic en el botón actualizar.
  //Se validan todos los campos antes de hacer el submit.
  $("#actualizar").click(function () {
    var seguir = true;
    var inicio = document.getElementById("horaInicio").value;
    var fin = document.getElementById("horaFin").value;
    var motivo = document.getElementById("motivo").value;
    var margen = 40;
    var indiceUser1 = document.getElementById("usuario1").selectedIndex;
    var indiceUser2 = document.getElementById("usuario2").selectedIndex;
    var indiceRol1 = document.getElementById("rol1").selectedIndex;
    var indiceRol2 = document.getElementById("rol2").selectedIndex;
    var usuario1 = document.getElementById("usuario1").value;
    var usuario2 = document.getElementById("usuario2").value;
    var rol1 = document.getElementById("rol1").value;
    var rol2 = document.getElementById("rol2").value;
    var actividad = document.getElementById("activity").value;
    
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
      
    document.getElementById("flagEditar").value = 1;
    
    //Comienzan las validaciones de todos los campos previo al envío de la consulta
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
                } // if no hay margen suficiente
              } // if fin posterior a inicio
            }  // if ingresar fin
          } // if ingresar inicio
        } // if día sabado
      } // if dia domingo
    } // if fecha posterior a la actual     
     
    //En caso de que se valide todo, se prosigue a enviar la consulta con la actualización en base a los parámetros pasados
    //seguir = false; //se pone en false durante las pruebas//
    if (seguir) {
      var url = "data/handleActivity.php";  
      var query = "update actividades set fecha='" + fecha + "', horaInicio='" + inicio + "', horaFin='" + fin + "', motivo='" + motivo + "', usuario1='" + usuario1 + "', usuario2='" + usuario2 + "', rolUsuario1='" + rol1 + "', rolUsuario2='" + rol2 + "'  where idactividades='" + actividad + "'";
      
      $.getJSON(url, {query: ""+query+""}).done(function(request) {
        var resultado = request["resultado"];
        if (resultado === "OK") {
          alert('Registro modificado correctamente!');
        }
        else {
          alert('Hubo un error. Por favor verifique.');
        }
      });
    }
    
  });
  
  //Disparar funcion al hacer clic en el botón eliminar.
  //Esto hace que el registro correspondiente a la actividad pase a estado de inactiva.
  $("#eliminar").click(function () {
    var pregunta = confirm('Está a punto de eliminar el registro. ¿Desea continuar?');
    if (pregunta) {
      var url = "data/handleActivity.php";
      var actividad = document.getElementById("activity").value;
      var query = "update actividades set estado='inactiva' where idactividades='" + actividad + "'";
      
      $.getJSON(url, {query: ""+query+""}).done(function(request) {
        var resultado = request["resultado"];
        if (resultado === "OK") {
          alert('Registro modificado correctamente!');
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
});//*** fin del ready ***



function cambiarEdicion()
  {
  var fuente = document.getElementById("fuente").value;
  var editar = document.getElementById("editar").value;
  
  switch (fuente)
    {
    case "llave":
                 if (editar === "EDITAR")
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
                    document.getElementById("editar").value = "BLOQUEAR";
                    document.getElementById("actualizar").disabled = false;
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
                    document.getElementById("editar").value = "EDITAR";
                    document.getElementById("actualizar").disabled = true;
                    document.getElementById("kcv").disabled = true;
                    document.getElementById("observaciones").disabled = true;
                    document.getElementById("generacion").disabled = true;
                    document.getElementById("accion").disabled = true;
                  }
                 break;
    case "certificado":
                      if (editar === "EDITAR")
                        {
                        document.getElementById("nombreCertificado").disabled = false;
                        document.getElementById("owner").disabled = false;
                        document.getElementById("version").disabled = false;
                        document.getElementById("bandera").disabled = false;
                        document.getElementById("accion").disabled = false;
                        document.getElementById("vencimiento").disabled = false; 
                        document.getElementById("observaciones").disabled = false;
                        document.getElementById("editar").value = "BLOQUEAR";
                        document.getElementById("actualizar").disabled = false;
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
                        document.getElementById("editar").value = "EDITAR";
                        document.getElementById("actualizar").disabled = true;
                      }
                      break;
    case "actividad":
                    if (editar === "EDITAR")
                      {
                      document.getElementById("fecha").disabled = false;
                      document.getElementById("horaInicio").disabled = false;
                      document.getElementById("horaFin").disabled = false;
                      document.getElementById("motivo").disabled = false;
                      document.getElementById("usuario1").disabled = false;
                      document.getElementById("rol1").disabled = false; 
                      document.getElementById("usuario2").disabled = false;
                      document.getElementById("rol2").disabled = false; 
                      document.getElementById("editar").value = "BLOQUEAR";
                      document.getElementById("actualizar").disabled = false;
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
                      document.getElementById("editar").value = "EDITAR";
                      document.getElementById("actualizar").disabled = true;
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
      case "actividad":
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
                                  } // if no hay margen suficiente
                                } // if fin posterior a inicio
                              }  // if ingresar fin
                            } // if ingresar inicio
                          } // if día sabado
                        } // if dia domingo
                      } // if fecha posterior a la actual     
                      break;
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
    // si no se quiere actualizar implica que se quiere eliminar (pasar a estado inactivo).
    // chequeo si se quiere eliminar una actividad o si es una llave/certificado:
    if (fuente === 'actividad')
      {
      if (confirm('¿Confirma la eliminación de la actividad?'))
        {  
        document.getElementById("flagEliminar").value = 1;
        formu.action = 'logbook.php?idactividades=' + actividad;
        seguir = true;
      }
      else seguir = false;
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
/*
function validarActividad()
  {
  var indiceUser1 = document.getElementById("usuario1").selectedIndex;
  var indiceUser2 = document.getElementById("usuario2").selectedIndex;
  var indiceRol1 = document.getElementById("rol1").selectedIndex;
  var indiceRol2 = document.getElementById("rol2").selectedIndex; 
  var inicio = document.getElementById("inicio").value;
  var fin = document.getElementById("fin").value;
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
*/