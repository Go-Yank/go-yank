<template>
  <div class="login-page">
    <div class="form">
      <center>
      </center>
      <br>
      <form class="login-form">
        <input v-model="name" type="text" placeholder="Input your name"/>
        <h6 class="text-danger" v-if="feedback">{{feedback}}</h6>
        <button id="letsgo" type="button" @click="signin" class="bg-light col-md-3" style="border:1px solid red">
          <img src="../assets/letsgo.png" alt="" width="100%" class="fluid">
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  data () {
    return { name: null,feedback:null }
  },
  computed: {
    ...mapState(['database']),
    allData () {
      return this.database
    }
  },
  created () {
    this.getData()
  },

  methods: {
    ...mapActions(['getData', 'signinPlayer']),
    signin () {
      if(this.name){

        let data = {
          name: this.name,
          score: 0,
          status: 0,
          x: 0,
          y: 0
        }
        this.signinPlayer(data)
        this.$router.push('/lobby')
      }
      else{
        this.feedback = 'isi dulu namanya sayang'
      }
    }
  }
}
</script>

<style>
  button#letsgo {
    padding: 5px;
    background-color: white;
  }
</style>
