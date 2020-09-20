<template>
  <main>
    <div class="row">
      <navbar
        class="col-6 col-md-3 col-lg-2 px-0 d-flex flex-column justify-content-between align-items-center position-sticky border-right"
      />
      <div class="col-12 px-0 col-md-9 col-lg-10">
        <div
          class="container-fluid col justify-content-center d-flex flex-column align-items-center"
          id="account-header"
          :style="{ backgroundImage: 'url(' + bannerUrl + ')' }"
        >
          <div class="img-wrapper rounded-circle bg-light mx-auto col-1">
            <img
              :src="imgUrl"
              :alt="'photo de profil de ' + getFullName"
              class="rounded-circle w-100"
            />
          </div>
          <h1>{{firstName}} {{lastName}}</h1>
          <div class="row w-100">
            <div class="offset-9 col-3">
              <button
                class="btn"
                @click="followRequest({from: $store.state.profil.userId, to:$route.params.id})"
              >{{followed ? 'Ne plus suivre' : 'Suivre'}}</button>
            </div>
          </div>
        </div>
        <div class="col-12">
          <div class="row">
            <div class="col-12 col-md-8 col-lg-9">
              <div class="row position-relative">
                <div class="col-10 col-md-8 col-lg-7">
                  <post
                    v-for="post in posts"
                    :name="post.User.lastName +' '+ post.User.firstName"
                    :date="post.createdAt"
                    :likes="post.like - post.dislike"
                    :key="post"
                    :content="post.content"
                    :dataId="post.postId"
                  />
                </div>
                <div class="col-12 col-md-4 col-lg-3">
                  <comment v-if="active" class="comment-position" />
                </div>
              </div>
            </div>
            <div class="d-none d-md-block col-md-4 col-lg-3">
              <div class="row">
                <h2>{{getFullName}}</h2>
              </div>
              <div class="row">
                <h2>Service :</h2>
                <p></p>
              </div>
              <div class="row">
                <h2>Poste :</h2>
                <p></p>
              </div>
              <div class="row">
                <h2>A propos de moi :</h2>
                <p></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
import navbar from "./../components/side-navbar";
import post from "./../components/post/post";
import comment from "./../components/post/comment";
export default {
  components: {
    navbar,
    post,
    comment,
  },
  data() {
    return {
      postPresence: false,
    };
  },
  computed: {
    ...mapGetters("account", ["getFullName"]),
    ...mapState("account", ["lastName", "firstName", "bannerUrl", "imgUrl"]),
    ...mapState("post", ["posts"]),
    ...mapState("activeComment", ["comments", "active", "selectedPostId"]),
    ...mapState('profil', ['userId']),
    followed: {
      get() {
        return this.$store.state.account.followed;
      },
    },
  },
  methods: {
    ...mapActions("post", ["addPost"]),
    ...mapActions("account", ["updateAccount", "followRequest", "checkFollow"]),
  },
  created: function () {
    fetch("http://localhost:3000/api/users/" + this.$route.params.id, {
      method: "GET",
      credentials: "include",
    }).then((response) =>
      response.json().then((parsed) => {
        const res = parsed.user[0];
        console.log(parsed);
        this.updateAccount({
          firstName: res.firstName,
          lastName: res.lastName,
          imgUrl: res.profilImgUrl,
          bannerUrl: res.bannerUrl,
        });
      })
    );
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
      console.log(this)
      this.checkFollow({from:this.$store.state.profil.userId, to:this.$route.params.id})
  },
};
</script>

<style lang="scss" scoped>
#account-header {
  min-height: 20vh;
}

@media screen and(max-width:768px) {
  .comment-position {
    position: sticky;
    top: 0px;
    left: 0px;
  }
}
</style>

