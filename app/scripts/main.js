'use strict';
$(document).ready(function() {


    $('#form').validate({
        rules: {
            nombre: {
                required: true,
                minlength: 4
            },
            /*           apellidos: {
                required: true
            },
            telefono: {
                required: true,
                digits: true,
                minlength: 9,
                maxlength: 9
            },
            email: {
                required: true,
                email: true,
                remote: 'http://localhost/formularioAjax/validar_email_db.php'
            },
            email2: {
                equalTo: '#email'
            },
            particular: {
                required: true
            },
            empresa: {
                required: true
            },
            nif: {
                required: true
            },
            nombreEmpresa: {
                required: true
            },
            direccion: {
                required: true
            },
            cp: {
                required: true,
                digits: true,
                minlength: 4,
                maxlength: 5
            },
            localidad: {
                required: true
            },
            provincia: {
                required: true
            },
            pais: {
                required: true
            },
            iban: {
                required: true
            },
            pago: {
                required: true
            },
            usuario: {
                required: true,
                minlength: 4
            },
            pass: {
                required: true
            }
            
*/
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
        },

        submitHandler: function(form) {

            var cantidad = ($('input:radio[name=pago]:checked').val());
            if (cantidad == "mensual") {
                alert("Se va a proceder a darle de alta \n Usted a elegido un pago mensualmente \n La cuota es de 50€");
            } else if (cantidad == "trimestral") {
                alert("Se va a proceder a darle de alta \n Usted a elegido un pago trimestralmente \n La cuota es de 140€");
            } else {
                alert("Se va a proceder a darle de alta \n Usted a elegido un pago anualmente \n La cuota es de 550€");
            }
            form.submit();

        }



    });

    //Si el código postal tiene un tamaño de 4 añadimos un 0 delante
    $("#cp").focusout(function() {
        var caracteres = $("#cp").val();
        if (caracteres.length == 4)
            $("#cp").val("0" + caracteres);
    });

    //El campo nombre se rellene automaticamente con nombre y apellidos
    $("#nombre, #apellidos").keyup(function(evento) {
        var nombre = $("#nombre").val();
        var apellidos = $("#apellidos").val();
        $("#nombreEmpresa").val(nombre + " " + apellidos);

    });

    //El campo usuario se rellena automaticamente con el correo electrónico
    $("#email").keyup(function(evento) {
        var user = $("#nombre").val();
        $("#usuario").val(user);

    });


    //los campos cif/nif adecuan su label del  y rellenar campo nombre apartado facturación por defecto
    $("#empresa").click(function(evento) {
        $('#labelnif').text("CIF");
        $("#nombreEmpresa").val("");

    });

    $("#particular").click(function(evento) {
        $('#labelnif').text("NIF");
        var nombre = $("#nombre").val();
        var apellidos = $("#apellidos").val();
        $("#nombreEmpresa").val(nombre + " " + apellidos);

    });


    //los campos nombre/empresa adecuan su label del checked
    $("#empresa").click(function(evento) {
        $('#labelNombreEmpresa').text("Empresa");
    });

    $("#particular").click(function(evento) {
        $('#labelNombreEmpresa').text("Nombre");
    });




});
