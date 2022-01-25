const Client = require('pg').Client
const bancoConection = new Client({
    user: "postgres",
    password: "Doboldo123",
    host: "localhost",
    port: "8080",
    database: "funcionarios"
})

class DatabaseClass {
    constructor() {
        bancoConection.connect().then(() => {
            console.log('conectou ao banco')
        })
    }

    async getFuncionarios() {
        try {
            const resultado = await bancoConection.query("select * from funcionarios")
            return resultado.rows
        } catch (ex) {
            console.log(`Ocorreu um erro. Erro: ${ex}`)
        }
    }

    async adicionarFuncionario(nome, nascimento) {
        try {
            await bancoConection.query(`insert into funcionarios(funcionario_nome, funcionario_nascimento) values('${nome}', '${nascimento}')`)
        } catch (ex) {
            console.log(`Ocorreu um erro. Erro: ${ex}`)
        }
    }

    async excluirFuncionario(id) {
        try {
            await bancoConection.query(`delete from funcionarios where funcionario_id = ${id}`)

        } catch (ex) {
            console.log(`Ocorreu um erro. Erro: ${ex}`)
        }
    }

    async atualizarFuncionario(id, nomeAtualizado, nascimentoAtualizado) {
        try {
            await bancoConection.query(`update funcionarios set funcionario_nome = '${nomeAtualizado}', funcionario_nascimento = '${nascimentoAtualizado}' where funcionario_id = ${id}`)
        } catch (ex) {
            console.log(`Ocorreu um erro. Erro: ${ex}`)
        }
    }
    async buscarMaiorDeidade() {
        try {
            const resultado = await bancoConection.query("select funcionario_id, funcionario_nome, funcionario_nascimento, extract(year from age(funcionarios.nascimento)) > 18 as maior_de_idade from funcionarios")
            const resultadoRows = resultado.rows
            return (resultadoRows.filter((element) => {
                return element.maior_de_idade === true
            }))
        }
        catch {
            console.log(`Ocorreu um erro. Erro: ${ex}`)
        }
    }
    ///////////////////////////////////////ATIVIDADES/////////////////////////////////////////////
    async getAtividades() {
        try {
            const resultado = await bancoConection.query('select * from atividades')
            return resultado.rows
        }
        catch(ex) {
            console.log(`Ocorreu um erro. Erro: ${ex}`)
        }
    }
    async cadastrarAtividade(atividade, descricao) {
        try {
            await bancoConection.query(`insert into atividades(atividade_nome, atividade_descricao) values('${atividade}', '${descricao}')`)
        }
        catch (ex) {
            console.log(`Ocorreu um erro. Erro: ${ex}`)
        }
    }
    async excluirAtividade(id) {
        try {
            await bancoConection.query(`delete from atividades where atividade_id = ${id}`)
        }
        catch (ex) {
            console.log(`Ocorreu um erro. Erro: ${ex}`)
        }
    }
    async atualizarAtividade(id, atividadeAtualizada, descricaoAtualizada) {
        await bancoConection.query(`update atividades set atividade_nome = '${atividadeAtualizada}', atividade_descricao = '${descricaoAtualizada}' where atividade_id = '${id}'`)
    }
    //////////////////////////////////////////ATRELAR////////////////////////////////////////////
    async atrelarAtividadesFuncionarios(idAtividade, idFuncionario) {
        await bancoConection.query(`update funcionarios set id_atividade = ${idAtividade} where funcionario_id = ${idFuncionario}`)
    }

    async relacionarFuncionariosAtividades() {
        const resultado = await bancoConection.query('select * from funcionarios inner join atividades on atividades.atividade_id = funcionarios.id_atividade')
        console.log(resultado.rows)
        return resultado.rows
    }
}


module.exports = new DatabaseClass