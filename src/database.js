//IMPORTANDO MODULOS DE CONFIG Y CREANDO LA BASE DE DATOS EN MONGODB
const mongoose = require("mongoose");
const config = require("./config");

const MONGODB_URI = `mongodb+srv://cocoa-user:ingtony35@cluster0.payuk.mongodb.net/cocoa`;

mongoose
    .connect(MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
    })
    .then((db) => console.log("Mongodb is connected to", db.connection.host))
    .catch((err) => console.error(err));