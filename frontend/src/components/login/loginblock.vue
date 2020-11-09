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
        <validation-observer ref="signup" v-slot="{invalid}">
          <v-row>
            <v-col>
              <validation-provider
                  name="Nom"
                  rules="required|alpha"
                  v-slot="{errors}">
                <v-text-field
                    outlined
                    label="Nom"
                    :error-messages="errors"
                    v-model="lastName"
                    @keyup.enter="submitSignUp"
                >
                </v-text-field>
              </validation-provider>
            </v-col>
            <v-col>
              <validation-provider
                  name="Prénom"
                  rules="required|alpha"
                  v-slot="{errors}"
              >
                <v-text-field
                    outlined
                    label="Prénom"
                    :error-messages="errors"
                    v-model="firstName"
                    @keyup.enter="submitSignUp"
                >
                </v-text-field>
              </validation-provider>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <validation-provider
                  name="email"
                  rules="required|email"
                  v-slot="{errors}"
              >
                <v-text-field
                    outlined
                    label="email"
                    :error-messages="errors"
                    v-model="email"
                    @keyup.enter="submitSignUp"
                >
                </v-text-field>
              </validation-provider>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <validation-provider
                  name="mot de passe"
                  rules="required|password"
                  v-slot="{errors}"
              >
                <v-text-field
                    outlined
                    label="mot de passe"
                    type="password"
                    v-model="password"
                    :error-messages="errors"
                    @keyup.enter="submitSignUp"
                >
                </v-text-field>
              </validation-provider>
            </v-col>
          </v-row>
          <v-row>
            <v-btn class="mx-auto" text @click="submitSignUp" :disabled="invalid">
              S'inscrire
            </v-btn>
          </v-row>
        </validation-observer>
      </v-container>
      <v-container v-else-if="selectedBlock === 'login'">
        <validation-observer ref="login" v-slot="{invalid}">
          <v-row>
            <v-col cols="10" class="mx-auto">
              <validation-provider
                  name="email"
                  rules="required|email"
                  v-slot="{errors}"
              >
                <v-text-field
                    outlined
                    label="email"
                    v-model="loginEmail"
                    :error-messages="errors"
                    @keyup.enter="submitLogin"
                >
                </v-text-field>
              </validation-provider>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="10" class="mx-auto">
              <validation-provider
                  name="mot de passe"
                  rules="required|password"
                  v-slot="{errors}"
              >
                <v-text-field
                    outlined
                    label="password"
                    type="password"
                    v-model="loginPassword"
                    :error-messages="errors"
                    @keyup.enter="submitLogin"
                >
                </v-text-field>
              </validation-provider>
            </v-col>
          </v-row>
          <v-row>
            <v-btn class="mx-auto" text @click="submitLogin" :disabled="invalid">
              Se connecter
            </v-btn>
          </v-row>
        </validation-observer>
      </v-container>
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
      loginPassword: "",
    };
  },
  watch: {
    selectedBlock: function () {
      this.lastName = ""
      this.firstName = ""
      this.email = ""
      this.password = ""
      this.loginEmail = ""
      this.loginPassword = ""
      this.$refs.signup.reset()
      this.$refs.login.reset()
    }
  },
  methods: {
    /************************************************** */

    /************************************************** */
    activateSnack(color, msg) {
      this.$emit('activate-snack', color, msg)
    },
    touchedAndValid(v) {
      if (v.touched && !v.passed) {
        return false;
      } else if (v.passed) {
        return true;
      }
    },
    submitLogin() {
      this.$refs.login.validate()
      if (this.$refs.login.flags.invalid) {
        return false
      }
      fetch(process.env.VUE_APP_BACKEND + "/api/users/auth/login", {
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
          .then(response => {
                if (response.ok) {
                  response.json().then(res => {
                    console.log(res);
                    this.$store.dispatch("user/login", {...res});
                    this.$store.dispatch("handleAuth", true);
                    this.$router.push("/");
                  })
                } else {
                  response.json().then(res => {
                    this.activateSnack("error", res.message)
                    this.loginPassword = ""
                  })
                }

              }
          )

          .catch(error => console.log(error));
    },
    submitSignUp() {
      this.$refs.signup.validate()
      if (this.$refs.signup.flags.invalid) {
        return false
      }
      const body = JSON.stringify({
        email: this.email,
        password: this.password,
        firstName: this.firstName,
        lastName: this.lastName
      });
      fetch(process.env.VUE_APP_BACKEND + "/api/users/auth/signup", {
        body,
        method: "post",
        headers: {
          "Content-Type": "application/json"
        }
      })
          .then(response =>
              response.json().then(() => {
                fetch(process.env.VUE_APP_BACKEND + "/api/users/auth/login", {
                  body: JSON.stringify({
                    email: this.email,
                    password: this.password
                  }),
                  method: "post",
                  headers: {
                    "Content-Type": "application/json"
                  },
                  credentials: "include"
                }).then(response => {
                  if (response.ok) {
                    response
                        .json()
                        .then(res => {
                          this.$store.dispatch("user/login", {
                            firstName: res.firstName,
                            lastName: res.lastName,
                            profilImgUrl: res.profilImgUrl,
                            userId: res.userId
                          });
                          this.$store.commit("user/SET_ADMIN", res.isAdmin);
                          this.$store.dispatch("handleAuth", true);
                          this.$router.push("/");
                        })
                        .catch(error => console.log(error));
                  } else {
                    response.json().then(response => {
                      this.activateSnack("error", response.message)
                    })
                  }
                });
              })
          )

          .catch(error => console.log(error));
    }
  }
};
</script>

<style>
</style>