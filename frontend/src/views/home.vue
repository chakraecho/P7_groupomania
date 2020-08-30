<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-6 col-md-4 col-lg-3">
        <navbar />
      </div>
      <div class='col'>
            <postCreator />
      </div>
    </div>
  </div>
</template>

<script>
import navbar from "@/components/side-navbar.vue";
import postCreator from "@/components/post/postCreator";

export default {
  components: {
    navbar,
    postCreator,
  },
};
</script>

<style>
</style>