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

        <div>
            <form>
                <input type="text" v-model="messages">
                <button type="button" @click="sendMessage">Send</button>
            </form>
            
            <ul>
                <li v-for="(chat,index) in messagesData" :key="index" style="list-style:none">
                    {{chat.text}} || {{chat.name}} || {{chat.time}}
                </li>
            </ul>
        </div>
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
        },
        messagesData(){
            let result = []
            // this.room.messages.forEach(message => {
            //         result.push(message)
            // });
            for(let message in this.room.messages){
                result.push(this.room.messages[message])
            }
            return result
        }
    },
    data(){
        return{
            playerId: localStorage.getItem('id'),
            messages:''
        }
    },
    methods: {
        ...mapActions(['getRoom','getPlayer','ready','sendMessageDatabase']),        
        sendMessage(){
            
            if(this.playerData.player1.id == this.playerId){                
            //    console.log('messages ====>',this.messages)
            //    console.log(this.playerData.player1.name)
               let payload = {
                   name : this.playerData.player1.name,
                   text : this.messages,
                   player1 : 'player1',
                   roomId : this.id
               }
               this.sendMessageDatabase(payload)
            }
            if(this.playerData.player2.id == this.playerId){  
                 let payload = {
                   name : this.playerData.player2.name,
                   text : this.messages,
                   player2 : 'player2',
                   roomId : this.id
               }
               this.sendMessageDatabase(payload)         
                // console.log('messages ====>',this.messages)
                // console.log(this.playerData.player2.name)
            }
        },
        getPlayerData(){
            this.getRoom(this.id)
        },
        playerReady(){

            if(this.playerData.player1.id == this.playerId){                
                this.ready({roomId:this.id,player:'player1',status:1})
            }
            if(this.playerData.player2.id == this.playerId){                
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
