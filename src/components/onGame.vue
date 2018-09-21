<template>
  <div class="home">
    Logo
    <div class="ui center aligned container">
      <div class="column" style="margin-top: 60px;">
          <div v-if="isGameEnded">
            {{msgGame}}
              <button class="ui button" v-on:click="removeRoom">
                Go to lobby
              </button>
          </div>
          <div v-else>
            <div class="ui button" style="margin-top:30px;" @click="start" v-if="!startStats">
              Start Games
            </div>
            <div class="countdown" v-else style="font-size:50px;">
              <div style="margin-top:50px;">
                Score : {{player.playerScore}}
              </div>
              <div  style="margin-top:50px;">
                clue :
              </div>
              <div v-if="taskMovement">
                {{taskMovement}}
              </div>
              <div v-if="countLimit !== 'GO..!'" style="margin-top:50px;">
                {{countLimit}}
              </div>
              <div v-else style="margin-top:50px;">
                {{playerMovement}}
              </div>
              <div>
                <button v-on:click="stopGame">
                  stop
                </button>
              </div>
            </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import gest from '../assets/gest.js'

export default {
  name: 'onGame',
  mounted() {
    this.start()
  },
  watch: {
    ...mapState(["detailRoomVal"]),
    detailRoomVal () {
      if (this.player.host) {
        if (this.detailRoomVal.player1.score === 100) {
          this.stopGame()
          this.showWinner('You Win')
        } else if (this.detailRoomVal.player2.score === 100) {
          this.stopGame()
          this.showWinner('You Lose')
        }
      } else {
        if (this.detailRoomVal.player1.score === 100) {
          this.stopGame()
          this.showWinner('You Lose')
        } else if (this.detailRoomVal.player2.score === 100) {
          this.stopGame()
          this.showWinner('You Win')
        } 
      }
    },
    playerMovement () {
      let player = ''
      if (this.player.host) {
        player =  'player1'
      } else {
        player =  'player2'
      }
      if (this.taskMovement === this.playerMovement) {        
        this.addScore(player)
      } else if (this.playerMovement === 'Up' && this.taskMovement === 'Long up') {
        this.addScore(player)
      } else if (this.playerMovement === 'Down' && this.taskMovement === 'Long down') {
        this.addScore(player)
      } else if (this.playerMovement === 'Long down' && this.taskMovement === 'Down') {
        this.addScore(player)
      } else if (this.playerMovement === 'Long up' && this.taskMovement === 'Up') {
        this.addScore(player)
      }
    },
    countLimit () {
      if (this.countLimit === 0) {
        clearInterval(this.countDownLimit)
        this.countLimit = 'GO..!'
        this.gameBegin()
        this.taskInsterval = setInterval(this.systemTask, 2500)
      }
    }
  },
  props: ['roomId'],
  created () {
    this.detailRoom(this.roomId) //setting simulasi ID room
  },
  data () {
    return {
      startStats: false,
      // user games data and input
      playerMovement: 'none',
      // games system
      countDownLimit: '',
      countLimit: 5,
      taskInsterval: null,

      isGameEnded : false,
      msgGame: '',
      whoIsThis : ''
    }
  },
  computed : {
    ...mapState(["detailRoomVal"]),
    detailRoomGame () { 
      return this.detailRoomVal
    },
    currentScore () {
      return this.player.playerScore
    },
    opponentCurrentScore () {
      return this.player.opponentScore
    },
    player() {
    let idLocal = localStorage.getItem('id')
    if (idLocal === this.detailRoomGame.player1.id) {
      return {
        host: true,
        playerName: this.detailRoomGame.player1.name,
        playerScore: this.detailRoomGame.player1.score,
        opponentName: this.detailRoomGame.player2.name,
        opponentScore: this.detailRoomGame.player2.score,
      }
    } else if (idLocal === this.detailRoomGame.player2.id) {
      return {
        host: false, 
        playerName: this.detailRoomGame.player2.name,
        playerScore: this.detailRoomGame.player2.score,
        opponentName: this.detailRoomGame.player1.name,
        opponentScore: this.detailRoomGame.player1.score
      }
    }
    },
    taskMovement () {
      return this.detailRoomVal.movement
    }
  },
  methods: {
    ...mapActions(["changeMovement", "detailRoom", "addingScore", "delRoom"]),
    showWinner (strMsg) {
      this.isGameEnded = true
      this.msgGame = strMsg
    },
    removeRoom() {
      let id = this.roomId
      this.delRoom(id)
      this.$router.push('/lobby')
      gest.stop()

    },
    addScore (player) {
      if (player == 'player1') {
        let data = {        
          roomId : this.roomId, // roomID simulasi
          playerScore: this.player.playerScore + 50,
          playerNumber: 'player1'
        }
        this.addingScore(data)
      } else {
        let data = {        
          roomId : this.roomId, // roomID simulasi
          playerScore: this.player.playerScore + 50,
          playerNumber: 'player2'
        }
        this.addingScore(data)
      }
    },
    stopGame () {
      clearInterval(this.taskInsterval)
    },
    systemTask () {
      let task = ['Right', 'Left', 'Up', 'Down', 'Long up', 'Long down']
      let randomNum = Math.round(Math.random() * 5)
      let data = {
        roomId : this.roomId , // roomID simulasi
        movement: task[randomNum]
      }
      this.changeMovement(data)
    },
    start () {
      this.startStats = true
      this.countDownLimit = setInterval(this.intervalDecrement, 1000)
    },
    intervalDecrement () {
      this.countLimit--
    },
    countDown () {
      // let self = this
      // let time = 5
    },
    gameBegin () {
      let self = this
      gest.start()
      console.log('GEST JALAN')
      gest.options.subscribeWithCallback (function (gesture) {
        self.playerMovement = gesture.direction
      })
    }
  }
}
</script>
