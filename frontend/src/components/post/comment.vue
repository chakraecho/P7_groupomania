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
        <v-container>
          <v-row>
            <v-col
              cols="3"
              md="2"
              class=" d-flex flex-column justify-content-between "
            >
              <img
                :src="comment.User.profilImgUrl"
                :alt="
                  'photo de ' +
                    comment.User.firstName +
                    ' ' +
                    comment.User.lastName
                "
                class="rounded-circle w-100"
              />
            </v-col>
            <v-col cols="7">
              <p>{{ comment.content }}</p>
            </v-col>
            <v-btn icon class="ml-auto" @click="$store.dispatch('comment/open_sideoption', comment.commentId)">
              <v-icon>
                mdi-dots-vertical
              </v-icon>
            </v-btn>
          </v-row>
          <v-row align="center" justify="end">
            <v-btn
              :disabled="
                comment.commentLikeds[0]
                  ? comment.commentLikeds[0].type
                    ? true
                    : false
                  : false
              "
              icon
              @click="
                comment.commentLikeds[0]
                  ? comment.commentLikeds[0].type
                    ? commentLike({ id: comment.commentId, value: -1 })
                    : commentLike({ id: comment.commentId, value: 0 })
                  : commentLike({ id: comment.commentId, value: -1 })
              "
            >
              -
            </v-btn>
            <p class="ma-0 pa-0">{{ comment.like - comment.dislike }}</p>
            <v-btn
              :disabled="
                comment.commentLikeds[0]
                  ? comment.commentLikeds[0].type
                    ? false
                    : true
                  : false
              "
              icon
              @click="
                comment.commentLikeds[0]
                  ? comment.commentLikeds[0].type
                    ? commentLike({ id: comment.commentId, value: 0 })
                    : commentLike({ id: comment.commentId, value: 1 })
                  : commentLike({ id: comment.commentId, value: 1 })
              "
            >
              +
            </v-btn>
          </v-row>
        </v-container>
      </v-row>
      <v-row v-if="comments.length === 0">
        Pas de commentaire pour le moment, n'hésitez pas à commenter
      </v-row>
      <v-row align="center">
        <v-col cols="8" md="10" lg="10">
          <v-text-field outline label="commentez !" v-model="content">
          </v-text-field>
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
  data() {
    return {
      content: ""
    };
  },
  computed: {
    comments: {
      get() {
        return this.$store.state.comment.comments;
      }
    }
  },
  methods: {
    sendComment() {
      fetch(
        "http://localhost:3000/api/post/" +
          this.$store.state.comment.postId +
          "/comment",
        {
          method: "post",
          body: JSON.stringify({
            userId: this.$store.state.user.userId,
            content: this.content
          }),
          credentials:"include",
          headers: {
            "Content-Type": "application/json"
          }
        }
      ).then(() => {
        this.$store.dispatch("comment/setId", {
          postId: this.$store.state.comment.postId
        });
      });
    },
    commentLike({ id, value }) {
      fetch("http://localhost:3000/api/post/comment/" + id + "/like", {
        method: "post",
        credentials: "include",
        body: JSON.stringify({ like: parseInt(value) }),
        headers: { "Content-Type": "application/json" }
      })
        .then(response =>
          response.json().then(res => {
            this.$store.commit("comment/UPDATE_COMMENT", res.comment);
          })
        )
        .catch(error => console.log(error));
    }
  }
};
</script>

<style>
</style>