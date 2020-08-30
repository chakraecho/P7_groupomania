<template>
  <div class=" border-rounded border p-1 col-11 col-md-8 col-lg-6 offset-md-1 offset-lg-2">
    <div class="row align-items-center justify-content-around">
      <div class="wrapper col-3 col-md-2 col-lg-1">
        <img :src="profilImgUrl" :alt="'photo de profil de' + getFullName" class="w-100" />
      </div>
      <input type="text" class="form-control col-6 col-md-8 col-lg-9" />
      <div class="col-2 col-md-1 wrapper-img-button">
        <img src="./../../assets/componentImg/add_img.svg" alt="ajouter une image" class="w-100" />
      </div>
    </div>
  </div>
</template>

<script>
import {mapState, mapGetters} from 'vuex'

export default {
  name: "postCreator",
  data:function(){
    return{
    }
  },
  computed:{
    ...mapState('profil',['profilImgUrl']),
    ...mapGetters('profil',['getFullName'])
  }
};
</script>

<style lang="scss">
@import './../../utils.scss';
.wrapper{
    &-img-button{
        border:$red;
    }
}
</style>