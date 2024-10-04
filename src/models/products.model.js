const mongoose = require("mongoose");

const schema = mongoose.Schema({
    codigo: { type: Number, required: true },
    tipo: { type: String, enum: ['standard', 'premium', 'special'], default: 'standard' },
    nombre: { type: String, required: true },
    precio: { type: Number, required: true },
    stock: { type: Number, required: true },
    imagen: { type: String, required: false },
    categoria: { type: String, default: 'Electronica' },
    descripcion: { type: String, required: true },
    fechaUltimoControl: { type: Date, required: false, default: Date.now } 
});

const productModel = mongoose.model("producto", schema);

module.exports = productModel;
