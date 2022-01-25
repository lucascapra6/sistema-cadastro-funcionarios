<template>
  <section>
    <div class="lista-de-funcionarios">
      <div class="space-between lista-de-funcionarios-container">
        <div class="flex cabecalho">
          <p class="nome">Nome</p>
          <p class="nascimento">Nascimento</p>
          <p class="funcao">Funcao</p>
          <p class="opcoes">Opções</p>
        </div>
        <ul v-for="(funcionario, index) in funcionarios" :key="index">
          <div class="flex">
            <li class="nome">{{ funcionario.funcionario_nome}}</li>
            <li class="idade">{{ funcionario.funcionario_nascimento | formatDate(funcionario.funcionario_nascimento) }}</li>
            <li class="funcao">Funcao</li>
            <div class="gerenciar-funcionarios">
              <button @click="abrirModalEditar(index)" class="editar">Editar</button>
              <button @click="excluirFuncionario(index)" class="excluir">X</button>
            </div>
          </div>
        </ul>
        <transition>
          <div v-show="modalAberto" class="modal-update">
            <h1>Atualizar dados:</h1>
            <div @click="modalAberto = false" class="btn-fechar-modal">X</div>
            <div class="inserir-dados">
              <label>Nome: <input type="text" v-model="nomeAtualizado"></label>
              <label>Data de Nascimento: <input type="date" v-model="nascimentoAtualizado"></label>
            </div>
            <button class="atualizar-btn" @click="editarDadosFuncionario()">Atualizar</button>
          </div>
        </transition>
      </div>
    </div>
  </section>

</template>
<script>
const axios = require('axios')
export default {
  data() {
    return {
      funcionarios: [],
      nomeAtualizado: null,
      nascimentoAtualizado: null,
      modalAberto: false,
      idFuncionarioSelecionado: null,
      dataFormatada:null
    }
  },
  methods: {
    async listarFuncionarios() {
      try {
        const response = await fetch('http://localhost:3000/funcionarios')
        this.funcionarios = await response.json()
      } catch (error) {
        console.error(error)
      }
    },
    cleanData() {
      this.nomeAtualizado = null
      this.nascimentoAtualizado = null
    },
    async excluirFuncionario(index) {
      const idFuncionario = this.funcionarios[index].funcionario_id
      const response = await axios.post('http://localhost:3000/excluirFuncionario', {
        funcionario_id: idFuncionario
      })
      this.listarFuncionarios()
      return response
    },
    abrirModalEditar(index) {
      this.modalAberto = true
      this.idFuncionarioSelecionado = this.funcionarios[index].funcionario_id
      this.nomeAtualizado = this.funcionarios[index].funcionario_nome
      this.nascimentoAtualizado = this.formatDate(this.funcionarios[index].funcionario_nascimento)
    },
    async editarDadosFuncionario() {
      const response = await axios.post('http://localhost:3000/atualizarFuncionario', {
        id: this.idFuncionarioSelecionado,
        nomeAtualizado: this.nomeAtualizado,
        nascimentoAtualizado: this.nascimentoAtualizado
      })
      this.listarFuncionarios()
      this.cleanData()
      this.modalAberto = false
      return response
    },
    formatDate(input) {
      let datePart = input.match(/\d+/g),
          year = datePart[0].substring(0), // get only two digits
          month = datePart[1], day = datePart[2];
      return day + '/' + month + '/' + year;
    }
  },
  filters: {
    formatDate(input) {
      let datePart = input.match(/\d+/g),
          year = datePart[0].substring(0), // get only two digits
          month = datePart[1], day = datePart[2];
      return day + '/' + month + '/' + year;
    }
  },
  created() {
    this.listarFuncionarios()
  }
}
</script>

<style>
.flex {
  display: flex;
}

.space-between {
  justify-content: space-between;
}

.lista-de-funcionarios .nome {
  padding-left: 20px;
  width: 30vw;
}

.lista-de-funcionarios-container ul {
  list-style: none;
  margin-top: 10px;
}

.lista-de-funcionarios {
  display: flex;
}

.gerenciar-funcionarios {
  display: flex;
  justify-content: end;
  width: 10vw;
  padding-right: 20px;
}

.idade {
  width: 20vw;
  text-align: center;
}

.funcao {
  width: 30vw;
}

button {
  margin: 0 5px;
  width: 40px;
  height: 20px;
}

.modal-update {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 50vw;
  height: 30vw;
  background: aliceblue;
  border: 1px solid black;
  box-shadow: 6px 6px 2px rgba(0, 0, 0, 0.20);
  position: absolute;
  bottom: 15px;
  left: 300px;
}

.modal-update h1 {
  padding-top: 20px;
}

.modal-update input {
  display: inline;
  width: 100%;
}

.inserir-dados {
  padding-top: 40px;
}

.atualizar-btn {
  width: 100px;
}

.btn-fechar-modal {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 5px;
  right: 10px;
  border: 1px solid black;
  width: 25px;
  height: 25px;
  cursor: pointer;
}
.cabecalho {
justify-content: space-between;
}
.cabecalho .nome {
  padding-left: 50px;
  background: grey;
  width: 200px;
  text-align: center;
  margin: 0 5px;
}
.cabecalho .nascimento {
  padding-right: 25px;
  background: grey;
  width: 250px;
  text-align: center;
  margin: 0 5px;
}
.cabecalho .opcoes {
  background: grey;
  width: 10vw;
  text-align: center;
  margin: 0 5px;
}
.cabecalho .funcao {
  background: grey;
  text-align: center;
  width: 300px;
}
</style>