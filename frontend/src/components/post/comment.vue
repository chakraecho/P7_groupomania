<template>
  <aside>
    <div class="border container rounded col-11" :data-id="dataId">
      <div class="red row">
        <p class="text-center">Commentaires</p>
      </div>
      <div class="container-fluid border">
          <div class='row align-items-center' v-for='comment in comments' :key='comment'>
              <div class='col-3 col-md-2 d-flex flex-column justify-content-between '>
                  <img :src='comment.User.profilImgUrl' :alt='"photo de "+ comment.User.firstName +" "+ comment.User.lastName' class='rounded-circle w-100'>
                  <div class='w-100'>
                      <div class='btn'>
                          -
                      </div>
                        <p> {{likes}} </p>
                      <div class='btn'>
                          +
                      </div>
                  </div>
              </div>
              <div class='col-9 col-md-10'>
                  {{comment.content}}
              </div>
          </div>
          <div v-if='comments.length === 0'>
            Pas de commentaire pour le moment, n'hésitez pas à commenter
          </div>
      </div>
      <div class="red row">
        <input class="form-control" ref='commentInput' type="text" v-model="text" />
        <button class='btn btn-primary' aria-label="send" @click='sendComment({content:text, userId:userId}); text = ""'>
          <img src='./../../assets/componentImg/send.svg' alt='envoyer'/>
        </button>
      </div>
    </div>
  </aside>
</template>

<script>
import { mapActions, mapState } from 'vuex';
export default {
  props: ['dataId'],
  data() {
    return {
      text: "",
    };
  },
  computed:{
    ...mapState('profil', ['userId']),
    ...mapState('activeComment',['comments'])
  },
  methods:{
    ...mapActions('activeComment', ['sendComment'])
  },
};
</script>

<style>
</style>