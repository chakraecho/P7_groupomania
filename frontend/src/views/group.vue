<template>
  <v-container fluid class="pt-0 ma-0">
    <v-row>
      <v-container fluid class="pt-0">
        <v-row>
          <v-container
            fluid
            class="banner-block pa-0 d-flex align-center justify-center"
            :style="{ 'background-image': 'url(' + bannerUrl + ')' }"
            style="background-size : cover"
          >
            <div
              class="img-profil-wrapper rounded-circle d-flex align-items-center justify-center"
            >
              <img
                :src="imgUrl"
                :alt="'photo de profil de ' + groupName"
                class="img-profil"
              />
            </div>
          </v-container>
          <div class="name-card-wrapper">
            <v-card class="name-card">
              <h1>{{ groupName }}</h1>
            </v-card>
          </div>
        </v-row>
      </v-container>
    </v-row>
    <v-row class="mt-5">
      <v-container>
    <v-row>
      <v-col cols="12" md="6" class="mx-auto">
        <postCreator @send="sendPost" ref="postcreator" />
      </v-col>
    </v-row>
      </v-container>
      <v-container class="mt-5 pt-5">
        <v-row justify="center">
          <v-col cols="11" md="6" lg="5">
            <v-row
              justify="center"
              v-for="post in posts"
              :key="'post_' + post.postId"
            >
              <v-col>
                <postCard
                  :post="post"
                   :dataId="post.postId" 
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
        <options
    @snackbar="activateSnack($event.color, $event.msg)" />
        <v-snackbar v-model="snackbar" timeout="4000" :color="snackbarColor" top right>
      {{ snackbarMsg }}
    </v-snackbar>
  </v-container>
</template>

<script>
import postCard from "@/components/post/post.vue";
import commentCard from '@/components/post/comment.vue'
import postCreator from "@/components/post/createPost.vue"
import options from "@/components/post/option.vue"

export default {
  components: {
    postCard,
    commentCard,
    postCreator,
    options
  },
  data() {
    return {
      userId: this.$route.params.id,
      groupName : '',
      bannerUrl: "",
      imgUrl: "",
      posts: [],
                  snackbar: false,
      snackbarColor: "",
      snackbarMsg :"",
    };
  },
  methods:{
            activateSnack(color, msg) {
      this.snackbar = true;
      this.snackbarColor = color;
      this.snackbarMsg = msg;
    },
  },
  computed:{
      activeComment:{
          get(){
              return this.$store.state.comment.active
          }
      }
  },
  beforeCreate() {
    fetch("http://localhost:3000/api/group/" + this.$route.params.id)
      .then(response =>
        response.json().then(resparse => {
          const res = resparse.group[0];
          this.groupName = res.groupName
          this.bannerUrl = res.bannerUrl;
          this.imgUrl = res.imgUrl;
        })
      )
      .catch(error => console.log(error));
    fetch(
      "http://localhost:3000/api/group/" + this.$route.params.id + "/post",
      { credentials: "include" }
    )
      .then(response =>
        response.json().then(res => {
          this.posts = res.posts;
        })
      )
      .catch(error => console.log(error));
  }
};
</script>

<style lang="scss">
.banner {
  &-block {
    height: 30vh;
    overflow: hidden;
  }
}

.img {
  &-banner {
    height: 100%;
    border: solid 1px grey;
  }
  &-profil {
    width: 80%;

    &-wrapper {
      width: 10vw;
      height: 10vw;
      background-color: white;
      overflow: hidden;
      position: relative;
    }
  }
}

.name-card {
  margin: auto;
  width: max-content;
  padding: 10px;
  &-wrapper {
    position: absolute;
    top: 27vh;
    margin: auto;
    width: 100%;
  }
}
</style>