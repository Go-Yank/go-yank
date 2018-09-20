import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

var config = {
  apiKey: "AIzaSyCNf9kaL6VVKovaYACsv-JYvYfMevL8xZk",
  authDomain: "go-yank.firebaseapp.com",
  databaseURL: "https://go-yank.firebaseio.com",
  projectId: "go-yank",
  storageBucket: "go-yank.appspot.com",
  messagingSenderId: "440096021167"
};

const app = firebase.initializeApp(config);
const db = app.database();

const database = db.ref('database');
const databaseUser = db.ref('database/user');

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    database: [],
  },
  mutations: {
    setData: (state, payload) => {
      state.database = payload;
    }
  },
  actions: {
    getData: ({ commit }) => {
      database.on('value', (snapshot) => {
        commit('setData', snapshot.val());
      })
    },

    signinPlayer: ({ commit }, payload) => {
      let newUser = database.child('user').push(payload);
      localStorage.setItem('id', newUser.key);

    }
    
  }
})