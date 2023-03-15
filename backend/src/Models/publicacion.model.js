const { Schema, model } = require('mongoose');

const publicacionSchema = new Schema({
    titulo: { type: String, },
    contenido: { type: String },
    foto: { type: String },
    categoria: { type: String },
    precio: { type: String },
    reportes: { type: Number, },
    autor: { type: Schema.Types.ObjectId, ref: 'Usuario', },
},
{
    timestamps: true
});

module.exports = model('Publicacion', publicacionSchema);