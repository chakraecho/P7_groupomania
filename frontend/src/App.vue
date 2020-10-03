<template>
  <v-app id="app">
      <headerComp class="header-height"/>
    <v-main>
      <v-navigation-drawer v-if="isAuth">
        <navbar  />
      </v-navigation-drawer>
      <router-view id="view"/>
    </v-main>
  </v-app>
</template>

<script>
import headerComp from "@/components/header.vue";
import navbar from '@/components/navbar.vue';

export default {
  components: {
    headerComp,
    navbar
  },
  computed:{
    isAuth:{
      get(){
        return this.$store.state.isAuth
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
  min-height:90vh;
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

.header-height{
  height:10vh;
}
</style>
