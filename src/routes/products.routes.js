const { Router } = require('express');
const productModel = require('../models/products.model.js');
const { verifyToken, verifyRol } = require('../middlewares/auth.validations');
const config = require('../common/config.js');
const router = Router();
const mongoDBIdRegex = /^[0-9a-fA-F]{24}$/;

const acceptedFields = [
    { name: 'codigo', type: 'number' },
    { name: 'tipo', type: 'string' },
    { name: 'nombre', type: 'string' },
    { name: 'precio', type: 'number' },
    { name: 'stock', type: 'number' },
    { name: 'imagen', type: 'string' },
    { name: 'categoria', type: 'string'},
    { name: 'descripcion', type: 'string'},
    { name: 'fechaUltimoControl', type: 'string' } 
];
const requiredFields = [
    { name: 'codigo', type: 'number' },
    { name: 'nombre', type: 'string' },
    { name: 'precio', type: 'number' },
    { name: 'stock', type: 'number' },
    { name: 'categoria', type: 'string'},
    { name: 'descripcion', type: 'string'}
];

const validateId = (req, res, next) => {
    if (!mongoDBIdRegex.test(req.params.id)) return res.status(400).send({ server: config.SERVER, data: 'Formato de ID no válido' });
    
    next();
};

const extractFields = (req, res, next) => {
    req.extractedBody = {};
    acceptedFields.forEach(field => {
        if (req.body.hasOwnProperty(field.name) && typeof(req.body[field.name]) === field.type) {
            req.extractedBody[field.name] = req.body[field.name];
        }
    });
    
    next();
}


// El endpoint GET queda "abierto"
router.get('/', async (req, res) => {
    try {
        // const products = await productModel.find({}, '-codigo -imagen').lean();
        const products = await productModel.find({}).lean();
        res.status(200).send({ server: config.SERVER, data: products });
    } catch (err) {
        res.status(500).send({ server: config.SERVER, data: `ERROR al recuperar productos (código 23)` });
    }
});

router.post('/', verifyToken, verifyRol(['admin', 'premium']), async (req, res) => {
    try {
        let fieldsOk = requiredFields.every(field => req.body.hasOwnProperty(field.name) && typeof(req.body[field.name]) === field.type);
        if (!fieldsOk) return res.status(400).send({ server: config.SERVER, data: `Faltan campos obligatorios o no coinciden formatos (codigo, nombre, precio, stock)` });

        const { codigo, nombre, precio, stock, tipo, imagen, categoria, descripcion, fechaUltimoControl } = req.body;

        const existingProduct = await productModel.findOne({ $or: [{ codigo }, { nombre }] });
        if (existingProduct) {
            return res.status(400).send({ server: config.SERVER, data: 'El producto con el mismo código o nombre ya existe' });
        }

        const process = await productModel.create({ codigo, nombre, precio, stock, tipo, imagen, categoria, descripcion, fechaUltimoControl });
        res.status(200).send({ server: config.SERVER, data: process });
    } catch (err) {
        res.status(500).send({ server: config.SERVER, data: `ERROR al cargar nuevo producto (código 21)` });
    }
});

router.put('/:id', verifyToken, verifyRol(['admin']), validateId, extractFields, async (req, res) => {
    try {
        const filter = { _id: req.params.id };
        const update = req.extractedBody; 
        const options = { new: true };    
        const process = await productModel.findOneAndUpdate(filter, update, options);
        
        res.status(200).send({ server: config.SERVER, data: process });

    } catch (err) {
        res.status(500).send({ server: config.SERVER, data: `ERROR al modificar producto (código 20)` });
    }
});

router.delete('/:id', verifyToken, verifyRol(['admin']), validateId, async (req, res) => {
    try {
        if (mongoDBIdRegex.test(req.params.id)) {
            const filter = { _id: req.params.id };
            const process = await productModel.findOneAndDelete(filter);
            res.send({ server: config.SERVER, data: process });
        } else {
            res.status(400).send({ server: config.SERVER, data: 'Formato de ID no válido' });
        }
    } catch (err) {
        res.status(500).send({ server: config.SERVER, data: `ERROR al modificar producto (código 20)` });
    }
});

router.get('/codigo/:codigo', async (req, res) => {
    try {
        const product = await productModel.findOne({ codigo: req.params.codigo }).lean();
        if (!product) {
            return res.status(404).send({ server: config.SERVER, data: 'Producto no encontrado' });
        }
        res.status(200).send({ server: config.SERVER, data: product });
    } catch (err) {
        res.status(500).send({ server: config.SERVER, data: `ERROR al recuperar producto (código 24)` });
    }
});

module.exports = router;
