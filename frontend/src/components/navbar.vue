<template>

  <v-navigation-drawer
    :expand-on-hover="$vuetify.breakpoint.mdAndUp"
    v-model="drawerState"
    :permanent="$vuetify.breakpoint.mdAndUp"
    class="d-flex navbar flex-column align-center justify-space-between"
  >
    <v-list nav class="d-flex flex-column justify-content-between align-items-center nav-inside">
      <v-list-item link @click="$router.push('/')">
        <v-list-item-icon>
          <v-icon>mdi-home</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Accueil</v-list-item-title>
      </v-list-item>
      <v-list-item link @click="$router.push({name:'account', params:{id: $store.state.user.userId}} )">
        <v-list-item-icon>
          <v-icon>mdi-account</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Mon compte</v-list-item-title>
      </v-list-item>
      <v-list-item link @click="$router.push('/notification')">
        <v-list-item-icon>
          <v-icon>mdi-bell</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Notifications</v-list-item-title>
      </v-list-item>
      <v-list-item link @click="$router.push('/groups')">
        <v-list-item-icon>
          <v-icon>mdi-account-group</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Groupes</v-list-item-title>
      </v-list-item>
      <v-list-item link @click="disconnect">
        <v-list-item-icon>
          <v-icon>mdi-logout</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Se déconnecter</v-list-item-title>
      </v-list-item><v-list-item link v-if="isAdmin" @click="$router.push('/admin/panel')">
        <v-list-item-icon>
          <v-icon>mdi-cog</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Admin</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>

</template>

<script>
export default {
  computed:{
    isAdmin:{
      get(){
        return this.$store.state.user.isAdmin
      }
    },
    drawerState:{
      get(){
        return this.drawer
      },
      set(val){
        this.$emit("set-drawer", val)
      }
    }
  },
  props:['drawer'],
  methods: {
    disconnect() {
      fetch(process.env.VUE_APP_BACKEND + "/api/users/disconnect", {
        method: "delete",
        credentials: "include"
      })
        .then(() => {
          this.$store.dispatch("user/disconnect");
          this.$router.push("/login");
        })
        .catch(error => console.log(error));
    }
  },
  handleAccount(){
    if(this.$route.name != "account"){
      this.$router.push('/account/' + this.$store.state.user.userId)
    }
    else {
      this.$route.params.id = this.$store.state.user.userId
    }
    
  }
};
</script>

<style>
.navbar {
  height: 90vh;
  position: sticky;
}

</style>