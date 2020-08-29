<template>
  <div class="col-11 col-md-8 col-lg-6">
    <div class="row justify-content-around">
      <div class="wrapper col-3 col-md-2 col-lg-1">
        <img :src="myProfilUrl" :alt="myProfilAlt" class="w-100" />
      </div>
      <input type="text" class="form-control col-6 col-md-8 col-lg-9" />
      <div class="col-2 col-md-1 wrapper-img-button">
        <img src="./../../assets/componentImg/add_img.svg" alt="ajouter une image" class="w-100" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "postCreator",
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