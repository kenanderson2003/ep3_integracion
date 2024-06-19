$(document).ready(function() {
    $('#registerForm').submit(function(event) {
        event.preventDefault(); // Evita que se envíe el formulario de manera tradicional

        // Obtener los datos del formulario
        const formData = {
            firstName: $('#firstName').val(),
            lastName: $('#lastName').val(),
            email: $('#email').val(),
            password: $('#password').val()
        };

        // Enviar los datos al servidor usando AJAX
        $.ajax({
            type: 'POST',
            url: 'http://localhost:3000/api/auth/register', // Ajusta la URL según corresponda
            contentType: 'application/json',
            data: JSON.stringify(formData),
            success: function(response) {
                $('#message').html('<p style="color: green;">Usuario creado correctamente</p>');
                // Limpiar el formulario después del éxito
                $('#registerForm')[0].reset();
            },
            error: function(error) {
                $('#message').html('<p style="color: red;">Error al crear usuario</p>');
                console.error('Error:', error);
            }
        });
    });
});
