<template>
  <v-bottom-sheet v-if="post_option" v-model="post_option">
    <v-card>
      <v-btn text
             aria-label="alert"
             name="alert"
      @click="alert_dialog = true"
      >
        <v-icon>mdi-alert</v-icon> Signaler
      </v-btn>
      <v-btn
        text
        name="edit"
        aria-label="edit"
        v-if="option_post.userId === $store.state.user.userId"
        @click="open_edit_dialog()"
      >
        <v-icon>mdi-pencil</v-icon> Editer
      </v-btn>
      <v-btn
          name="delete"
        text
        v-if="option_post.userId === $store.state.user.userId"
        @click="deletePost()"
          aria-label="delete"
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
                      name="edit_post"
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
                  <v-btn name="update_post" @click="sendEdit()">
                    Mettre à jour
                  </v-btn>
                </v-row>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-dialog v-model="alert_dialog" class="container">
      <v-row>
        <v-col>
          <v-card>
            <v-card-title>
              Signaler un post
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col>
                    <v-textarea
                        name="alert_post"
                        auto-grow
                        label="Décrivez le problème"
                        v-model="alert_msg"
                    >

                    </v-textarea>
                    <v-btn name="alert_post" text @click="sendAlert">
                      Envoyer
                    </v-btn>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

          </v-card>
        </v-col>
      </v-row>

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
      alert_dialog:false,
      alert_msg : ""
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
      fetch(process.env.VUE_APP_BACKEND + "/api/post/" + this.option_post.postId, {
        method: "delete",
        credentials: "include"
      })
        .then(response => {
          if(!response.ok){
            response.json()
            .then(res =>this.$store.dispatch('activateSnack', {color: "error", msg: res.message})
            )
          } else {
            this.$store.dispatch('activateSnack', {color: "success", msg: "Commentaire supprimé !"})
          }
          this.closeAll();
          this.$emit("reload-post")
        })
        .catch(error => {
          console.log(error);
          this.$store.disptach("activateSnack", {color: "error", msg:"Erreur, veuillez rééssayer ou contacter un administrateur"});
        });
    },
    sendEdit(){
        const body = JSON.stringify({content: this.editComment})

        fetch(process.env.VUE_APP_BACKEND + '/api/post/' + this.option_post.postId.toString() , {
            method:"put",
            credentials : "include",
            headers:{"Content-type": "application/json"},
            body
        })
        .then(response => response.json()
        .then(res => {
          if(response.ok){
            this.$store.dispatch('activateSnack', {color: "success", msg: "Commentaire modifié !"})
          }else {
            this.$store.dispatch('activateSnack', {color: "error", msg: res.message})
          }
          this.$store.commit('post/UPDATE_POST', res.post)
          this.closeAll();
          this.$emit("reload-post")
        }))
        .catch(error => {
          console.log(error);
          this.closeAll();
          this.$emit("snackbar", {color: "error", msg:"Erreur, veuillez rééssayer ou contacter un administrateur"});
        });
        
    },
    sendAlert(){
        fetch(process.env.VUE_APP_BACKEND + '/api/admin/alert/' + this.option_post.postId, {
          credentials: 'include',
          method:"post",
          headers:{"Content-type": "application/json"},
          body: JSON.stringify({
            message : this.alert_msg,
            type: 'post'
          })
        })
      .then(response =>{
        if(response.ok){
          this.closeAll();
          this.$store.dispatch('activateSnack', {color: "success", msg: "Post signalé !"})
        }else {
          response.json()
          .then(res => {
            this.closeAll();
            this.$store.dispatch('activateSnack', {color: "error", msg: res.message})
          })
        }
      })
      .catch((error )=>{
        console.log(error)
        this.closeAll();
        this.$store.dispatch("activateSnack", {color: "error", msg:"Erreur, veuillez rééssayer ou contacter un administrateur"});
      })
    }
  }
};
</script>