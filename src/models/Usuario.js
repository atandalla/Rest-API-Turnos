const mogoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


let Schema = mogoose.Schema;

let rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol válido'
}

let usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es requerido']
    },
    email: {
        type: String,
        required: [true, 'El e-mail es necesario'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'El password es obligatorio']
    },
    img: {
        type: String,
        required: false
    },
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: rolesValidos
    },
    estado: {
        type:Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});

usuarioSchema.plugin(uniqueValidator, {message: '{PATH} debe ser único'});

usuarioSchema.methods.toJSON = function () {
    let user = this;
    let userObjet = user.toObject();
    delete userObjet.password;

    return userObjet;
}

module.exports = mogoose.model('Usuario', usuarioSchema);