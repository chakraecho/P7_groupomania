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
                :src="profilImgUrl"
                :alt="'photo de profil de ' + firstName + ' ' + lastName"
                class="img-profil"
              />
            </div>
          </v-container>
          <div class="name-card-wrapper">
            <v-card class="name-card">
              <h1>{{ firstName }} {{ lastName }}</h1>
            </v-card>
          </div>
          <div class="ml-auto mt-2 mr-2" v-if="$store.state.user.userId != userId ">
            <v-btn color="primary" @click="follow">
              {{followed ? 'Ne plus suivre' : 'Suivre'}}
            </v-btn>
          </div>
        </v-row>
      </v-container>
    </v-row>
    <v-row>
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
import postCard from "@/components/post/post.vue";
import commentCard from '@/components/post/comment.vue'

export default {
  components: {
    postCard,
    commentCard
  },
  data() {
    return {
      userId: this.$route.params.id,
      firstName: "",
      lastName: "",
      bannerUrl: "",
      profilImgUrl: "",
      followed : false
    };
  },
  computed:{
      activeComment:{
          get(){
              return this.$store.state.comment.active
          }
      },
      posts:{
        get(){
          return this.$store.state.post.posts
        }
      }
  },
  methods:{
    follow(){
      if(this.followed){
        fetch('http://localhost:3000/api/users/follow/'+ this.$route.params.id, {credentials:'include', method:'delete'})
        .then(() => {
          this.followed = false
        })
        .catch(error => console.log(error))
      }
      else if (!this.followed){
        fetch("http://localhost:3000/api/users/follow/" + this.$route.params.id, {credentials: 'include'})
        .then(()=> this.followed = true)
        .catch(error => console.log(error))
      }
    }
  },
  beforeCreate() {
    fetch("http://localhost:3000/api/users/" + this.$route.params.id)
      .then(response =>
        response.json().then(resparse => {
          const res = resparse.user[0];
          this.firstName = res.firstName;
          this.lastName = res.lastName;
          this.bannerUrl = res.bannerUrl;
          this.profilImgUrl = res.profilImgUrl;
        })
      )
      .catch(error => console.log(error));

    fetch(
      "http://localhost:3000/api/users/" + this.$route.params.id + "/post",
      { credentials: "include" }
    )
      .then(response =>
        response.json().then(res => {
          this.$store.dispatch("post/loadPost", res.posts)
        })
      )
      .catch(error => console.log(error));

    if(this.$route.params.id !== this.$store.state.user.userId){
          fetch('http://localhost:3000/api/users/follow/check/' + this.$route.params.id, {credentials: "include"})
          .then(res => {
            if(res.status === 200){
              this.followed = true
            }
            else if (res.status === 204){
              this.followed = false
            }
          })
          .catch(error => console.log(error))
    }
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