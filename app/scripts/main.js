'use strict';
$(document).ready(function() {
    $("input").prop('required', true); //valida todos los campos del formulario a la vez

    $('#form').validate({
        rules: {
            nombre: {
                minlength: 4,
            },
            telefono: {
                digits: true,
                minlength: 9,
                maxlength: 9
            },
            email: {
                email: true,
                remote: 'http://localhost/formularioAjax/validar_email_db.php'
            },
            email2: {
                equalTo: '#email'
            },
            cp: {
                digits: true,
                minlength: 4,
                maxlength: 5
            },

        },

        messages: {
            nombre: {
                required: 'Debes escribir tu nombre',
                minlength: 'Debes introducir al menos 4 carácteres'
            },
            email: {
                email: 'El correo no es válido',
                required: 'Debes escribir tu correo',
                remote: 'El email ya existe'
            },
            email2: {
                equalTo: 'El correo debe ser igual al anterior'
            }
        }
    });

    //Si el código postal tiene un tamaño de 4 añadimos un 0 delante
    $("#cp").focusout(function() {
        var caracteres = $("#cp").val();
        if (caracteres.length == 4)
            $("#cp").val("0" + caracteres);
    });

    //
    $("#nombre, #apellidos").keyup(function(evento) {
        var nombre = $("#nombre").val();
        var apellidos = $("#apellidos").val();
        $("#tipoEmpresa").val(nombre + " " + apellidos);

    });


    //los campos cif/nif adecuan su label del  y rellenar campo nombre apartado facturación por defecto
    $("#empresa").click(function(evento) {
        $('#labelnif').text("CIF");
        $("#tipoEmpresa").val("");

    });

    $("#particular").click(function(evento) {
        $('#labelnif').text("NIF");
        var nombre = $("#nombre").val();
        var apellidos = $("#apellidos").val();
        $("#tipoEmpresa").val(nombre + " " + apellidos);

    });


    //los campos nombre/empresa adecuan su label del checked
    $("#empresa").click(function(evento) {
        $('#labelNombreEmpresa').text("Empresa");
    });

    $("#particular").click(function(evento) {
        $('#labelNombreEmpresa').text("Nombre");
    });

});
