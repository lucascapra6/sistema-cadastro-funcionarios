const router = require('express')();
const asyncHandler = require('express-async-handler');
const {handle} = require("express/lib/router");
const database = require('../databaseClass')

const atividades = asyncHandler(async(req, res) => {
    const response =  await database.getAtividades()
    res.json(response)
})
const cadastrarAtividade = asyncHandler(async(req,res) => {
    const atividade = req.body.atividade_nome
    const descricao = req.body.atividade_descricao
    await database.cadastrarAtividade(atividade, descricao)
    res.json({resultado: 'Atividade cadastrada com sucesso'})
})
const excluirAtividade = asyncHandler(async(req, res) => {
    const id = req.body.atividade_id
    await database.excluirAtividade(id)
    res.json({resultado:'Atividade excluída com sucesso'})
})
const atualizarAtividade = asyncHandler(async(req, res) => {
    const id = req.body.id
    const atividadeAtualizada = req.body.atividadeAtualizada
    const descricaoAtualizada = req.body.descricaoAtualizada
    await database.atualizarAtividade(id, atividadeAtualizada, descricaoAtualizada)
    res.json({response: {atividadeAtualizada, descricaoAtualizada}})
})

router.get('/atividades', atividades)
router.post('/atividades', cadastrarAtividade)
router.post('/excluirAtividade', excluirAtividade)
router.post('/atualizarAtividade', atualizarAtividade)

module.exports = router