<template>
  <div class="lista-de-atividades">
    <div class="space-between lista-de-atividades-container">
      <div class="flex cabecalho">
        <p class="atividade">Atividade</p>
        <p class="descricao">Descrição</p>
        <p class="opcoes">Opções</p>
      </div>
      <ul v-for="(atividade, index) in atividades" :key="index" class="flex">
        <li class="nome">{{ atividade.atividade_nome }}</li>
        <li class="descricao">{{ atividade.atividade_descricao }}</li>
        <div class="gerenciar-atividades">
          <button class="editar" @click="abrirModalEditar(index)">Editar</button>
          <button @click="excluirAtividade(index)" class="excluir">X</button>
        </div>
      </ul>
      <transition>
        <div v-show="modalAberto" class="modal-update">
          <h1>Atualizar dados:</h1>
          <div @click="modalAberto = false" class="btn-fechar-modal">X</div>
          <div class="inserir-dados">
            <label>Atividade: <input type="text" v-model="atividadeAtualizada"></label>
            <label>Descrição: <textarea v-model="descricaoAtualizada"></textarea></label>
          </div>
          <button class="atualizar-btn" @click="editarAtividade">Atualizar</button>
        </div>
      </transition>
    </div>
  </div>
</template>
<script>
const axios = require('axios')
export default {
  data() {
    return {
      atividades: [],
      modalAberto: false,
      atividadeAtualizada: null,
      descricaoAtualizada: null,
      idAtividadeSelecionada: null
    }
  },
  methods: {
    async listarAtividades() {
      try {
        const response = await fetch('http://localhost:3000/atividades')
        this.atividades = await response.json()
      } catch (error) {
        console.log(error)
      }
    },
    async excluirAtividade(index) {
      const idAtividade = this.atividades[index].atividade_id
      await axios.post('http://localhost:3000/excluirAtividade', {
        atividade_id: idAtividade
      })
      this.listarAtividades()
    },
    abrirModalEditar(index) {
      this.modalAberto = true
      const idAtividade = this.atividades[index].atividade_id
      this.atividadeAtualizada = this.atividades[index].atividade_nome
      this.descricaoAtualizada = this.atividades[index].atividade_descricao
      this.idAtividadeSelecionada = idAtividade
    },
    async editarAtividade() {
      await axios.post('http://localhost:3000/atualizarAtividade', {
        id: this.idAtividadeSelecionada,
        atividadeAtualizada: this.atividadeAtualizada,
        descricaoAtualizada: this.descricaoAtualizada
      })
      this.modalAberto = false
      this.listarAtividades()
      this.cleanData()
    },
    cleanData() {
      this.atividadeAtualizada = null
      this.descricaoAtualizada = null
    }
  },
  created() {
    this.listarAtividades()
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

.lista-de-atividades-container ul {
  list-style: none;
  margin-top: 10px;
  margin-left: 20px;
  max-width: 70vw;
}

.descricao {
  width: 600px;
}

.lista-de-atividades {
  display: flex;
}

.gerenciar-atividades {
  display: flex;
  justify-content: end;
  width: 10vw;
}

.nome {
  width: 40vw;
}

button {
  margin: 0 5px;
  width: 40px;
  height: 20px;
}

textarea {
  display: block;
  margin-bottom: 40px;
  width: 300px;
  height: 100px;
}
.cabecalho {
  justify-content: space-between;
}
.cabecalho .atividade {
  background: grey;
  width: 100px;
  text-align: center;
}
.cabecalho .descricao {
  background: grey;
  width: 400px;
  text-align: center;
  margin: 0 5px;
}
.cabecalho .opcoes {
  background: grey;
  width: 10vw;
  text-align: center;
}
</style>