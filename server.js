const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors'); // Importar el módulo cors

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors()); // Configurar CORS para permitir solicitudes desde el frontend

// Conectar a MongoDB sin opciones obsoletas
mongoose.connect('mongodb://localhost:27017/authdb')
    .then(() => console.log('MongoDB conectado'))
    .catch(err => console.error('Error al conectar con MongoDB:', err));

// Configurar Express para servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Rutas
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

// Ruta para manejar el inicio de sesión
app.post('/api/auth/login', (req, res) => {
    const { email, password } = req.body;

    // Aquí deberías incluir la lógica para verificar las credenciales
    // Por ejemplo, consulta a la base de datos, etc.

    // Ejemplo básico de autenticación (reemplaza con tu lógica real)
    if (email === 'usuario@example.com' && password === 'password') {
        // Usuario autenticado correctamente
        res.json({ msg: 'Inicio de sesión exitoso' });
    } else {
        // Error de autenticación
        res.status(401).json({ msg: 'Credenciales incorrectas' });
    }
});

// Manejador para manejar errores de ruta no encontrada
app.use((req, res, next) => {
    res.status(404).send('Ruta no encontrada');
});

// Manejador de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Error en el servidor');
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});
