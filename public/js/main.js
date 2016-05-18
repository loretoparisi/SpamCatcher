$(document).ready( function () {
  $("#btnCalcular").click( function () {
	  var value = $('#Land').val();
        $.get("/classify",
          { data: value },
          function (data) {
           $("#resultadoClasificacion").html("<b>Classified as: </b>" + data.result[0][0]["label"] + " (Probability: " + data.result[0][0]["probability"] + ")");          
          },
          'json'
        );
  });
  
  $("#btnLimpiar").click( function () {
	  $('#resultadoClasificacion').html("");
	  $('#Land').val("");
  });
});
