const jwt = require('jsonwebtoken')
// Verificar Token 

let verificaToken = (req,res,next)=>{
    let token = req.get('token');
    
    jwt.verify(token, 'esta-es-mi-clave-chamother', (err, decoded)=>{
        if (err){
            return res.status(401).json({
                ok:false
            })
        }
        req.usuario = decoded.usuario;
        next();
    })
}

module.exports = {
    verificaToken
}