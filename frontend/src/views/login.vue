<template>
  <v-container fluid class="login-page w-100">
        <v-snackbar
    v-model="snackbar"
    :color="snackColor"
    timeout="5000"
    top right
    >
      {{snackMsg}}
    </v-snackbar>
      <div class='wrapper indigo'>
      </div>
    <v-container align="center">
      <v-row class="position-relative">
        <v-col
          cols="10"
          md="5"
          ld="4"
          offset-md="5"
          offset="1"
          class="position-absolute"
        >
          <v-card>
            <login class="loginBlock"
            @activate-snack="activateSnack"
            />
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
import login from "@/components/login/loginblock.vue";

export default {
  components: {
    login
  },
  data() {
    return {
      snackbar : false,
      snackColor:"",
      snackMsg:""

    };
  },
  methods:{
    activateSnack(color, msg){
      this.snackbar = true;
      this.snackColor = color
      this.snackMsg = msg
    }
  }
};
</script>

<style lang="scss" scoped>
.position-relative {
  position: relative;
}
.position-absolute {
  position: absolute;
  z-index: 2;
}
.login-page{
    position:relative;
    min-height: 90vh;
}
.wrapper{
    height:40vh;
    position: absolute;
    bottom:0px;
    width:100vw;
    left:0px;
}
.loginBlock{
    
    min-height:max-content;
}
</style>