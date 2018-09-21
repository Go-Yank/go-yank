<template>
    <div>
           <div class="container mt-5 mb-5"> 
                 <ul class="list-group mb-5">                        
                        <li class="list-group-item" style="list-style:none">
                            <h1 class="col-md-3" style="display : inline-block">{{playerData.player1.name}}</h1>                    
                            <h1 style="display : inline-block">{{statusReady1}}</h1>                    
                        </li>
                         <li class="list-group-item" style="list-style:none">
                            <h1 class="col-md-3" style="display : inline-block">{{playerData.player2.name}}</h1>                    
                            <h1 style="display : inline-block;">{{statusReady2}}</h1>                    
                        </li>
                    </ul>       
            <button class="mb-5" style="padding:30px 100px 30px 100px" type="button" @click="playerReady">ready</button>            
        </div>    
            <div class="container">               
                <div class="mb-5" >        
                    <ul class="list-group">                        
                        <li class="list-group-item" v-for="(chat,index) in messagesData" :key="index" style="list-style:none">
                            <h1>{{chat.text}}</h1>
                            <h5>{{chat.name}}</h5>
                        </li>
                    </ul>
                </div>     
                 <form>
                     <ul class="list-group">                        
                       
                            <input class="list-group-item" type="text" v-model="messages">
                            <button type="button" @click="sendMessage">Send</button>
                        
                    </ul>
                    
                </form>   
            </div>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { log } from 'util';
export default {
    props:['id'],
    watch: {
        playerData() {
            if(this.playerData.player1.status == 1 && this.playerData.player2.status == 1) {
              this.$router.push(`/ongame/${this.id}`)
            } 
        }
    },
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

<style scoped>
button{
       background-color: #4CAF50; /* Green */
    border: none;
    color: white;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
}
</style>
