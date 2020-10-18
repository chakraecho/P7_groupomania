<template>
  <v-card>
    <v-card-title>
      <v-row justify-space-between>
        <v-col>
          <p>{{ firstName }} {{ lastName }}</p>
        </v-col>
        <v-col>
          <p>{{ date }}</p>
        </v-col>
      </v-row>
    </v-card-title>
    <v-card-text>
      {{ content }}
    </v-card-text>
    <v-card-actions>
      <v-row justify-space-between>
        <v-col>
          <v-btn
            text
            :disabled="(likefocus == true) ? true : false "
            :class="(likefocus == false) ? 'active-btn' : 'inactive'"
            @click="likefocus === false ? like(0) : like(-1)"
          >
            - 
          </v-btn>
          {{ likes }}
          <v-btn
            text
           :disabled="(likefocus == false) ? true : false "
            :class="(likefocus == true) ? 'active-btn' : 'inactive'"
            @click="likefocus === true ? like(0) : like(1)"
          >
            +
          </v-btn>
        </v-col>
        <v-col>
          <v-btn text @click.native="openComment">
            commentaires
          </v-btn>
        </v-col>
      </v-row>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  props: [
    "post",
    "lastName",
    "date",
    "content",
    "likes",
    "dataId",
    "liked"
  ],
  computed: {
    likefocus() {
      if (this.liked) {
        if (this.liked.length === 0) {
          return null;
        } else if (this.liked.length > 0) {
          if(Object.prototype.hasOwnProperty.call(this.liked[0], 'type')){
                      return this.liked[0].type
          }
          else{
            return null
          }
        }
      }
      else {
        return null
      }
      return null
    }
  },
  methods: {
    openComment() {
      if (this._props.dataId == this.$store.state.comment.postId) {
        this.$store.dispatch("comment/neutraliseComment");
      } else {
        this.$store.dispatch("comment/setId", { postId: this._props.dataId });
      }
    },
    like(like) {
      fetch("http://localhost:3000/api/post/" + this.dataId + "/like", {
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        method: "post",
        body: JSON.stringify({ like })
      }).then(response =>
        response.json().then(res => {
          this.$store.commit('post/UPDATE_POST', res.post)
        })
      );
    }
  }
};
</script>

<style scoped>
.active-btn{
  background-color: grey;
}
</style>
