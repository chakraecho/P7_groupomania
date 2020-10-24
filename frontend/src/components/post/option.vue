<template>
  <v-bottom-sheet v-if="post_option" v-model="post_option">
    <v-card>
      <v-btn text> <v-icon>mdi-alert</v-icon> Signaler </v-btn>
      <v-btn
        text
        v-if="option_post.userId === $store.state.user.userId"
        @click="open_edit_dialog"
      >
        <v-icon>mdi-pencil</v-icon> Editer
      </v-btn>
      <v-btn text v-if="option_post.userId === $store.state.user.userId" @click="deletePost()">
        <v-icon>mdi-delete</v-icon> Supprimer
      </v-btn>
    </v-card>
    <v-dialog v-model="edit_dialog">
      <v-card>
        <v-card-title>
          Editer le post
        </v-card-title>
        <v-card-content>
          <v-container>
            <v-row> </v-row>
            <v-row>
              <v-col>
                <v-col class="mx-auto" cols="11" md="7">
                  <v-textarea
                    label="Edition du commentaire"
                    v-model="editComment"
                  >
                  </v-textarea>
                </v-col>
                <v-col cols="4" class="mx-auto"> </v-col>
              </v-col>
              <v-col cols="1">
                <v-file-input accept="image/png, image/jpg" hide-input>
                </v-file-input>
              </v-col>
            </v-row>
          </v-container>
        </v-card-content>
        <v-spacer></v-spacer>
        <v-card-actions>
          <v-btn>
            Mettre à jour
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar v-model="snackbar" timeout="4000" :color="snackbarColor">
        {{snackbarMsg}}
    </v-snackbar>
  </v-bottom-sheet>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      edit_dialog: false,
      editComment: "",
      snackbar: false,
      snackbarcolor: ""
    };
  },
  computed: {
    ...mapGetters("post", ["option_post"]),
    post_option: {
      get() {
        return this.$store.state.post.option;
      },
      set() {
        return this.$store.commit("post/CLOSE_OPTION");
      }
    }
  },
  methods: {
    open_edit_dialog() {
      this.edit_dialog = true;
      this.editComment = this.option_post.content;
    },
    closeAll(){
        this.edit_dialog = false;
        this.editComment = "";
        this.$store.commit("post/CLOSE_OPTION");
    },
    activateSnack(color, msg){
        this.snackbar = true;
        this.snackbarcolor = color
        this.snackbarMsg = msg
    },
    deletePost(){
        fetch('http://localhost:3000/api/post/' + this.option_post.postId, {
            method:'delete',
            credentials: 'include'
        })
        .then(()=> {
            this.closeAll()
            this.activateSnack("success", "Commentaire supprimé !")
        })
        .catch((error)=>{
            console.log(error)
            this.activateSnack("error", "Erreur, veuillez rééssayer !")
        })
    }
  }
};
</script>