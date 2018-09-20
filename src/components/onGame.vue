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
            Score : {{this.score}}
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
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import gest from '../assets/gest.js'

export default {
  name: 'onGame',
  watch: {
    taskMovement () {
      if (this.taskMovement === this.playerMovement) {
        this.score += 50
      }
    },
    playerMovement () {
      if (this.taskMovement === this.playerMovement) {
        this.score += 50
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
  data () {
    return {
      startStats: false,
      // user games data and input
      score: 0,
      playerMovement: '',
      // games system
      countDownLimit: '',
      countLimit: 5,
      taskInsterval: null,
      taskMovement: null
    }
  },
  methods: {
    systemTask () {
      let task = ['Right', 'Left', 'Up', 'Down', 'Long up', 'Long down']
      let randomNum = Math.round(Math.random() * 6)
      console.log(randomNum)
      this.taskMovement = task[randomNum]
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
