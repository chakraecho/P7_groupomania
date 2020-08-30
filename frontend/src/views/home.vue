<template>
  <div class="container-fluid">
    <div class="row">
        <navbar class="col-6 col-md-3 col-lg-2 d-flex flex-column justify-content-around position-sticky border-right" />
      <div class='col-12 col-md-8 col-lg-10 pl-0 '>
          <div class='col border-bottom p-2'>
            <postCreator />
          </div>
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