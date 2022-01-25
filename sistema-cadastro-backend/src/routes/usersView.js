const router = require('express')();
const asyncHandler = require('express-async-handler');
const {handle} = require("express/lib/router");
const database = require('../databaseClass')

const home = asyncHandler(async (req, res) => {
    const response = {message: 'Home'}
    res.json(response);
});

const funcionarios = asyncHandler(async (req, res) => {
    const response = await database.getFuncionarios()
    res.json(response);
});

const criarFuncionario = asyncHandler(async (req, res) => {
    const nomeFuncionario = req.body.funcionario_nome
    const nascimentoFuncionario = req.body.funcionario_nascimento
   await database.adicionarFuncionario(nomeFuncionario, nascimentoFuncionario)
    res.json({response: {nomeFuncionario, nascimentoFuncionario}, message: 'Funcionário criado com sucesso'})

});

const excluirFuncionario = asyncHandler(async (req, res) => {
    const idFuncionario = req.body.funcionario_id
    database.excluirFuncionario(idFuncionario)
    res.json({resultado:'Funcionário excluído com sucesso'})
})

const atualizarFuncionario = asyncHandler(async(req, res) => {
    const idFuncionario = req.body.id
    const nomeAtualizado = req.body.nomeAtualizado
    const nascimentoAtualizado = req.body.nascimentoAtualizado
    database.atualizarFuncionario(idFuncionario, nomeAtualizado, nascimentoAtualizado)
    res.json({resultado:'Funcionário atualizado com sucesso'})
})
const buscarFuncionarioMaiorDeIdade = asyncHandler(async (req,res) => {
    const response = await database.buscarMaiorDeidade()
    res.json(response)
})

router.get('/', home);
router.get('/funcionarios', funcionarios);
router.post('/funcionarios', criarFuncionario)
router.post('/excluirFuncionario', excluirFuncionario)
router.post('/atualizarFuncionario', atualizarFuncionario)
router.get('/funcionarioMaiorDeIdade', buscarFuncionarioMaiorDeIdade)


module.exports = router;

