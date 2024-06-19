const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const router = express.Router();

// Ruta para crear un nuevo usuario
router.post('/register', async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'El usuario ya existe' });
        }

        user = new User({
            firstName,
            lastName,
            email,
            password
        });

        await user.save();
        res.status(201).json({ msg: 'Usuario creado correctamente' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error en el servidor');
    }
});

module.exports = router;
