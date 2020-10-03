<template>

    <nav class="d-flex navbar flex-column align-center justify-space-between">
      <v-row>
        <v-btn text fluid>
          Mon compte
        </v-btn>
      </v-row>

      <v-row>
        <v-btn text fluid>
          Notifications
        </v-btn>
      </v-row>

      <v-row>
        <v-btn text fluid>
          Groupes
        </v-btn>
      </v-row>

      <v-row>
        <v-btn text fluid @click="disconnect">
          Deconnexion
        </v-btn>
      </v-row>
    </nav>
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
  height: 100vh;
  position: sticky;
}
</style>