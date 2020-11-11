<template>
  <v-container fluid class="pa-0 ma-0" id="post__create">
    <v-dialog v-if="$vuetify.breakpoint.xs" v-model="activeComment">
      <commentCard />
    </v-dialog>
    <v-row>
      <v-col cols="12" md="6" class="mx-auto">
        <postCreator ref="postcreator" @send-post="getDataTable()" />
      </v-col>
    </v-row>
    <v-row>
      <v-container>
        <h2  class="white--text">#feeds</h2>
        <template v-if="posts === null"></template>
        <p class="white--text" v-else-if="posts.length === 0">Il n'y a encore aucun post.</p>
        <template v-else-if="posts.length > 0">
        <v-row justify="center">
          <v-col cols="11" md="6" lg="5">
            <v-row
              justify="center"
              v-for="post in posts"
              :key="'post_' + post.postId"
            >
              <v-col>
                <postCard :post="post" :dataId="post.postId" @send-post="getDataTable()" />
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="11" md="5" lg="4" class="pl-3" v-if="$vuetify.breakpoint.mdAndUp && activeComment">
            <commentCard class="comment-position" />
          </v-col>
        </v-row>
        <div class="pagination">
          <div class="block-icon">
            <button
              :disabled="links.first === links.last"
              @click="getDataTable(links.first)"
              aria-label="first"
            >
              <v-icon>mdi-page-first</v-icon>
            </button>
            <button
              :disabled="links.prev === null || links.prev === links.next"
              @click="getDataTable(links.prev)"
              aria-label="previous"
            >
              <v-icon>mdi-chevron-left</v-icon>
            </button>
            <span class="current-page">{{ current_page }}</span>
            <button
              :disabled="links.next === null || links.prev === links.next"
              @click="getDataTable(links.next)"
              aria-label="next"
            >
              <v-icon>mdi-chevron-right</v-icon>
            </button>
            <button
                aria-label="last"
              :disabled="links.first === links.last"
              @click="getDataTable(links.last)"
            >
              <v-icon>mdi-page-last</v-icon>
            </button>
          </div>
        </div>
        </template>

      </v-container>
    </v-row>
    <options @snackbar="activateSnack($event.color, $event.msg)" @reload-post="getDataTable()" />
    <optionComment @snackbar="activateSnack($event.color, $event.msg)"  />
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
  name: "Acceuil",

  metaInfo: {
      title : "Acceuil - groupomania",
      meta:[{
        name : "description",
        content: "Toutes vos infos du réseau social groupomania avec la liste des derniers posts."
      }]
  },

  components: {
    postCreator,
    postCard,
    commentCard,
    options,
    optionComment
  },
  data() {
    return {
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
      },
      set(){
        this.$store.dispatch("comment/neutraliseComment")
      }
    }
  },
  methods: {
    activateSnack(color, msg) {
      this.$store.dispatch('activateSnack', {color, msg})
    },
    getDataTable(link) {
      if (link === undefined) {
        link = process.env.VUE_APP_BACKEND + "/api/post/";
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

.comment-position{
  position:sticky;
  top:10vh;
}
</style>