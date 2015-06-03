'use strict';
$(document).ready(function() {
  $("h2").click(function(event) {
      alert( $("#particular").prop("checked"));
  });

    $('#form').validate({
        rules: {
            nombre: {
                required: true,
                minlength: 4
            },
            apellidos: {
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
            documento: {
                required: true,
                nifES: function() {
                    if ($("#particular").prop("checked") == true) {
                        return true;

                    } else
                        return false;
                }/*,
                cifES: function() {
                    if ($("#empresa").prop("checked") == true) {
                        return true;
                    } else
                        return false;
                }*/
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
                required: true,
                iban: true
            },
            pago: {
                required: true
            },
            usuario: {
                required: true,
                minlength: 4,
                remote: 'http://localhost/formularioAjax/validar_email_db.php'
            },
            pass: {
                required: true
            }


        },

        messages: {
            nombre: {
                required: 'Debes escribir tu nombre',
                minlength: 'Debes introducir al menos 4 carácteres'
            },
            apellidos: {
                required: 'Debes escribir tus apellidos',
            },
            telefono: {
                required: 'Debes introducir tu número de telefono',
            },
            email: {
                email: 'El correo no es válido',
                required: 'Debes escribir tu correo',
                remote: 'El email ya existe en la base de datos'
            },
            email2: {
                equalTo: 'El correo debe ser igual al anterior'
            },
            nif: {
                required: 'Debes introducir el NIF de tu empresa'
            },
            cif: {
                required: 'Debes introducir el CIF de tu empresa'
            }
        },

        submitHandler: function(form) {

            var cantidad = ($('input:radio[name=pago]:checked').val());
            if (cantidad == "mensual") {
                var c = confirm("Se va a proceder a darle de alta \n Usted a elegido un modo de pago mensual \n La cuota es de 50€");
            } else if (cantidad == "trimestral") {
                var c = confirm("Se va a proceder a darle de alta \n Usted a elegido un modo de pago trimestral \n La cuota es de 140€");
            } else {
                var c = confirm("Se va a proceder a darle de alta \n Usted a elegido un modo de pago anual \n La cuota es de 550€");
            }

            if (c == true) {
                form.submit();
            }
        }

    });

    //NIF
    $.validator.addMethod("nifES", function(value) {
        value = value.toUpperCase();

        // Basic format test
        if (!value.match("((^[A-Z]{1}[0-9]{7}[A-Z0-9]{1}$|^[T]{1}[A-Z0-9]{8}$)|^[0-9]{8}[A-Z]{1}$)")) {
            return false;
        }

        // Test NIF
        if (/^[0-9]{8}[A-Z]{1}$/.test(value)) {
            return ("TRWAGMYFPDXBNJZSQVHLCKE".charAt(value.substring(8, 0) % 23) === value.charAt(8));
        }
        // Test specials NIF (starts with K, L or M)
        if (/^[KLM]{1}/.test(value)) {
            return (value[8] === String.fromCharCode(64));
        }

        return false;

    }, "Por favor introduce un número de NIF válido.");

    //CIF
    $.validator.addMethod("cifES", function(value) {
        var num = [],
            controlDigit, sum, i, count, tmp, secondDigit;

        value = value.toUpperCase();

        // Quick format test
        if (!value.match("((^[A-Z]{1}[0-9]{7}[A-Z0-9]{1}$|^[T]{1}[A-Z0-9]{8}$)|^[0-9]{8}[A-Z]{1}$)")) {
            return false;
        }

        for (i = 0; i < 9; i++) {
            num[i] = parseInt(value.charAt(i), 10);
        }

        // Algorithm for checking CIF codes
        sum = num[2] + num[4] + num[6];
        for (count = 1; count < 8; count += 2) {
            tmp = (2 * num[count]).toString();
            secondDigit = tmp.charAt(1);

            sum += parseInt(tmp.charAt(0), 10) + (secondDigit === "" ? 0 : parseInt(secondDigit, 10));
        }

        /* The first (position 1) is a letter following the following criteria:
         *  A. Corporations
         *  B. LLCs
         *  C. General partnerships
         *  D. Companies limited partnerships
         *  E. Communities of goods
         *  F. Cooperative Societies
         *  G. Associations
         *  H. Communities of homeowners in horizontal property regime
         *  J. Civil Societies
         *  K. Old format
         *  L. Old format
         *  M. Old format
         *  N. Nonresident entities
         *  P. Local authorities
         *  Q. Autonomous bodies, state or not, and the like, and congregations and religious institutions
         *  R. Congregations and religious institutions (since 2008 ORDER EHA/451/2008)
         *  S. Organs of State Administration and regions
         *  V. Agrarian Transformation
         *  W. Permanent establishments of non-resident in Spain
         */
        if (/^[ABCDEFGHJNPQRSUVW]{1}/.test(value)) {
            sum += "";
            controlDigit = 10 - parseInt(sum.charAt(sum.length - 1), 10);
            value += controlDigit;
            return (num[8].toString() === String.fromCharCode(64 + controlDigit) || num[8].toString() === value.charAt(value.length - 1));
        }

        return false;

    }, "Please specify a valid CIF number.");


    //contraseña fuerte
    var options = {};
    options.common = {
        onLoad: function() {
            $('#messages').text('Start typing password');
        },
        onKeyUp: function(evt, data) {
            $("#length-help-text").text("Current length: " + $(evt.target).val().length + " and score: " + data.score);
        }
    };
    $('#pass').pwstrength(options);


    //Código Postal
    $("#cp").focusout(function() {
        var caracteres = $("#cp").val();
        if (caracteres.length == 4)
            $("#cp").val("0" + caracteres);
    });

    //El campo usuario se rellena automaticamente con el correo electrónico
    $("#email").keyup(function(evento) {
        var user = $("#email").val();
        $("#usuario").val(user);

    });

    //El campo nombre se rellene automaticamente con nombre y apellidos
    $("#nombre, #apellidos").keyup(function(evento) {
        var nombre = $("#nombre").val();
        var apellidos = $("#apellidos").val();
        $("#nombreEmpresa").val(nombre + " " + apellidos);

    });


    //los campos cif/nif adecuan su label del  y rellenar campo nombre apartado facturación por defecto
    $("#empresa").click(function(evento) {
        $('#labeldocumento').text("CIF");
        $("#nombreEmpresa").val("");

    });

    $("#particular").click(function(evento) {
        $('#labeldocumento').text("NIF");
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


    //IBAN
    $.validator.addMethod("iban", function(value, element) {
        // some quick simple tests to prevent needless work
        if (this.optional(element)) {
            return true;
        }

        // remove spaces and to upper case
        var iban = value.replace(/ /g, "").toUpperCase(),
            ibancheckdigits = "",
            leadingZeroes = true,
            cRest = "",
            cOperator = "",
            countrycode, ibancheck, charAt, cChar, bbanpattern, bbancountrypatterns, ibanregexp, i, p;

        if (!(/^([a-zA-Z0-9]{4} ){2,8}[a-zA-Z0-9]{1,4}|[a-zA-Z0-9]{12,34}$/.test(iban))) {
            return false;
        }

        // check the country code and find the country specific format
        countrycode = iban.substring(0, 2);
        bbancountrypatterns = {
            "AL": "\\d{8}[\\dA-Z]{16}",
            "AD": "\\d{8}[\\dA-Z]{12}",
            "AT": "\\d{16}",
            "AZ": "[\\dA-Z]{4}\\d{20}",
            "BE": "\\d{12}",
            "BH": "[A-Z]{4}[\\dA-Z]{14}",
            "BA": "\\d{16}",
            "BR": "\\d{23}[A-Z][\\dA-Z]",
            "BG": "[A-Z]{4}\\d{6}[\\dA-Z]{8}",
            "CR": "\\d{17}",
            "HR": "\\d{17}",
            "CY": "\\d{8}[\\dA-Z]{16}",
            "CZ": "\\d{20}",
            "DK": "\\d{14}",
            "DO": "[A-Z]{4}\\d{20}",
            "EE": "\\d{16}",
            "FO": "\\d{14}",
            "FI": "\\d{14}",
            "FR": "\\d{10}[\\dA-Z]{11}\\d{2}",
            "GE": "[\\dA-Z]{2}\\d{16}",
            "DE": "\\d{18}",
            "GI": "[A-Z]{4}[\\dA-Z]{15}",
            "GR": "\\d{7}[\\dA-Z]{16}",
            "GL": "\\d{14}",
            "GT": "[\\dA-Z]{4}[\\dA-Z]{20}",
            "HU": "\\d{24}",
            "IS": "\\d{22}",
            "IE": "[\\dA-Z]{4}\\d{14}",
            "IL": "\\d{19}",
            "IT": "[A-Z]\\d{10}[\\dA-Z]{12}",
            "KZ": "\\d{3}[\\dA-Z]{13}",
            "KW": "[A-Z]{4}[\\dA-Z]{22}",
            "LV": "[A-Z]{4}[\\dA-Z]{13}",
            "LB": "\\d{4}[\\dA-Z]{20}",
            "LI": "\\d{5}[\\dA-Z]{12}",
            "LT": "\\d{16}",
            "LU": "\\d{3}[\\dA-Z]{13}",
            "MK": "\\d{3}[\\dA-Z]{10}\\d{2}",
            "MT": "[A-Z]{4}\\d{5}[\\dA-Z]{18}",
            "MR": "\\d{23}",
            "MU": "[A-Z]{4}\\d{19}[A-Z]{3}",
            "MC": "\\d{10}[\\dA-Z]{11}\\d{2}",
            "MD": "[\\dA-Z]{2}\\d{18}",
            "ME": "\\d{18}",
            "NL": "[A-Z]{4}\\d{10}",
            "NO": "\\d{11}",
            "PK": "[\\dA-Z]{4}\\d{16}",
            "PS": "[\\dA-Z]{4}\\d{21}",
            "PL": "\\d{24}",
            "PT": "\\d{21}",
            "RO": "[A-Z]{4}[\\dA-Z]{16}",
            "SM": "[A-Z]\\d{10}[\\dA-Z]{12}",
            "SA": "\\d{2}[\\dA-Z]{18}",
            "RS": "\\d{18}",
            "SK": "\\d{20}",
            "SI": "\\d{15}",
            "ES": "\\d{20}",
            "SE": "\\d{20}",
            "CH": "\\d{5}[\\dA-Z]{12}",
            "TN": "\\d{20}",
            "TR": "\\d{5}[\\dA-Z]{17}",
            "AE": "\\d{3}\\d{16}",
            "GB": "[A-Z]{4}\\d{14}",
            "VG": "[\\dA-Z]{4}\\d{16}"
        };

        bbanpattern = bbancountrypatterns[countrycode];
        // As new countries will start using IBAN in the
        // future, we only check if the countrycode is known.
        // This prevents false negatives, while almost all
        // false positives introduced by this, will be caught
        // by the checksum validation below anyway.
        // Strict checking should return FALSE for unknown
        // countries.
        if (typeof bbanpattern !== "undefined") {
            ibanregexp = new RegExp("^[A-Z]{2}\\d{2}" + bbanpattern + "$", "");
            if (!(ibanregexp.test(iban))) {
                return false; // invalid country specific format
            }
        }

        // now check the checksum, first convert to digits
        ibancheck = iban.substring(4, iban.length) + iban.substring(0, 4);
        for (i = 0; i < ibancheck.length; i++) {
            charAt = ibancheck.charAt(i);
            if (charAt !== "0") {
                leadingZeroes = false;
            }
            if (!leadingZeroes) {
                ibancheckdigits += "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ".indexOf(charAt);
            }
        }

        // calculate the result of: ibancheckdigits % 97
        for (p = 0; p < ibancheckdigits.length; p++) {
            cChar = ibancheckdigits.charAt(p);
            cOperator = "" + cRest + "" + cChar;
            cRest = cOperator % 97;
        }
        return cRest === 1;
    }, "Please specify a valid IBAN");

   /* $.extend($.validator.messages, {
        required: "Este campo es obligatorio.",
        remote: "Por favor, rellena este campo.",
        email: "Por favor, escribe una dirección de correo válida.",
        url: "Por favor, escribe una URL válida.",
        date: "Por favor, escribe una fecha válida.",
        dateISO: "Por favor, escribe una fecha (ISO) válida.",
        number: "Por favor, escribe un número válido.",
        digits: "Por favor, escribe sólo dígitos.",
        creditcard: "Por favor, escribe un número de tarjeta válido.",
        equalTo: "Por favor, escribe el mismo valor de nuevo.",
        extension: "Por favor, escribe un valor con una extensión aceptada.",
        maxlength: $.validator.format("Por favor, no escribas más de {0} caracteres."),
        minlength: $.validator.format("Por favor, no escribas menos de {0} caracteres."),
        rangelength: $.validator.format("Por favor, escribe un valor entre {0} y {1} caracteres."),
        range: $.validator.format("Por favor, escribe un valor entre {0} y {1}."),
        max: $.validator.format("Por favor, escribe un valor menor o igual a {0}."),
        min: $.validator.format("Por favor, escribe un valor mayor o igual a {0}."),
        nifES: "Por favor, escribe un NIF válido.",
        nieES: "Por favor, escribe un NIE válido.",
        cifES: "Por favor, escribe un CIF válido."
    });*/


});
