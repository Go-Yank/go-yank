<template>
<div>

    <form onSubmit="return false">
    <div class="form-group">
        <label for="exampleInputEmail1">Create Room</label>
        <input type="text" class="form-control" placeholder="room name ...." v-model="name">
    </div>
    <button type="submit" class="btn btn-primary" v-on:click="createNewRoom">Submit</button>
    </form>

    <div class="card" style="width: 18rem;" v-for="(room, index) in listRoom" :key="index">
        <div class="card-body">
            <h5 class="card-title">{{room.name}}</h5>
            <p class="card-text">{{room.quota}}/2</p>
            <a href="#" class="btn btn-primary"  v-if="room.status" v-on:click="playerJoinRoom(index,room.quota)">Join</a>
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
    ...mapActions(["getRooms", "createRoom", "joinRoom"]),
    createNewRoom() {
      let data = {
        name: this.name,
        player1: "",
        player2: "",
        quota: 0,
        status:true
      };
      this.createRoom(data);
    },
    playerJoinRoom(roomId, quota) {
      let playerId = localStorage.getItem("id");
      if (quota === 0) {
        this.joinRoom({ playerId, roomId, quota: 1 });
      } else if (quota === 1) {
        this.joinRoom({ playerId, roomId, quota: 2, status:false });
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
