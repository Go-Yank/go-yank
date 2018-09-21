<template>
    <div>
        <div class="justify-content-between">
        <h1>{{playerData.player1.name}}</h1>
        <h1>{{statusReady1}}</h1>
        </div>
        <hr>
         <div class="justify-content-between">
        <h1>{{playerData.player2.name}}</h1>
        <h1>{{statusReady2}}</h1>
        </div>
        <button type="button" @click="playerReady">ready</button>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { log } from 'util';
export default {
    props:['id'],
    computed:{
        ...mapState(['room','waitingroom']),
        playerData(){
            return this.room
        },
        statusReady1(){
            if(this.playerData.player1.status == 1){
                return 'ready'
            }
            else if(this.playerData.player1.status == 0){
                return 'not ready'
            }
        },
        statusReady2(){
            if(this.playerData.player2.status == 1){
                return 'ready'
            }
            else if(this.playerData.player2.status == 0){
                return 'not ready'
            }
        }
    },
    data(){
        return{
            playerId: localStorage.getItem('id')
        }
    },
    methods: {
        ...mapActions(['getRoom','getPlayer','ready']),
        getPlayerData(){
            this.getRoom(this.id)
        },
        playerReady(){
            // console.log(this.playerId)
            console.log(this.id);
            if(this.playerData.player1.id == this.playerId){
                console.log('player1');
                this.ready({roomId:this.id,player:'player1',status:1})
            }
            if(this.playerData.player2.id == this.playerId){
                console.log('player2');
                this.ready({roomId:this.id,player:'player2',status:1})
                
            }

            if(this.playerData.player1.status == 1 && this.playerData.player2.status == 1){
                console.log('mulai game');
                
            }
            // this.ready(this.playerId)
        }
     
    },
    created(){
        this.getPlayerData()              
    }
}
</script>

<style>

</style>
