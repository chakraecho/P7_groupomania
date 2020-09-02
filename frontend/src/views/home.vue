<template>
  <div class="container-fluid">
    <div class="row">
      <navbar
        class="col-6 col-md-3 col-lg-2 px-0 d-flex flex-column justify-content-between align-items-center position-sticky border-right"
      />
      <div class="col-12 col-md-8 col-lg-10 pl-0">
        <div class="col border-bottom p-2">
          <postCreator />
        </div>
      </div>
      <div class="container">
        <template v-for="post in posts">
          <post name="this.getFullName" date="post.date" like="post.like" :key="post" />
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import navbar from "@/components/side-navbar.vue";
import postCreator from "@/components/post/postCreator";
import post from "./../components/post/post";
import { mapGetters } from "vuex";

export default {
  components: {
    navbar,
    postCreator,
    post,
  },
  mounted: function () {
    console.log(this);
    this.getAllPost();
  },
  computed: {
    ...mapGetters("profil", ["getFullName"]),
  },
  methods: {
    getAllPost: function () {
      fetch("http://localhost:3000/api/post/", {
        method: "GET",
        credentials: "include",
      })
        .then((res) =>
          res.json().then((response) => {
            return (this.posts = response);
          })
        )
        .catch((error) => {
          return console.log(error);
        });
    },
  },

  data() {
    return {
      posts: {},
    };
  },
};
</script>

<style lang='scss'>
</style>