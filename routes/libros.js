const express = require('express');
const router = express.Router();

const Libro = require('../models/Libro');

// Ruta para obtener todos los libros
router.get('/', async(req, res) => {
    try{
        const libros = await Libro.find();
        res.json(libros);
    }catch(error){
        res.status(500).json({
            error : "Error al obtener los libros"
        })
    }
})

//Ruta para crear un nuevo Libro
router.post('/', async (req, res) => {
    try {
        const nuevoLibro = new Libro(req.body);
        const libroGuardado = await nuevoLibro.save();
        res.status(201).json(libroGuardado);
    } catch (error) {
        res.status(500).json({
            error: "Error al crear un nuevo libro"
        });
    }
});

//Ruta para actualizar un Libro existente
router.put('/:id', async (req, res) => {
    try{
        const Libro = await Libro.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });

        res.json(Libro);
    }catch(error){
        res.status(500).json({
            error: "Error al actualizar el Libro: " + req.params.id
        });
    }
})

//Ruta para eliminar un Libro
router.delete('/:id', async (req, res) => {
    try{
        await Libro.findByIdAndDelete(req.params.id);
        res.json({
            message: 'Libro eliminado correctamente'
        });
    }catch(error){
        res.status(500).json({
            error: 'Error al eliminar el libro: '+ req.params.id
        });
    }
})

module.exports = router;