<template>
  <v-container>
    <v-snackbar
      timeout="3000"
      v-model="snackbar"
      :color="snackbarColor"
      top
      right
    >
      {{ snackbarMsg }}
    </v-snackbar>
    <h1>Administration</h1>
    <h2>Liste des signalements</h2>
    <v-row>
      <v-container>
        <v-row>
          <v-col cols="11" md="6" class="mx-auto">
            <v-simple-table>
              <thead>
                <tr>
                  <th>
                    Type
                  </th>
                  <th>
                    Id
                  </th>
                  <th>
                    Message
                  </th>
                  <th>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="alert in alerts" :key="'id_' + alert.id">
                  <td>
                    {{ alert.type }}
                  </td>
                  <td>
                    {{ alert.id }}
                  </td>
                  <td>
                    {{ alert.message }}
                  </td>
                  <td>
                    <v-btn icon @click="deleteAlert(alert.id)">
                      <v-icon>
                        mdi-delete
                      </v-icon>
                    </v-btn>
                  </td>
                </tr>
              </tbody>
            </v-simple-table>
          </v-col>
        </v-row>
        <div class="pagination">
          <div class="block-icon">
            <button
              :disabled="links.first === links.last"
              @click="getDataTable(links.first)"
            >
              <v-icon>mdi-page-first</v-icon>
            </button>
            <button
              :disabled="links.prev === null || links.prev === links.next"
              @click="getDataTable(links.prev)"
            >
              <v-icon>mdi-chevron-left</v-icon>
            </button>
            <span class="current-page">{{ current_page }}</span>
            <button
              :disabled="links.next === null || links.prev === links.next"
              @click="getDataTable(links.next)"
            >
              <v-icon>mdi-chevron-right</v-icon>
            </button>
            <button
              :disabled="links.first === links.last"
              @click="getDataTable(links.last)"
            >
              <v-icon>mdi-page-last</v-icon>
            </button>
          </div>
        </div>
      </v-container>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      alerts: [],
      current_page: 1,
      links: {},
      snackbar: false,
      snabarMsg: "",
      snackbarColor: ""
    };
  },
  methods: {
    activateSnack(color, msg) {
      this.$set(this, "snackbar", true);
      this.$set(this, "snackbarColor", color);
      this.$set(this, "snackbarMsg", msg);
    },
    getData(link) {
      if (link === undefined) {
        link = "http://localhost:3000/api/admin/list";
      }
      fetch(link, {
        credentials: "include"
      }).then(response =>
        response.json().then(res => {
          console.log(res);
          this.alerts = res.docs;
          this.links = res.links;
        })
      );
    },
    deleteAlert(id) {
      fetch("http://localhost:3000/api/admin/alert/" + id, {
        credentials: "include",
        method: "delete"
      })
        .then(res => {
          if (res.ok) {
            this.activateSnack("success", "alert supprimé !");
            this.getData();
          } else {
            this.activateSnack("error", "erreur lors de l'envoi");
          }
        })
        .catch(error => {
          console.log(error);
          this.activateSnack("error", "erreur lors de l'envoi");
        });
    }
  },
  mounted() {
    this.getData();
  }
};
</script>


<style scoped>
td {
  text-align: center;
}

th {
  text-align: center;
}
</style>