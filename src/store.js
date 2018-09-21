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
const dbfirestore = app.firestore().settings({timestampsInSnapshots:true})

const database = db.ref('database');
const databaseUser = db.ref('database/user');
const databaseRoom = db.ref('database/room');
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    database: [],
    rooms: [],
    room: [],
    waitingroom: []
  },
  mutations: {
    setData: (state, payload) => {
      state.database = payload;
    },
    setRoom: (state, payload) => {
      state.rooms = payload
    },
    setWaitingRoom: (state, payload) => {
      state.room = payload
    },
    setPlayer: (state, payload) => {
      state.waitingroom.push(payload)
    }
  },
  actions: {
    sendMessageDatabase: ({ commit } ,payload) => {         
      let data = {
        text: payload.text,
        name: payload.name        
      }
      databaseRoom.child(`${payload.roomId}/messages`).push(data);
    },
    getData: ({ commit }) => {
      database.on('value', (snapshot) => {
        commit('setData', snapshot.val())
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
    getRoom: ({ commit }, payload) => {
      databaseRoom.child(`${payload}`).on('value', (snapshot) => {        
        commit('setWaitingRoom', snapshot.val())
      })
    },
    getPlayer: ({ commit }, payload) => {     
      return new Promise((resolve,rejects)=>{
        databaseUser.child(`${payload}`).on('value', (snapshot) => {
          resolve(snapshot.val())
        })    
      }) 
       
    },
    createRoom: ({ commit }, payload) => {
      // console.log(payload,'0-----');

      database.child('room').push(payload)
    },
    ready: ({ commit }, payload) => {
      database.child(`room/${payload.roomId}/${payload.player}/status`).set(payload.status)      
    },
    joinRoom: ({ commit }, payload) => {
      console.log(payload, 'ppppppp');
      if(payload.quota == 1){
        database.child(`room/${payload.roomId}/quota`).set(payload.quota)
        database.child(`room/${payload.roomId}/player${payload.quota}`).set(payload.user)
      }else if(payload.quota == 2){
        database.child(`room/${payload.roomId}/quota`).set(payload.quota)
        database.child(`room/${payload.roomId}/player${payload.quota}`).set(payload.user)
        database.child(`room/${payload.roomId}/status`).set(payload.status)
      }
    }
  }
})
