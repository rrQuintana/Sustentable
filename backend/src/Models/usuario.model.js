const { Schema, model } = require('mongoose');

const usuarioSchema = new Schema({
    nombre: String,
    apellido: String,
    telefono: Number,
    email: String,
    direccion: String,
    contacto: String,
    foto: String,
    calificacion: String,
    reportes: Number, //reportes = reportes + 1
    estatus: Number, // 0: Admin, 1: Activo, 2: Vendedor 3: Inactivo
},
{
    timestamps: true,
});

module.exports = model('Usuario', usuarioSchema);