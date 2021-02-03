const fs = require('fs').promises;
const productsCtrl = {};

///// IMPORTAR MODELOS
const Turn = require("../models/Turn");
let cont = 0

productsCtrl.renderTurns = function(req, res) {
    //res.render("turnos/turnos.ejs", { cont });
    res.json({ok: 'Caja automatizada correctamente', cont:cont})
};

productsCtrl.renderTurnsRei = function(req, res) {
    cont = 0
    res.redirect("/turnos");
};

productsCtrl.renderFecha = function(req, res) {

        let desde = req.query.desde || 0;
        desde = Number(desde);
    
        let hasta = req.query.hasta || 10;
        hasta = Number(hasta);
    
        let fecha_solicitada = req.query.fecha || null;
        let hora_solicitada = req.query.hora || null;
    
        let jsonMijin = "";
        if (fecha_solicitada === null && hora_solicitada === null) {
            jsonMijin = {
    
            }
        }
        if (fecha_solicitada != null && hora_solicitada != null) {
            jsonMijin = {
                fecha: fecha_solicitada,
                hora: hora_solicitada
            }
        }
        if (fecha_solicitada != null && hora_solicitada === null) {
            jsonMijin = {
                fecha: fecha_solicitada
            }
        }
    
        if (hora_solicitada != null && fecha_solicitada === null) {
            jsonMijin = {
                hora: hora_solicitada
            }
        }
    
        Turn
            .find(jsonMijin, 'n_caja fecha hora') // finding all documents
            .skip(desde) // in the first page the value of the skip is 0
            .limit(hasta) // output just 9 items
            .exec((err, Turns) => {
                Turn.estimatedDocumentCount((err, count) => { // count to calculate the number of pages
                    if (err) {
                        return res.status(400).json({
                            ok: false,
                            err: 'No se encuentran mijin, busca bien'
                        })
                    }
                    res.json({
                        Turns
                    })
                });
            });
     

    
};

productsCtrl.renderPagination = (req, res, next) => {
    
    let perPage = 6
    let page = req.params.page || 1;
    Turn
        .find({}) // finding all documents
        .skip((perPage * page) - perPage) // in the first page the value of the skip is 0
        .limit(perPage) // output just 9 items
        .exec((err, turns) => {
            Turn.estimatedDocumentCount((err, count) => { // count to calculate the number of pages
                if (err) {
                    return res.status(400).json({
                        ok: false,
                        err: 'No se encuentran mijin, busca bien'
                    })
                }
  
                res.json({
                    turns
                })
            });
        });
};

productsCtrl.createNewTurn = async(req, res) => {

    console.log('verificacion si entra a crear producto');
    let fecha = new Date()
    let body = req.body.numCaja;
    let newProduct = new Turn({
        numCaja: body,
        fecha: fecha.getDate() + "/" + fecha.getMonth() + 1 + "/" + fecha.getFullYear(),
        hora: fecha.getHours() + ":" + fecha.getMinutes()
    })

    newProduct.save((err, cajaDB) => {
        if (err) {
            res.status(400).json({
                ok: false,
                err
            })
        } else {
            res.json({
                ok: 'Turno guardado exitosamente mijin',
                Caja: cajaDB
            })
        }

    })

};

productsCtrl.deleteTurn = async(req, res) => {
    console.log('entra')


    Turn.findByIdAndDelete(req.params.id, (err, Delete) => {
        if (err) {
            return res.status(400).json({
                ok:'Error mijo vuelve a intentarlo',
                err
            })
        }
        if (Delete === null) {
            return res.status(400).json({
                ok: false,
                error: {
                    msg: 'No se encuentra el turno millo'
                }
            })
        }
        res.json({
            ok: true,
            msg: 'Borrado mijo',
            usuario: Delete
        })
    })

};

///////////// aparte




module.exports = productsCtrl;