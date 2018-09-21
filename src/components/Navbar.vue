<template>
  <nav id="topnav" class="navbar bg-secondary">
      <section class="container">
        <a href="/" class="navbar-brand">
          <img src="fix.png" alt="logo">
        </a>
        <form class="form-inline">
        </form>
      </section>
    </nav>
</template>

<script>
export default {
  name: 'navbar'
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
