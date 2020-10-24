<template>
  <v-bottom-sheet v-if="post_option" v-model="post_option">
    <v-card>
      <v-btn text> <v-icon>mdi-alert</v-icon> Signaler </v-btn>
      <v-btn
        text
        v-if="$store.getters.option_post === $store.state.user.userId"
      >
        <v-icon>mdi-pencil</v-icon> Editer
      </v-btn>
    </v-card>
  </v-bottom-sheet>
</template>

<script>
export default {
  computed: {
    post_option: {
      get() {
        return this.$store.state.post.option;
      },
      set() {
        return this.$store.commit("post/CLOSE_OPTION");
      }
    }
  }
};
</script>