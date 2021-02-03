//CREACION DE LA ESTRUCTURA DEL PRODUCTO
const { Schema, model } = require("mongoose");

const ProductSchema = new Schema({
    numCaja: {
        type: String,
        required: true
    },
    fecha:{
        type: String,
        required: true
    },
    hora:{
        type: String,
        required: true
    }

});


module.exports = model("Turn", ProductSchema);