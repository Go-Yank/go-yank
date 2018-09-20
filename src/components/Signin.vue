<template>
  <div>
    <label>Name</label>
    <form>
      <input type="text" v-model="name" placeholder="Input your name">
      <button type="button" @click="signin">Go!!</button>
    </form>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  data () {
    return { name: '' }
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
      let data = {
        name: this.name,
        score: 0,
        status: 0,
        x: 0,
        y: 0
      }
      this.signinPlayer(data)
    }
  }
}
</script>
