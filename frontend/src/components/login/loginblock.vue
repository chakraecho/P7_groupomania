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
          <v-btn class="mx-auto" text>
            S'inscrire
          </v-btn>
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
            <v-text-field outlined label="password" v-model="loginpassword">
            </v-text-field>
          </v-col>
        </v-row>
        <v-row>
            <v-btn text>
                Se connecter
            </v-btn>
        </v-row>
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
  }
};
</script>

<style>
</style>