<template>
  <main>
    <div class="row">
      <navbar
        class="col-6 col-md-3 col-lg-2 px-0 d-flex flex-column justify-content-between align-items-center position-sticky border-right"
      />
      <div class="col-12 px-0 col-md-9 col-lg-10">
        <div class="container-fluid col" id="account-header">
          <div class="mx-auto">
            <div class="img-wrapper">
              <img
                :src="bannerUrl"
                :alt="'photo de profil de ' + getFullName"
                class="rounded-circle"
              />
            </div>
            <h1>{{firstName}} {{lastName}}</h1>
          </div>
        </div>
        <div class="col-12">
          <div class="row">
            <div class="col-12 col-md-8 col-lg-9">
              <div class="row border-bottom mb-3">
                <div class="col-10 col-md-8 col-lg-6 offset-1 offset-md-2 offset-lg-2 p-2">
                  <postCreator />
                </div>
              </div>
              <div class="row">
                <post
                  v-for="post in posts"
                  :name="post.User.lastName +' '+ post.User.firstName"
                  :date="post.createdAt"
                  :likes="post.like - post.dislike"
                  :key="post"
                  :content="post.content"
                  :dataId="post.postId"
                  class='col-10 col-md-8 col-lg-7'
                />
                <div class='col-12 col-md-4 col-lg-3'>
                </div>
              </div>
            </div>
            <div class="d-none d-md-block col-md-4 col-lg-3"></div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
import postCreator from "./../components/post/postCreator";
import navbar from "./../components/side-navbar";
import post from "./../components/post/post";
export default {
  components: {
    postCreator,
    navbar,
    post,
  },
  data() {
    return {
      postPresence: false,
    };
  },
  computed: {
    ...mapGetters("profil", ["GetFullName"]),
    ...mapState("profil", [
      "lastName",
      "firstName",
      "bannerUrl",
      "profilImgUrl",
    ]),
    ...mapState("post", ["posts"]),
  },
  methods: {
    ...mapActions("post", ["addPost"]),
  },
  created() {
    fetch(
      "http://localhost:3000/api/users/" + this.$route.params.id + "/post/",
      {
        method: "GET",
        credentials: "include",
      }
    )
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
};
</script>

<style lang="scss" scoped>
#account-header {
  min-height: 20vh;
}
</style>

