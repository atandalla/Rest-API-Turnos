const express = require("express");
const path = require("path");
const methodOverride = require("method-override");
const session = require("express-session"); //Guardar datos de usuarios atravez de una sesion
const morgan = require("morgan");
const connectMongo = require("connect-mongo");
const mongoose = require("mongoose");


// INICIALIZANDO EXPRESS
const app = express();

// SETTINGS Y MOTOR DE EJS - (join_me) -> permite unir directorios- es decir la carpeta views esta aqui.ya que aqui iran los archivos html 
app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "views"));
app.set('view engine', 'ejs');

// SESIONES Y MONGODB
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false })); //Sirve, para recibir datos del usuario, no quiero imagen solo datos por eso el false 
app.use(methodOverride("_method")); //Sirve para que los formularios puedan enviar otros metodos como put o delete.
const MongoStore = connectMongo(session);

app.use(
    session({
        secret: "secret",
        resave: true,
        saveUninitialized: true,
        store: new MongoStore({ mongooseConnection: mongoose.connection }),
    })
);

// app.use(passport.initialize());
// app.use(passport.session());
//session


// ROUTES
// Url o páginas que va acceder el usuario
app.use(require("./routes/index.routes"));
app.use(require("./routes/turns.routes"));
app.use(require("./routes/usuario.routes"));
app.use(require("./routes/login.routes"));

// STATIC FILES
app.use(express.static(path.join(__dirname, "public")));

// ERROR 404
app.use((req, res) => {
    res.render("404");
});

module.exports = app;