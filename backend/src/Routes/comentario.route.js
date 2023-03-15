const { Router } = require('express');
const router = Router();

const { getComent, 
  createComent, 
  getComentario, 
  getTodo, 
  deleteComent, 
  updateComent,
  getComentByPost } = require('../Controllers/comentario.controller');

router.route('/')
  .get(getComent)
  .post(createComent)

router.route('/:id')
  .get(getComentario)
  .delete(deleteComent)
  .put(updateComent)

  router.route('/get/:id')
  .get(getComentByPost)

  router.route('/todo/:id')
  .get(getTodo)

module.exports = router;