<template>
  <div class="home">
    <div class="container">
      <h1>Cadastro de funcionários e atividades</h1>
      <div class="links-router">
        <router-link @link="teste" to="/funcionarios" class="funcionarios-link">Funcionários</router-link>
        <router-link to="/atividades" class="atividades-link">Atividades</router-link>
        <router-link to="/atrelarFuncoesFuncionarios" class="atrelar-link">Atrelar</router-link>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  methods: {
    teste() {
      console.log('teste')
    }
  }
}
</script>
<style>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 30vh;
}
.links-router {
  display: flex;
}
.atividades-link, .funcionarios-link, .atrelar-link{
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px;
  width: 150px;
  border: 1px solid black;
  text-decoration: none;
  height: 40px;
}
.atividades:hover, .funcionarios:hover, .atrelar:hover {
  background: #d4d477;
}
</style>
