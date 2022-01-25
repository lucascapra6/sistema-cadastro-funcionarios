const router = require('express')();
const asyncHandler = require('express-async-handler');
const {handle} = require("express/lib/router");
const database = require('../databaseClass')

const atrelarAtividadeFuncionario = asyncHandler((req, res) => {
    const idFuncionario = req.body.idFuncionario
    const idAtividade = req.body.idAtividade
    database.atrelarAtividadesFuncionarios(idAtividade, idFuncionario)
    res.json({resultado:'Atividade atrelada com sucesso'})
})

const mostrarRelacaoFuncionariosAtividades = asyncHandler (async (req, res) => {
const response = await database.relacionarFuncionariosAtividades()
    res.json(response)
})

router.post('/atrelarAtividadeFuncionario', atrelarAtividadeFuncionario)
router.get('/atividadesAtreladasFuncionarios', mostrarRelacaoFuncionariosAtividades)

module.exports = router