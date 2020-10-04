<template>
<v-card>
  <v-navigation-drawer
    expand-on-hover
    class="d-flex navbar flex-column align-center justify-space-between"
  >
    <v-list nav class="d-flex flex-column justify-content-between align-items-center nav-inside">
      <v-list-item link>
        <v-list-item-icon>
          <v-icon>mdi-account</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Mon compte</v-list-item-title>
      </v-list-item>
      <v-list-item link>
        <v-list-item-icon>
          <v-icon>mdi-bell</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Notifications</v-list-item-title>
      </v-list-item>
      <v-list-item link>
        <v-list-item-icon>
          <v-icon>mdi-account-group</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Groupes</v-list-item-title>
      </v-list-item>
      <v-list-item link>
        <v-list-item-icon>
          <v-icon>mdi-logout</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Se déconnecter</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</v-card>
</template>

<script>
export default {
  methods: {
    disconnect() {
      fetch("http://localhost:3000/api/users/disconnect", {
        method: "delete",
        credentials: "include"
      })
        .then(() => {
          this.$store.dispatch("user/disconnect");
          this.$router.push("/login");
        })
        .catch(error => console.log(error));
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