<template>
  <div class="container-fluid">
    <div class="row">
      <navbar
        class="col-6 col-md-3 col-lg-2 px-0 d-flex flex-column justify-content-between align-items-center position-sticky border-right"
      />
      <div class="col-12 col-md-8 col-lg-10 pl-0">
        <div class="row border-bottom mb-3">
          <div class="col-10 col-md-8 col-lg-6 offset-1 offset-md-2 offset-lg-2 p-2">
            <postCreator />
          </div>
        </div>
        <div class="row">
          <div class="col-8">
            <template v-if="postPresence">
              <post
                v-for="post in posts"
                :name="post.User.lastName +' '+ post.User.firstName"
                :date="post.createdAt"
                :likes="post.like - post.dislike"
                :key="post"
                :content="post.content"
                :dataId="post.postId"
              />
            </template>
            <div v-else class="alert-danger">Chargement des post</div>
          </div>
          <div class="col-4">
            <comment v-if="active" :dataId="commentId"></comment>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import navbar from "@/components/side-navbar.vue";
import postCreator from "@/components/post/postCreator";
import post from "./../components/post/post";
import comment from "./../components/post/comment";
import { mapGetters, mapState, mapActions } from "vuex";

export default {
  components: {
    navbar,
    postCreator,
    post,
    comment,
  },
  computed: {
    ...mapGetters("profil", ["getFullName"]),
    ...mapState("post", ["posts"]),
    ...mapState("activeComment", ["comments", "active", "selectedPostId"]),
  },
  methods: {
    ...mapActions("post", ["addPost"]),
    getAllPost() {
      console.log(this.active);
      fetch("http://localhost:3000/api/post/", {
        method: "GET",
        credentials: "include",
      })
        .then((res) =>
          res.json().then((response) => {
            this.postPresence = true;
            this.addPost(response.posts);
          })
        )
        .catch((error) => {
          return console.log(error);
        });
    },
  },
  created () {
    console.log(this);
    this.getAllPost();
  },

  data() {
    return {
      postPresence: false,
      selectedComment: false,
      commentId: "",
    };
  },
};
</script>

<style lang='scss'>

  .select{
    background-color:#D7263D;
  }
</style>