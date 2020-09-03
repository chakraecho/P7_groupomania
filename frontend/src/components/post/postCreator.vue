<template>
  <div
    class="border-rounded border p-1 col-11 col-md-8 col-lg-6 offset-md-1 offset-lg-2 bg-light"
    id="postCreator"
  >
    <div class="row align-items-center justify-content-around">
      <div class="wrapper col-3 col-md-2 col-lg-1">
        <img :src="profilImgUrl" :alt="'photo de profil de' + getFullName" class="w-100" />
      </div>
      <textarea-autosize
        id="newPost"
        type="text"
        class="form-control col-6 col-md-8 col-lg-9"
        placeholder="Comment allez vous aujourd'hui ?"
        @focusin.native="handleFocus(false)"
        @focusout.native="handleFocus(true)"
        v-model="content"
      />
      <div class="col-2 col-md-1 wrapper-img-button">
        <img src="./../../assets/componentImg/add_img.svg" alt="ajouter une image" class="w-100" />
      </div>
      <button class='col-2 col-md-1 wrapper send-button' @click='clickSend'>
        <img src='./../../assets/componentImg/send.svg' alt='envoyer' class='w-100'/>
      </button>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";

export default {
  name: "postCreator",
  data: function () {
    return {
      content:''
    };
  },
  computed: {
    ...mapState("profil", ["profilImgUrl","userId"]),
    ...mapGetters("profil", ["getFullName"]),
  },
  methods: {
    ...mapActions(["handleFocus"]),
    ...mapActions("post",["sendPost"]),
    clickSend: function(){
      const content = this.content
      const userId = this.userId
            console.log(content, userId)
  console.log(this.sendPost)
      this.sendPost({content: content, userId: userId})
    }
  }
};
</script>

<style lang="scss">
$red:#D7263D;
$blue:#449DD1;
.wrapper {
  &-img-button {
    border: $red;
  }
}
#postCreator {
  z-index: 5;
}
.filter {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;
  background-color: black;
  opacity: 0.5;
}
</style>