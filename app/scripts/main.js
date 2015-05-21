'use strict'; 
$(document).ready(function () { 
	$("input").prop('required',true);//valida todos los campos del formulario a la vez
    
    $('#form1').validate({
    	rules: {
            nombre: {
                minlength: 4,
            },
            email: {
                email:true,
                remote: 'http://localhost/formularioAjax/validar_email_db.php'
            },
            email2: {
                equalTo: '#email'
            },
            
        },

        messages: {
            nombre: {
                required: 'Debes escribir tu nombre',
                minlength: 'Debes introducir al menos 4 carácteres'
            },
            email: {
                email:'El correo no es válido',
                required: 'Debes escribir tu correo',
                remote: 'El email ya existe'
            },
            email2: {
                equalTo:'El correo debe ser igual al anterior'
            }
        }
    }); 

    $('#form2').validate({


    });


    $('#form3').validate({


    });
});