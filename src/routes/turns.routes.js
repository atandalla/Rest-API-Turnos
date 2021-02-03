const express = require("express");
const router = express.Router();

// Controller
const {

    createNewTurn,
    renderTurns,
    renderPagination,
    deleteTurn,
    renderTurnsRei,
    renderFecha

} = require("../controllers/turn.controller");

const {verificaToken} = require('../middlewares/autenticacion');

//////////////////// NUEVO TURNO //////////////////// 
router.get("/turnos", verificaToken, renderTurns);
router.get("/turnosR", verificaToken, renderTurnsRei);

///REPORTES POR FECHA 
router.get("/reporteFecha", verificaToken, renderFecha);

///REPORTES TURNOS GENERALES
router.get("/reporteTurnos/:page", verificaToken, renderPagination);

// POST PARA LA CREACION DEL NUEVO TURNO
router.post("/reporte/nuevoTurno", verificaToken, createNewTurn);

//ELIMINAR TURNO
router.delete("/reporte/deleteTurno/:id", verificaToken, deleteTurn);

module.exports = router;