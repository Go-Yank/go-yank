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
const databaseRoom = db.ref('database/room');

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    database: [],
    rooms: []
  },
  mutations: {
    setData: (state, payload) => {
      state.database = payload;
    },
    setRoom: (state, payload) => {
      state.rooms = payload

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
    },

    getRooms: ({ commit }) => {
      databaseRoom.on('value', (snapshot) => {
        // console.log(snapshot.val());

        commit('setRoom', snapshot.val())
      })
    },
    createRoom: ({ commit }, payload) => {
      // console.log(payload,'0-----');

      database.child('room').push(payload)
    },
    joinRoom: ({ commit }, payload) => {
      console.log(payload, 'ppppppp');
      if(payload.quota == 1){
        database.child(`room/${payload.roomId}/quota`).set(payload.quota)
        database.child(`room/${payload.roomId}/player${payload.quota}`).set(payload.playerId)
      }else if(payload.quota == 2){
        database.child(`room/${payload.roomId}/quota`).set(payload.quota)
        database.child(`room/${payload.roomId}/player${payload.quota}`).set(payload.playerId)
        database.child(`room/${payload.roomId}/status`).set(payload.status)
      }
    }



  }
})