<template>
  <aside>
    <div class="border container rounded col-11" :data-id="dataId">
      <div class="red row">
        <p class="text-center">Commentaires</p>
      </div>
      <div class="row">

      </div>
      <div class="red row">
        <input class="form-control" type="text" v-model="text" />
      </div>
    </div>
  </aside>
</template>

<script>
export default {
  props: {
    dataId: Number,
  },
  data() {
    return {
      comment: {},
      text: "",
    };
  },
  beforeMount() {
    fetch("http://localhost:3000/api/" + this.dataId + "/comment", {
      method: "GET",
      credentials: "include",
    }).then((response) =>
      response.json().then((res) => {
        this.comment = res;
      })
    );
  },
};
</script>

<style>
</style>