<template>
  <div id="app">
    <headerComponent />
    <router-view id='view'/>
    <div class='filter' id='filter' v-if='hasFocus'></div>
  </div>
</template>
<script>
import headerComponent from '@/components/header.vue'
import {mapState} from 'vuex'

export default{
  components:{
    headerComponent,
  },
  computed:{
    ...mapState(['hasFocus'])
  },
  methods:{
  },
  mounted:{
    
  }
}
</script>
<style lang="scss">
#view{
  position:relative;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
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
body{
  min-height:100vh;
}
main{
  height:100%;
}
</style>
