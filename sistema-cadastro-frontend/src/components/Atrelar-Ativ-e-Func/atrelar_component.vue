<template>
  <div>
    <div class="container-atrelar">
      <form>
        <label>Funcionario:</label>
        <select v-model="funcionarioSelecionado" name="choice">
          <option selected disabled>Selecione o funcionário</option>
          <option v-for="(funcionario, index) in funcionarios" :key="index" :value="{id:funcionario.funcionario_id, nome:funcionario.funcionario_nome}">{{funcionario.funcionario_nome}}</option>
        </select>

        <label>Atividade:</label>
        <select v-model="atividadeSelecionada" name="choice">
          <option selected disabled>Selecione a atividade</option>
          <option v-for="(atividade,index) in atividades" :key="index" :value="{id:atividade.atividade_id, nome:atividade.atividade_nome}">{{atividade.atividade_nome}}</option>
        </select>
      </form>
      <button class="atrelar-btn" @click="atrelarFuncionarioAtividade">Atrelar</button>
    </div>
  </div>
</template>

<script>
const axios = require('axios')
export default {
  data() {
    return {
      funcionarios: [],
      atividades: [],
      funcionarioSelecionado: null,
      atividadeSelecionada: null
    }
  },
  methods: {
    async getFuncionarios() {
      const response = await fetch('http://localhost:3000/funcionarios')
      this.funcionarios = await response.json()
    },
    async getAtividades() {
      const response = await fetch('http://localhost:3000/atividades')
      this.atividades = await response.json()
    },
    async atrelarFuncionarioAtividade() {
      await axios.post('http://localhost:3000/atrelarAtividadeFuncionario', {
        idAtividade: this.atividadeSelecionada.id,
        idFuncionario: this.funcionarioSelecionado.id
      })
    }
  },
  created() {
    this.getAtividades()
    this.getFuncionarios()
  }
}
</script>

<style>
.flex {
  display: flex;
}
.container-atrelar {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.container-atrelar label {
  margin-top: 40px;
}
.container-atrelar select {
  margin-top: 5px;
}
.atrelar-btn {
  display: block;
  margin-top: 40px;
  width: 80px;
}
</style>