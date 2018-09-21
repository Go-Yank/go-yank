import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import onGame from './components/onGame'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    // {
    //   path: '/',
    //   name: 'home',
    //   component: Home
    // },
    {
      path: '/',
      name: 'home',
      component: () => import(/* webpackChunkName: "about" */ './components/Signin.vue')
    },
    {
      path:'/lobby',
      name:'lobby',
      component:()=> import('./components/Lobby.vue')
    },
      {
      path:'/waitingroom/:id',
      name:'waitingroom',   
      props:true,  
      component: () => import('./components/Waitingroom.vue')
    },    
    {
      path: '/ongame',
      name: 'onGame',
      component: onGame
    }
  ]
})
