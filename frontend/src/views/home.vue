<template>
  <v-container fluid class="pa-0 ma-0" id="post__create">
    <v-row>
      <v-col cols="12" md="6" class="mx-auto">
        <postCreator @send="sendPost" ref="postcreator" />
      </v-col>
    </v-row>
    <v-row>
      <v-container>
        <v-row justify="center">
          <v-col  cols="11" md="6" lg="5">
            <v-row
              justify="center"
              v-for="post in posts"
              :key="'post_' + post.postId"
            >
              <v-col>
                <postCard
                  :firstName="post.User.firstName"
                  :lastName="post.User.lastName"
                  :date="post.updatedAt.split(' ')[0]"
                  :content="post.content"
                  :likes="post.like - post.dislike"
                  :dataId="post.postId"
                  :liked="post.userLikeds"
                />
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="11" md="5" lg="4" class="pl-3" v-if="activeComment">
            <commentCard />
          </v-col>
        </v-row>
      </v-container>
    </v-row>
  </v-container>
</template>

<script>
// @ is an alias to /src
import postCreator from "@/components/post/createPost.vue";
import postCard from "@/components/post/post.vue";
import commentCard from "@/components/post/comment.vue";

export default {
  name: "Home",
  components: {
    postCreator,
    postCard,
    commentCard
  },
  computed: {
    posts: {
      get() {
        return this.$store.state.post.posts;
      }
    },
    activeComment: {
      get() {
        return this.$store.state.comment.active;
      }
    }
  },
  methods: {
    sendPost() {
      this.$refs.postcreator.loading = true;
      fetch("http://localhost:3000/api/post/submit", {
        method: "POST",
        body: JSON.stringify({
          userId: this.$store.state.user.userId,
          content: this.$refs.postcreator.content
        }),
        headers: { "Content-Type": "application/json" },
        credentials:'include'
      }).then(() => {
        this.$refs.postcreator.loading = false;
        this.$refs.postcreator.success = true;
        setTimeout(() => {
          this.$refs.postcreator.success = false;
        }, 1000);
      });
    }
  },
  beforeCreate() {
    fetch("http://localhost:3000/api/post/", {credentials: 'include'})
      .then(response =>
        response
          .json()
          .then(res => this.$store.dispatch("post/loadPost", res.posts))
      )
      .catch(error => console.log(error));
  }
};
</script>
<style lang="scss">
#post {
  &__create {
    border-bottom: 1px solid blue;
  }
}
</style>