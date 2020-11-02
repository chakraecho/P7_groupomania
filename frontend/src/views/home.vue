<template>
  <v-container fluid class="pa-0 ma-0" id="post__create">
    <v-row>
      <v-col cols="12" md="6" class="mx-auto">
        <postCreator ref="postcreator" />
      </v-col>
    </v-row>
    <v-row>
      <v-container>
        <v-row justify="center">
          <v-col cols="11" md="6" lg="5">
            <v-row
              justify="center"
              v-for="post in posts"
              :key="'post_' + post.postId"
            >
              <v-col>
                <postCard :post="post" :dataId="post.postId" />
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="11" md="5" lg="4" class="pl-3" v-if="activeComment">
            <commentCard />
          </v-col>
        </v-row>
        <div class="pagination">
          <div class="block-icon">
            <button
              :disabled="links.first === links.last"
              @click="getDataTable(links.first)"
            >
              <v-icon>mdi-page-first</v-icon>
            </button>
            <button
              :disabled="links.prev === null || links.prev === links.next"
              @click="getDataTable(links.prev)"
            >
              <v-icon>mdi-chevron-left</v-icon>
            </button>
            <span class="current-page">{{ current_page }}</span>
            <button
              :disabled="links.next === null || links.prev === links.next"
              @click="getDataTable(links.next)"
            >
              <v-icon>mdi-chevron-right</v-icon>
            </button>
            <button
              :disabled="links.first === links.last"
              @click="getDataTable(links.last)"
            >
              <v-icon>mdi-page-last</v-icon>
            </button>
          </div>
        </div>
      </v-container>
    </v-row>
    <options @snackbar="activateSnack($event.color, $event.msg)" />
    <optionComment @snackbar="activateSnack($event.color, $event.msg)" />
    <v-snackbar
      v-model="snackbar"
      timeout="4000"
      :color="snackbarColor"
      top
      right
    >
      {{ snackbarMsg }}
    </v-snackbar>
  </v-container>
</template>

<script>
// @ is an alias to /src
import postCreator from "@/components/post/createPost.vue";
import postCard from "@/components/post/post.vue";
import commentCard from "@/components/post/comment.vue";
import options from "@/components/post/option.vue";
import optionComment from "@/components/post/option_comment.vue";

export default {
  name: "Home",
  components: {
    postCreator,
    postCard,
    commentCard,
    options,
    optionComment
  },
  data() {
    return {
      snackbar: false,
      snackbarColor: "",
      snackbarMsg: "",
      links: {},
      current_page: 1
    };
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
    activateSnack(color, msg) {
      this.snackbar = true;
      this.snackbarColor = color;
      this.snackbarMsg = msg;
    },
    getDataTable(link) {
      if (link === undefined) {
        link = "http://localhost:3000/api/post/";
      }
      fetch(link, { credentials: "include" })
        .then(response =>
          response
            .json()
            .then(res => {
              this.$store.dispatch("post/loadPost", res.posts)
            this.$set(this, "links", res.links)
            this.$set(this, "current_page", res.current_page)
              })
        )
        .catch(error => console.log(error));
    }
  },
  beforeMount() {
    this.getDataTable();
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