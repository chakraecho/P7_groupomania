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
          <v-btn text>
            -
          </v-btn>
          {{ likes }}
          <v-btn text>
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

  props: ["firstName", "lastName", "date", "content", "likes", "dataId"],
  methods:{
    openComment(){
      if (this._props.dataId == this.$store.state.comment.postId){
        this.$store.dispatch('comment/neutraliseComment')
      }
      else{
      this.$store.dispatch("comment/setId", {postId:this._props.dataId})

      }
    }
  }
};
</script>