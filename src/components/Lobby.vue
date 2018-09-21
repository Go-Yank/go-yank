<template>
<div class="container">

    <form onSubmit="return false">
    <div class="form-group">
        <label for="exampleInputEmail1">Create Room</label>
        <input type="text" class="form-control" placeholder="room name ...." v-model="name">
    </div>
       <button type="submit" class="btn btn-primary" v-on:click="createNewRoom">Submit</button>
    </form>

    <div class="row">
        <div class="col-6 col-md-4"  v-for="(room, index) in listRoom" :key="index">
            <div class="card" style="width: 22rem;">
                <div class="card-body">
                    <h5 class="card-title">{{room.name}}</h5>
                    <p class="card-text">{{room.quota}}/2</p>
                    <router-link :to="`/waitingroom/${index}`">
                    <a href="#" class="btn btn-primary"  v-if="room.status" v-on:click="playerJoinRoom(index,room.quota)">Join</a>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  data: function() {
    return {
      name: "",
      idPlayer: ''
    //   roomStatus: true
    };
  },
  computed: {
    ...mapState(["rooms"]),
    listRoom() {
      return this.rooms;
    },
    playerId(){
        return localStorage.getItem('id')
    }
  },
  methods: {
    ...mapActions(["getRooms", "createRoom", "joinRoom","getPlayer"]),
    createNewRoom() {
      let data = {
        name: this.name,
        player1: "",
        player2: "",
        quota: 0,
        status:true,
        messages:""
      };
      this.createRoom(data);
    },
    playerJoinRoom(roomId, quota) {
      let playerId = localStorage.getItem("id");      
            
      if (quota === 0) {
        this.idPlayer = playerId
        this.getPlayer(this.idPlayer)
        .then(userJoin =>{
          let user = Object.assign({id:this.idPlayer},userJoin)
          this.joinRoom({ playerId, roomId, quota: 1,user });
        })
        
      } else if (quota === 1) {
        this.idPlayer = playerId
        this.getPlayer(this.idPlayer)
        .then(userJoin =>{
          let user = Object.assign({id:this.idPlayer},userJoin)
          this.joinRoom({ playerId, roomId, quota: 2, status:false,user });          
        })
        
      }
    }
  },
  created() {
    this.getRooms();
  }
};
</script>

<style>
</style>
