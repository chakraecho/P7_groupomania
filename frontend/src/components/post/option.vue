<template>
  <v-bottom-sheet v-if="post_option" v-model="post_option">
    <v-card>
      <v-btn text> <v-icon>mdi-alert</v-icon> Signaler </v-btn>
      <v-btn
        text
        v-if="option_post === $store.state.user.userId"
      >
        <v-icon>mdi-pencil</v-icon> Editer
      </v-btn>
    </v-card>
    <v-dialog
    v-model="edit_dialog">
        <v-card>
            <v-card-header>
                Editer le commentaire
            </v-card-header>
            <v-card-content>

            </v-card-content>
        </v-card>
    </v-dialog>
  </v-bottom-sheet>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    data(){
        return {
            efit_dialog: false
        }
    },
  computed: {
      ...mapGetters('post', ["option_post"]),
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