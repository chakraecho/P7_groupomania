<template>
  <v-bottom-sheet v-if="comment_option" v-model="comment_option">
    <v-card>
      <v-btn
          name="alert"
          text
          @click="sendAlert">
        <v-icon>mdi-alert</v-icon>
        Signaler
      </v-btn>
      <v-btn
          name="edit"
          text
          v-if="option_comment.userId === $store.state.user.userId"
          @click="open_edit_dialog()"
      >
        <v-icon>mdi-pencil</v-icon>
        Editer
      </v-btn>
      <v-btn
          name="delete"
          text
          v-if="option_comment.userId === $store.state.user.userId"
          @click="deleteComment()"
      >
        <v-icon>mdi-delete</v-icon>
        Supprimer
      </v-btn>
    </v-card>
    <v-dialog v-model="edit_dialog" class="container">
      <v-card>
        <v-card-title>
          Editer le commentaire
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row></v-row>
            <v-row>
              <v-col>
                <v-col class="mx-auto" cols="11" md="7">
                  <v-textarea
                      name="edit_comment"
                      label="Edition du commentaire"
                      v-model="editComment"
                  >
                  </v-textarea>
                </v-col>
                <v-col cols="4" class="mx-auto"></v-col>
              </v-col>
              <v-col
                  cols="3"
                  class="d-flex flex-column justify-center align-center"
              >
                <v-row>
                  <v-btn name="update" @click="sendEdit()">
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
import {mapGetters} from "vuex";

export default {
  data() {
    return {
      edit_dialog: false,
      editComment: ""
    };
  },
  computed: {
    ...mapGetters("comment", ["option_comment"]),
    comment_option: {
      get() {
        return this.$store.state.comment.option;
      },
      set() {
        return this.$store.commit("comment/CLOSE_OPTION");
      }
    }
  },
  methods: {
    open_edit_dialog() {
      this.edit_dialog = true;
      this.editComment = this.option_comment.content;
    },
    closeAll() {
      this.edit_dialog = false;
      this.editComment = "";
      this.$store.commit("comment/CLOSE_OPTION");
    },
    deleteComment() {
      fetch(
          process.env.VUE_APP_BACKEND + "/api/post/" +
          this.option_comment.commentId +
          "/comment",
          {
            method: "delete",
            credentials: "include"
          }
      )
          .then(response => {
            this.$store.dispatch("comment/setId", {
              postId: this.$store.state.comment.postId
            });
            this.closeAll();
            if (response.ok) {
              this.$store.dispatch("activateSnack", {
                color: "success",
                msg: "Commentaire supprimé !"
              });
              this.$emit('reload-comment')
            } else {
              this.$store.dispatch("activateSnack", {
                color: "error",
                msg: "Erreur lors de la suppression !"
              });
            }
          })
          .catch(error => {
            console.log(error);
            this.$emit("snackbar", {
              color: "error",
              msg: "Erreur, veuillez rééssayer ou contacter un administrateur"
            });
          });
    },
    sendEdit() {
      const body = JSON.stringify({content: this.editComment});

      fetch(
          process.env.VUE_APP_BACKEND + "/api/post/" +
          this.option_comment.commentId +
          "/comment",
          {
            method: "put",
            credentials: "include",
            headers: {"Content-type": "application/json"},
            body
          }
      )
          .then(response =>
              response.json().then(res => {
                this.$store.dispatch("comment/setId", {
                  postId: this.$store.state.comment.postId
                });
                this.closeAll();
                if (response.ok) {
                  this.$store.dispatch("activateSnack", {
                    color: "success",
                    msg: res.message
                  });
                } else {
                  this.$store.dispatch("activateSnack", {
                    color: "error",
                    msg: res.message
                  });
                }
                this.$emit('reload-comment')
              })
          )
          .catch(error => {
            console.log(error);
            this.$emit("snackbar", {
              color: "error",
              msg: "Erreur, veuillez rééssayer ou contacter un administrateur"
            });
          });
    },
    sendAlert() {
      fetch(
          process.env.VUE_APP_BACKEND + "/api/admin/alert/" + this.option_post.postId,
          {
            credentials: "include",
            method: "post",
            headers: {"Content-type": "application/json"},
            body: JSON.stringify({
              message: this.alert_msg,
              type: "comment"
            })
          }
      )
          .then(response => {
            this.closeAll();
            if (response.ok) {
              this.$store.dispatch('activateSnack', {color: "success", msg: "commentaire signalé !"})
            } else {
              this.$store.dispatch('activateSnack', {
                color: "error",
                msg: "Erreur lors du signalement, contactez directement un administrateur."
              })
            }
          })
          .catch(error => {
            console.log(error);
            this.closeAll();
            this.$emit("snackbar", {
              color: "error",
              msg: "Erreur, veuillez rééssayer ou contacter un administrateur"
            });
          });
    }
  }
};
</script>