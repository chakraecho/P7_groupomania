<template>
  <header class="indigo">
    <v-container fluid class="d-flex flex-column justify-center pa-0 ma-0">
      <v-row>
        <v-col cols="1">
        <v-app-bar-nav-icon
          @click.stop="$emit('handle-nav-bar')"
          class="d-block d-md-none"
        ></v-app-bar-nav-icon>
        </v-col>
        <v-col cols="4" md="12" class="mx-md-auto">
          <router-link to="/" class="navbar-brand">
            <img
              src="./../assets/logo/icon-left-font-monochrome-white.png"
              width="150"
              alt="logo de groupomania"
              class="ml-2"
            />
          </router-link>
        </v-col>
      </v-row>
    </v-container>
  </header>
</template>

<script>
export default {};
</script>

<style>
</style>