<template>
<div>
  <div class="atividades-container">
    <router-link class="cadastrar-atividades" to="/atividades/cadastrarAtividades">Cadastrar atividades</router-link>
    <router-link class="listar-atividades" to="/atividades/listarAtividades">Listar atividades</router-link>
    <router-link class="atividades-funcionarios" to="/atividades/atividadesFuncionarios">Funcionários em serviço</router-link>
  </div>
  <router-view></router-view>
</div>
</template>
<script>

</script>

<style>
.atividades-container {
  display: flex;
  align-items: center;
  justify-content: center;
}
.cadastrar-atividades, .listar-atividades, .atividades-funcionarios {
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