const express = require("express");
const cors = require('cors');
const app = express();

// Settings
app.set('port', process.env.PORT || 4000);

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.send("Bienvenido a la api de Xchange")
});

//Body parsing to JSON
var bodyParser = require("body-parser")
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Routes
app.use('/api/usuarios', require('./Routes/usuario.route'));
app.use('/api/publicaciones', require('./Routes/publicacion.route'));
app.use('/api/comentarios', require('./Routes/comentario.route'));

module.exports = app;
