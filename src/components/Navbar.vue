<template>
  <nav id="topnav" class="navbar bg-secondary">
      <section class="container">
        <a href="/" class="navbar-brand">
          <img src="fix.png" alt="logo" v-bind:title="message">
        </a>
        <form class="form-inline">
        </form>
      </section>
    </nav>
</template>

<script>
export default {
  name: 'navbar',
  data: () => {
    return {
      message: 'Logo'
      }
  }
}
</script>

<style>
#topnav {
  padding: 0;
}

#topnav a {
  color: white;
}

#topnav a#navlink {
  margin-right: 15px;
}
section a img {
  width: 100px;
}
</style>
