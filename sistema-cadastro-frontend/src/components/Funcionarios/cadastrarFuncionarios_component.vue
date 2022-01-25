<template>
  <div class="cadastro-funcionario">
    <transition name="fade">
      <div v-if="alertCadastro" id="alert-func-cadastrado">
        <p>Funcionário adicionado com sucesso</p>
      </div>
    </transition>

      <form>
        <label>Nome: <input type="text" v-model="nome"></label>
        <label>Data de Nascimento <input type="date" v-model="nascimento"></label>
        <div>
        </div>
      </form>
    <button class="enviar-btn" @click="cadastrarFuncionario">Enviar</button>
  </div>
</template>

<script>
const axios = require('axios')
export default {
data() {
  return {
    nome: null,
    nascimento: null,
    alertCadastro: false,
    atividades: []
  }
},
  methods: {
    async cadastrarFuncionario() {
      if(this.nascimento !== null && this.nome !== null) {
        const response = await axios.post('http://localhost:3000/funcionarios', {
          funcionario_nome: this.nome,
          funcionario_nascimento: this.nascimento
        })
        console.log(response)
        this.ativarAlertaAnimacao()
        this.cleanData()
        return response
      }
      else {
        return alert('Preencha todos os dados')
      }
    },
    cleanData() {
      this.nome= null
      this.nascimento=null
    },
    ativarAlertaAnimacao() {
      this.alertCadastro = true
      setTimeout(()=> {
        this.alertCadastro = false
      },2000)
    },
  },
}
</script>

<style>
.cadastro-funcionario {
  margin-left: 20px;
  margin-top: 20px;
}
.cadastro-funcionario input {
  width: 500px;
  height: 20px;
}
label {
  display: block;
}
input {
  display: block;
  margin-bottom:20px ;
}
select {
  width: 200px;
}
.enviar-btn {
  margin-top: 20px;
  width: 60px;
}
#alert-func-cadastrado {
  width: 250px;
  height: 50px;
  background: grey;
  box-shadow: 3px 3px 1px rgba(0, 0, 0, 0.20);
  position: absolute;
  top: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
}
#alert-func-cadastrado p {
  font-family: "Almarai";
  font-size: 15px;
}
.fade-enter-active {
  transition: all 1s ease;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
  transform: translate3d(0, -100px, 0);
}
</style>