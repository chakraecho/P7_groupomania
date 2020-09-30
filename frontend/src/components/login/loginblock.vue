<template>
  <v-container>
    <v-row>
      <v-col>
        <v-btn text @click="selectedBlock = 'login'">
          Inscription
        </v-btn>
      </v-col>
      <v-col>
        <v-btn text @click="selectedBlock = 'signup'">
          Connexion
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-container v-if="selectedBlock === 'signup'">
        <ValidationObserver v-slot="{ invalid }">
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
          <v-row>
            <v-btn
              class="mx-auto"
              text
              @click="signUpClick()"
              :disabled="invalid"
            >
              S'inscrire
            </v-btn>
          </v-row>
        </ValidationObserver>
      </v-container>
      <v-container v-else-if="selectedBlock === 'login'">
        <ValidationObserver v-slot="{ invalid }">
          <v-row>
            <v-col cols="10" class="mx-auto">
              <v-text-field outlined label="email" v-model="loginEmail">
              </v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="10" class="mx-auto">
              <v-text-field outlined label="password" v-model="loginpassword">
              </v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-btn text @click="loginClick()" :disabled='invalid'>
              Se connecter
            </v-btn>
          </v-row>
        </ValidationObserver>
      </v-container>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      selectedBlock: "signup"
    };
  },
  methods: {
    loginClick() {}
  }
};
</script>

<style>
</style>