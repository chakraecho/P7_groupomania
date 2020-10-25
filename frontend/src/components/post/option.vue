<template>
  <v-bottom-sheet v-if="post_option" v-model="post_option">
    <v-card>
      <v-btn text> <v-icon>mdi-alert</v-icon> Signaler </v-btn>
      <v-btn
        text
        v-if="option_post.userId === $store.state.user.userId"
        @click="open_edit_dialog()"
      >
        <v-icon>mdi-pencil</v-icon> Editer
      </v-btn>
      <v-btn
        text
        v-if="option_post.userId === $store.state.user.userId"
        @click="deletePost()"
      >
        <v-icon>mdi-delete</v-icon> Supprimer
      </v-btn>
    </v-card>
    <v-dialog v-model="edit_dialog" class="container">
      <v-card>
        <v-card-title>
          Editer le post
        </v-card-title>
        <v-card-text>
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
              <v-col
                cols="3"
                class="d-flex flex-column justify-center align-center"
              >
                <v-row>
                  <v-file-input accept="image/png, image/jpg" hide-input>
                  </v-file-input>
                </v-row>
                <v-row>
                  <v-btn @click="sendEdit()">
                    Mettre à jour
                  </v-btn>
                </v-row>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>

  </v-bottom-sheet>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      edit_dialog: false,
      editComment: "",
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
    closeAll() {
      this.edit_dialog = false;
      this.editComment = "";
      this.$store.commit("post/CLOSE_OPTION");
    },
    deletePost() {
      fetch("http://localhost:3000/api/post/" + this.option_post.postId, {
        method: "delete",
        credentials: "include"
      })
        .then(() => {
          this.closeAll();
          this.$emit('snackbar', {color: "success", msg: "Commentaire supprimé !"})
        })
        .catch(error => {
          console.log(error);
          this.$emit("snackbar", {color: "error", msg:"Erreur, veuillez rééssayer ou contacter un administrateur"});
        });
    },
    sendEdit(){
        const body = JSON.stringify({content: this.editComment})

        fetch('http://localhost:3000/api/post/' + this.option_post.postId, {
            method:"put",
            credentials : "include",
            headers:{"Content-type": "application/json"},
            body
        })
        .then(response => response.json()
        .then(res => {
          this.$store.commit('post/UPDATE_POST', res.post)
          this.closeAll();
          this.$emit('snackbar', {color: "success", msg: "Commentaire modifié !"})
        })
        )
                
        .catch(error => {
          console.log(error);
          this.$emit("snackbar", {color: "error", msg:"Erreur, veuillez rééssayer ou contacter un administrateur"});
        });
        
    }
  }
};
</script>