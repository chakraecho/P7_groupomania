<template>
  <v-card>
    <v-card-title>
      <p text-center>Commentaires</p>
    </v-card-title>
    <v-container class="container-fluid border">
      <v-row
        class="align-items-center"
        v-for="comment in comments"
        :key="comment"
      >
        <v-col cols="3" md="2" class=" d-flex flex-column justify-content-between ">
          <img
            :src="comment.User.profilImgUrl"
            :alt="
              'photo de ' + comment.User.firstName + ' ' + comment.User.lastName
            "
            class="rounded-circle w-100"
          />
        </v-col>
        <v-col cols="7">
          <p>{{ comment.content }}</p>
        </v-col>
        <v-col cols="1">
            <v-btn text>
              -
            </v-btn>
            <p>{{ likes }}</p>
            <v-btn text>
              +
            </v-btn>
        </v-col>
      </v-row>
      <v-row v-if="comments.length === 0">
        Pas de commentaire pour le moment, n'hésitez pas à commenter
      </v-row>
      <v-row align="center">
        <v-col cols="8" md="10" lg="10">
          <v-text-field outline label="commentez !" v-model="content"> </v-text-field>
        </v-col>
        <v-col cols="3" md="2" lg="1">
          <v-btn icon @click="sendComment">
            <v-icon>
              mdi-send
            </v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
export default {
    data(){
        return{
            content:''
        }
    },
  computed: {
    comments: {
      get() {
        return this.$store.state.comment.comments;
      }
    }
  },
  methods:{
      sendComment(){
          fetch('http://localhost:3000/api/post/' + this.$store.state.comment.postId + '/comment',{
              method:'post',
              body:JSON.stringify({userId: this.$store.state.user.userId, content: this.content}),
              headers:{
                  "Content-Type": "application/json"
              }
          })
          .then(()=>{
              this.$store.dispatch("comment/setId", {postId: this.$store.state.comment.postId})
          })
      }
  }
};
</script>

<style>
</style>