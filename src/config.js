//Configuración de modulos, Host y Base de Datos

module.exports = {
    HOST: process.env.HOST || 'mongodb+srv://cocoa-user:ingtony35@cluster0.payuk.mongodb.net/cocoa',
    PORT: process.env.PORT || 4000,
    MONGODB_HOST: process.env.MONGODB_HOST || 'cluster0.payuk.mongodb.net',
    MONGODB_DATABASE: process.env.MONGODB_DB || 'baseturno'
}