<template>
  <nav>
      <router-link :to="'/user/'+ userId" class="navbar-boutton text-center">Mon compte</router-link>
      <router-link to="/notifications" class="navbar-boutton text-center">Notifications</router-link>
      <router-link to="/groupes" class="navbar-boutton text-center">Groupes</router-link>
      <button class="navbar-boutton text-center" @click='disconnect'>Déconnexion</button>
      <router-link to="/" class="navbar-boutton text-center">A propos</router-link>
  </nav>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: "side-navbar",
  computed:{
    ...mapState('profil',['userId'])
  }
  ,
  methods:{
    disconnect(){
      fetch('http://localhost:3000/api/users/disconnect', {method:'delete', credentials:'include'})
      .then()
      .catch(error => console.log(error))
    }
  },
}
</script>

<style>
nav{
    position:sticky !important;
    height: 90vh;
    top:initial;
    z-index:89;
}
.navbar-boutton{
    width:100%;
    padding:1em;
}
</style>