<template>
  <div class="container-fluid d-flex flex-column justify-content-around">
    <div class="row">
      <router-link to="/mon-compte" class="navbar-boutton text-center">Mon compte</router-link>
    </div>
    <div class="row">
      <router-link to="/notifications" class="navbar-boutton text-center">Notifications</router-link>
    </div>
    <div class="row">
      <router-link to="/groupes" class="navbar-boutton text-center">Groupes</router-link>
    </div>
    <div class="row">
      <button class="navbar-boutton text-center">Déconnexion</button>
    </div>
    <div class="row">
      <router-link to="/" class="navbar-boutton text-center">A propos</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "side-navbar",
};
</script>

<style>
</style>