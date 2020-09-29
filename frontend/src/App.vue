<template>
  <div id="app">
    <headerComp />
    <router-view id="view" />
  </div>
</template>

<script>
import headerComp from '@/components/header.vue'
export default {
  components:{
    headerComp
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#view{
  position:relative
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
