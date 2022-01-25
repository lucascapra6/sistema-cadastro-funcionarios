<template>
  <div class="cadastro-atividades">
    <transition name="fade">
      <div v-if="alertCadastro" id="alert-ativ-cadastrada">
        <p>Atividade cadastrada com sucesso</p>
      </div>
    </transition>
    <form>
      <label>Atividade:<input type="text" v-model="atividade"> </label>
      <label>Descricao: <input type="text" v-model="descricao"></label>
    </form>
    <button class="enviar-btn2" @click="cadastrarAtividade">Enviar</button>
  </div>
</template>
<script>
const axios = require('axios')
export default {
  data() {
    return {
      atividade: null,
      descricao: null,
      alertCadastro: false
    }
  },
  methods: {
    async cadastrarAtividade() {
      try {
        if (this.atividade !== null && this.descricao !== null) {
          const response = await axios.post('http://localhost:3000/atividades', {
            atividade_nome: this.atividade,
            atividade_descricao: this.descricao
          })
          this.ativarAlertaAnimacao()
          return response
        } else {
          alert('Preencha todos os dados')
        }
      }
      catch(ex) {
        console.log(ex)
      }
    },
    ativarAlertaAnimacao() {
      this.alertCadastro = true
      setTimeout(()=> {
        this.alertCadastro = false
      },2000)
    }
  }
}
</script>
<style>
.cadastro-atividades {
  margin-left: 20px;
  margin-top: 20px;
}
.cadastro-atividades input {
  width: 20vw;
}
label {
  display: block;
}
select {
  width: 20vw;
}
.enviar-btn2 {
  margin-top: 0px;
  width: 60px;
}
#alert-ativ-cadastrada {
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
#alert-ativ-cadastrada p {
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
