<template>
  <v-app id="app">
    <headerComp app class="header pa-0 ma-0" @handle-nav-bar="setDrawer()"/>
    <v-container app class="pa-0 d-flex" fluid>
        <navbar ref="navDrawer" id="nav-drawer" v-if="isAuth" :drawer="drawer" />
      <v-main>
        <v-container fluid class="pa-0 ma-0">
          <router-view id="view" :key="$route.fullPath" />
        </v-container>
      </v-main>
    </v-container>
  </v-app>
</template>

<script>
import headerComp from "@/components/header.vue";
import navbar from "@/components/navbar.vue";

export default {
  components: {
    headerComp,
    navbar
  },
  data(){
    return{
      drawer: false
    } 
  },
  methods:{
    setDrawer(){
     this.$set(this, "drawer", !this.drawer)
    }
  },
  computed: {
    isAuth: {
      get() {
        return this.$store.state.isAuth;
      }
    }
  }
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#view {
  position: relative;
  min-height: 90vh;
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
  &-drawer{
    height:90vh !important;
    position: absolute;
    z-index: 99;
    top:10vh !important;
  }
}

.header {
  height: 10vh;
  position:sticky;
  top:0px; z-index:6;
}
</style>
