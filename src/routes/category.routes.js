const { Router } = require('express');
const routers = Router();
const Category = require('../models/category.model');
const { verifyToken, verifyRol } = require('../middlewares/auth.validations');

// Obtener todas las categorías
routers.get('/', async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json({ data: categories });
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las categorías', error });
  }
});

// Crear nueva categoría
routers.post('/', verifyToken, verifyRol(['admin', 'premium']), async (req, res) => {
  try {
    const { nombre } = req.body;
    const newCategory = new Category({ nombre });
    const savedCategory = await newCategory.save();
    res.status(201).json({ data: savedCategory });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear la categoría', error });
  }
});

module.exports = routers;
