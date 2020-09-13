<template>
  <section>
    <div
      class="offset-lg-2 rounded border border-secondary col-10 mb-4 post-rounded postContainer"
      :data-id="dataId"
    >
      <div
        class="row justify-content-between post-initial"
        :class="this.dataId === this.selectedPostId ? 'select' : 'unselect'"
      >
        <img :src="imgProfilUrl" class="hover-img h-100 rounded-circle post-img" />
        <div class="col">
          <p>{{name}}</p>
        </div>
        <div class="col">
          <p>le {{date}}</p>
        </div>
      </div>
      <div class="row">
        <p class="text-center">{{content}}</p>
        <div class="container">
          <slot></slot>
        </div>
      </div>
      <div class="row" :class="this.dataId === this.selectedPostId ? 'select' : 'unselect'">
        <div class="likes pl-5 row col">
          <p class="m-0">-</p>
          <p class="m-0 px-2">{{likes}}</p>
          <p class="m-0">+</p>
        </div>
        <div class="col">
          <p class="m-0 px-2 py-1 rounded" @click="select()">Commentaires</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  props: {
    name: String,
    date: String,
    likes: Number,
    content: String,
    dataId: Number,
    imgProfilUrl: String,
  },
  data: function () {
    return {};
  },
  methods: {
    ...mapActions("activeComment", ["neutraliseComment", "setId"]),
    select: function () {
      if (this.dataId === this.selectedPostId) {
        this.setId({ postId: null });
        this.neutraliseComment();
      } else if (this.dataId !== this.selectedPostId) {
        this.setId({ postId: this.dataId });
      }
    },
  },
  computed: {
    selectedPostId() {
      return this.$store.activeComment.state.selectedPostId;
    },
    ...mapState("activeComment", ["selectedPostId"]),
  },
};
</script>

<style lang='scss'>
$red: #d7263d;
$blue: #449dd1;
.unselect {
  background-color: $blue;
}
.selected {
  background-color: $red;
}
.post {
  &-initial {
    position: relative;
  }
  &-img {
    position: absolute;
    top: -10px;
    left: -10px;
    height: 100%;
    padding:4px;
    border:black 2px solid;
    width:auto;
    background-color:white;
  }
}
</style>