import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Funcionarios from '../components/Funcionarios/funcionarios_component.vue'
import GerenciamentoDeFuncionarios from '../components/Funcionarios/cadastrarFuncionarios_component'
import ListarFuncionarios from '../components/Funcionarios/listarFuncionarios_Component'
import Atividades from '../components/Atividades/atividades_component'
import CadastrarAtividades from '../components/Atividades/cadastrarAtividades_component'
import ListarAtividades from '../components/Atividades/listarAtividades'
import AtrelarFuncoes from '../components/Atrelar-Ativ-e-Func/atrelar_component'
import AtividadesFuncionarios from '../components/Atividades/atividades-funcionarios'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path:'/funcionarios',
    name:'Funcionarios',
    component: Funcionarios,
    children: [
      {
        name:'cadastrarFuncionarios',
        path:'cadastrarFuncionarios',
        component:GerenciamentoDeFuncionarios,
      },
      {
        name:'listarFuncionarios',
        path:'listarFuncionarios',
        component: ListarFuncionarios,
      }
    ]
  },
  {
    name:'atividades',
    path:'/atividades',
    component: Atividades,
    children: [
      {
        name:'cadastrarAtividades',
        path:'cadastrarAtividades',
        component: CadastrarAtividades
      },
      {
        name:'listarAtividades',
        path:'listarAtividades',
        component: ListarAtividades
      },
      {
        name:'atividades-funcionarios',
        path:'atividadesFuncionarios',
        component: AtividadesFuncionarios
      }
    ],
  },
  {
    path:'/atrelarFuncoesFuncionarios',
    name:'atrelarFuncoes',
    component: AtrelarFuncoes
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
