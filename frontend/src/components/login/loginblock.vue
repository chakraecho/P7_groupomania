<template>
  <v-container justify-space-between class="d-flex flex-column">
    <v-row>
      <v-col>
        <v-btn text @click="selectedBlock = 'signup'">
          Inscription
        </v-btn>
      </v-col>
      <v-col>
        <v-btn text @click="selectedBlock = 'login'">
          Connexion
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-container v-if="selectedBlock === 'signup'">
        <v-row>
          <v-col>
            <v-text-field outlined label="Nom" v-model="lastName">
            </v-text-field>
          </v-col>
          <v-col>
            <v-text-field outlined label="Prénom" v-model="firstName">
            </v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field outlined label="email" v-model="email">
            </v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field outlined label="mot de passe" v-model="password">
            </v-text-field>
          </v-col>
        </v-row>
      </v-container>
      <v-container v-else-if="selectedBlock === 'login'">
        <v-row>
          <v-col cols="10" class="mx-auto">
            <v-text-field outlined label="email" v-model="loginEmail">
            </v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="10" class="mx-auto">
            <v-text-field outlined label="password" v-model="loginPassword">
            </v-text-field>
          </v-col>
        </v-row>
      </v-container>
      <v-row v-if="selectedBlock === 'signup'" class="pa-0">
        <v-btn class="mx-auto" text @click="submitSignUp">
          S'inscrire
        </v-btn>
      </v-row>
      <v-row v-if="selectedBlock === 'login'" class="pa-0">
        <v-btn class="mx-auto" text @click="submitLogin">
          Se connecter
        </v-btn>
      </v-row>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      selectedBlock: "signup",
      lastName: "",
      firstName: "",
      email: "",
      password: "",
      loginEmail: "",
      loginPassword: ""
    };
  },
  methods: {
    submitLogin() {
      fetch("http://localhost:3000/api/users/auth/login", {
        body: JSON.stringify({
          email: this.loginEmail,
          password: this.loginPassword
        }),
        method: "post",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include"
      })
        .then(res => {
          this.$store.dispatch("user/login", { res });
          this.$store.dispatch("handleAuth", true);
          this.$router.push("/");
        })
        .catch(error => console.log(error));
    },
    submitSignUp() {
      const body = JSON.stringify({
        email: this.email,
        password: this.password,
        firstName: this.firstName,
        lastName: this.lastName
      });
      fetch("http://localhost:3000/api/users/auth/signup", {
        body,
        method: "post",
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(res => {
          this.$store.dispatch("user/login", { res });
          fetch("http://localhost:3000/api/users/auth/login", {
            body: JSON.stringify({
              email: this.email,
              password: this.password
            }),
            method: "post",
            headers: {
              "Content-Type": "application/json"
            },
            credentials: "include"
          })
            .then(res => {
              this.$store.dispatch("user/login", { firstName: res.firstName,
              lastName: res.lastName,
              profilImgUrl: res.profilImgUrl,
               });
              this.$store.dispatch("handleAuth", true);
              this.$router.push("/");
            })
            .catch(error => console.log(error));
        })
        .catch(error => console.log(error));
    }
  }
};
</script>

<style>
</style>