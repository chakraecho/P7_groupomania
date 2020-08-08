<template>
  <div class="connexion-block container">
    <div class="row">
      <button
        class="btn col-6 border-right rounded-top-right w-100"
        @click="changeSignup"
        id="signupButton"
      >Inscription</button>

      <button
        class="btn col-6 border-left-rounded-top-left w-100"
        @click="changeLogin"
        id="loginButton"
      >Connexion</button>
    </div>
    <div class="container-fluid h-100" id="form-block">
      <signup v-if="selected ==='signup'" />
      <login v-if="selected ==='login'" />
    </div>
  </div>
</template>

<script>
import login from "./login";
import signup from "./signup";

export default {
  name: "connexionBlock",
  components: {
    login,
    signup,
  },
  data: function () {
    return {
      selected: "signup",
    };
  },
  methods: {
    changeLogin: function () {
      this.selected = "login";
    },
    changeSignup: function () {
      this.selected = "signup";
    },
  },
};
</script>

<style lang='scss'>
.connexion-block {
  min-height: 50vh;
}
#form-block {
  position: relative;
}
#signup {
  min-height: 50vh;
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  &Button {
    &:focus {
      box-shadow: none;
    }
  }
}
#login {
  min-height: 50vh;
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  &Button {
    &:focus {
      box-shadow: none;
    }
  }
}
</style>