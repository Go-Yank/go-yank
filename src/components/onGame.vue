<template>
  <div class="home">
    Logo
    <div class="ui center aligned container">
      <div class="column" style="margin-top: 60px;">
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
          <div v-if="isGameEnded">
            {{msgGame}}
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
  watch: {
    currentScore () {
      if (this.currentScore === 500) {
        this.stopGame()
      }
    },
    opponentCurrentScore () {
      if (this.opponentCurrentScore === 500) [
        This.stopGame()
      ]
    },
    playerMovement () {
      if (this.taskMovement === this.playerMovement) {        
        this.addScore()
      } else if (this.playerMovement === 'Up' && this.taskMovement === 'Long up') {
        this.addScore()
      } else if (this.playerMovement === 'Down' && this.taskMovement === 'Long down') {
        this.addScore()
      } else if (this.playerMovement === 'Long down' && this.taskMovement === 'Down') {
        this.addScore()
      } else if (this.playerMovement === 'Long up' && this.taskMovement === 'Up') {
        this.addScore()
      }
    },
    countLimit () {
      if (this.countLimit === 0) {
        clearInterval(this.countDownLimit)
        this.countLimit = 'GO..!'
        if (this.player.host) {
          this.gameBegin()
          this.taskInsterval = setInterval(this.systemTask, 2500)
        }
      }
    }
  },
  props: ['roomId'],
  created () {
    localStorage.setItem('id','x1') //setting simulasi ID player
    this.detailRoom('testAndri') //setting simulasi ID room
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
      msgGame: ''
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
    ...mapActions(["changeMovement", "detailRoom", "addingScore"]),
    showWinner () {
      this.msgGame = 'You win'
    },
    addScore () {
      if (this.player.host) {
        let data = {        
          roomId : 'testAndri', // roomID simulasi
          playerScore: this.player.playerScore + 50,
          playerNumber: 'player1'
        }
        this.addingScore(data)
      } else {
        let data = {        
          roomId : 'testAndri', // roomID simulasi
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
        roomId : 'testAndri', // roomID simulasi
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
      gest.options.subscribeWithCallback (function (gesture) {
        self.playerMovement = gesture.direction
      })
    }
  }
}
</script>
