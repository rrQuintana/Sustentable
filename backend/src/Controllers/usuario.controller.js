const usuarioCtrl = {};
const Usuario = require("../Models/usuario.model");
const Publicacion = require("../Models/publicacion.model");
const Comentario = require("../Models/comentario.model");

///////////////////////////////[ CRUD DE USUARIOS ]////////////////////////////////////

//Extraer todos los usuarios registrados
usuarioCtrl.getUser = async (req, res) => {
  const usuarios = await Usuario.find();
  res.json(usuarios);
};

//Crear un usuario
usuarioCtrl.createUser = async (req, res) => {
  const {
    nombre,
    apellido,
    foto,
    email,
    password,
    telefono,
    direccion,
    contacto,
    calificacion,
    reportes,
    estatus,
  } = req.body;
  const newUser = new Usuario({
    nombre: nombre,
    apellido: apellido,
    foto: foto,
    email: email,
    password: password,
    telefono: telefono,
    direccion: direccion,
    contacto: contacto,
    calificacion: calificacion,
    reportes: reportes,
    estatus: estatus,
  });
  await newUser.save();
  res.json({ message: "Usuario creado: ", newUser });
};

//Obtener datos de un usuario por id
usuarioCtrl.getUsuarioById = async (req, res) => {
  const usuario = await Usuario.findById(req.params.id);
  res.json(usuario);
};

//Obtener datos de un usuario por email
usuarioCtrl.getUsuario = async (req, res) => {
  const usuario = await Usuario.findOne({ email: req.params.email });
  res.json(usuario);
};

//Borrar un usuario
usuarioCtrl.deleteUser = async (req, res) => {
  await Usuario.findByIdAndDelete(req.params.id);
  res.json({ message: "Usuario eliminado" });
};

//Actualizar un usuario
usuarioCtrl.updateUser = async (req, res) => {
  const {
    nombre,
    apellido,
    foto,
    email,
    password,
    telefono,
    direccion,
    contacto,
    calificacion,
    reportes,
    estatus,
  } = req.body;
  await Usuario.findByIdAndUpdate(req.params.id, {
    nombre: nombre,
    apellido: apellido,
    foto: foto,
    email: email,
    password: password,
    telefono: telefono,
    direccion: direccion,
    contacto: contacto,
    calificacion: calificacion,
    reportes: reportes,
    estatus: estatus,
  });
  res.json({ message: "Usuario actualizado" });
};

///////////////////////////////[ RELACIONES DE USUARIOS ]////////////////////////////////////

//Obtener publicaciones de un usuario
usuarioCtrl.getUsuarioPublicaciones = (req, res) => {
  Publicacion.find({ autor: req.params.id })
    .populate("autor")
    .exec((err, publicaciones) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(200).json(publicaciones);
    });
};

//Obtener comentarios de un usuario
usuarioCtrl.comentariosPersona = (req, res) => {
  const idPersona = req.params.id;

  Comentario.find({ persona: idPersona })
    .populate("publicacion")
    .exec((err, comentarios) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(200).json(comentarios);
    });
};

usuarioCtrl.addReporte = async (req, res) => {
  const idUsuario = req.params.idUsuario;
  const idComentario = req.params.idComentario;

  const usuario = await Usuario.findById(idUsuario);
  if (!usuario) {
    return res.status(404).json({ error: 'Usuario no encontrado' });
  }

  usuario.reportes += 1;
  usuario.save((err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: "Reporte agregado a usuario" });
  });
}


module.exports = usuarioCtrl;
