$(document).ready(function () {
  
  /*
   //Disparar funcion al cargar la página:
  $(window).load(function () {
    /*
    var url = "data/handleQuery.php";  
    
    $.getJSON(url, {tabla: "actividades", campos: "idactividades, fecha, motivo", orden: "fecha asc"}, function(request) {
      
      var tabla = '<table class="muestra">';
          tabla += '<th>Id</th> <th>Fecha</th> <th class="detail">Motivo</th>';
      var tr = '';
      for (i = 0; i < request.length; i++){
        var fila = request[i];
        tr += '<tr>';
        tr += '<td>'+fila.idactividades+"</td><td nowrap><a href='#content' id='act_"+fila.idactividades+"'>"+fila.fecha+'</a></td><td>'+fila.motivo+'</td>';
        tr += '</tr>';
      }
          tabla += tr;
          tabla += '</table>';
      $('#selector').html( tabla );
      
    });//*** fin del getJSON ***
  });//*** fin del load ***
  */
   
  //Disparar funcion al hacer clic en el link
  $(".detail").click(function () {
    var url = "data/handleQuery.php";  
    var activity = $(this).attr("id");
    var query = "select * from actividades where estado='activa' and idactividades='"+activity+"'";
    
    $.getJSON(url, {query: ""+query+"", actividad: ""+activity+""}).done(function(request) {
      var actividad = request.actividad;
      var usuario1 = request.usuario1;
      var usuario2 = request.usuario2;
      var referencia = request.referencia;
      var slot1 = request.slot;
            
      fecha = actividad.fecha;
      horaInicio = actividad.horaInicio;
      horaFin = actividad.horaFin;
      motivo = actividad.motivo;
      rol1 = actividad.rolUsuario1;
      rol2 = actividad.rolUsuario2;
      
      user1 = usuario1.nombre + ' ' + usuario1.apellido;
      user2 = usuario2.nombre + ' ' + usuario2.apellido;
      
      slot = slot1.nombre;
      
      $("#selector").css('padding-right', '30px');
      tabla = '<table id="datos" class="tabla2 izquierda">';
      tabla += '<tr><th colspan="6">GENERAL</th></tr>';
      tabla += '<tr><th>Motivo</th> <td colspan="5">'+motivo+'</td></tr>';
      tr = '';
      tr += '<tr><th>Fecha</th><td>'+fecha+'</td><th>Inicio</th><td>'+horaInicio+'</td><th>Fin</th><td>'+horaFin+'</td></tr>';
      tr += '<tr><th colspan="6">USUARIOS</th></tr>';
      tr += '<tr><th colspan="3">Nombre</th><th colspan="3">Rol</th></tr>';
      tr += '<tr><td colspan="3">'+user1+'</td><td colspan="3">'+rol1+'</td></tr>';
      tr += '<tr><td colspan="3">'+user2+'</td><td colspan="3">'+rol2+'</td></tr>';
      tr += '<tr><th colspan="6">REFERENCIAS</th></tr>';
      for (var indice in referencia) {
        tr += '<tr><td colspan="3"><a href="">'+referencia[indice].codigo+'</td><td colspan="3" style="text-align:left">'+referencia[indice].resumen+'</td></tr>';
      }
      tabla += tr;
      tabla += '</table>';
      $('#content').html( tabla );
    });//** fin del getJSON req1 ***       
  });//*** fin del click ***
});//*** fin del ready ***
