<template>
  <div>
    <h1>Lista de funcionários e suas respectivas atividades:</h1>
  <ul class="flex lista-atividades-funcionarios" v-for="(handler, index) in relacaoFuncionariosAtividades" :key="index">
    <li>{{handler.funcionario_nome}}</li>
    <li>{{handler.atividade_nome}}</li>
    <li>{{handler.atividade_descricao}}</li>
  </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
    atividades: [],
    relacaoFuncionariosAtividades: []
    }
  },
  methods: {
    async getRelacaoFuncionariosAtividades() {
      try {
        const response = await fetch('http://localhost:3000/atividadesAtreladasFuncionarios')
        this.relacaoFuncionariosAtividades = await response.json()
      }
      catch (e) {
        console.log(e)
      }
    }
  },
  created() {
    this.getRelacaoFuncionariosAtividades()
  }
}
</script>

<style>
.flex {
  display: flex;
}
.lista-atividades-funcionarios {
  justify-content: space-between;
  list-style: none;
  margin-top: 20px;
  max-width: 800px;
  margin-left: 20px;
}
</style>