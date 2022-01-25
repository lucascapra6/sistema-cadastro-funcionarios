<template>
  <div>
    <div class="funcionarios-container">
      <router-link class="cadastrar-funcionarios" to="/funcionarios/cadastrarFuncionarios">Cadastrar Funcionarios</router-link>
      <router-link class="listar-funcionarios" to="/funcionarios/listarFuncionarios">Listar funcionários</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'PaginaDeFuncionarios',
  props: ['gerenciamentoDeFuncionarios']
}
</script>

<style>
.funcionarios-container {
  display: flex;
  align-items: center;
  justify-content: center;
}
.cadastrar-funcionarios, .listar-funcionarios {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px;
  width: 160px;
  border: 1px solid black;
  text-decoration: none;
  height: 40px;
}

</style>