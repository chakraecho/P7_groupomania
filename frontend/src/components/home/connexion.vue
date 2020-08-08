<template>
  <div class="connexion-block rounded d-flex flex-column bg-secondary container">
    <div class="row">
      <button
        class="btn col-6 signup-active rounded-top-right w-100"
        @click="changeSignup"
        id="signupButton"
      >Inscription</button>

      <button class="btn col-6 w-100 login-inactive" @click="changeLogin" id="loginButton">Connexion</button>
    </div>
    <div
      class="container-fluid h-100 rounded-top-left d-flex flex-column justify-content-center"
      id="form-block"
    >
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
      document.querySelector("#loginButton").classList.remove("login-inactive");
      document.querySelector("#signupButton").classList.remove("signup-active");

      document.querySelector("#loginButton").classList.add("login-active");
      document.querySelector("#signupButton").classList.add("signup-inactive");
    },
    changeSignup: function () {
      this.selected = "signup";
      document
        .querySelector("#signupButton")
        .classList.remove("signup-inactive");
      document.querySelector("#loginButton").classList.remove("login-active");

      document.querySelector("#signupButton").classList.add("signup-active");
      document.querySelector("#loginButton").classList.add("login-inactive");
    },
  },
};
</script>

<style lang='scss'>
.connexion-block {
  min-height: 50vh;
}
#form-block {
  flex: 1;
}
#signup {
  min-height: 50vh;
  width: 100%;
  &Button {
    border-bottom-right-radius: 0rem;

    &:focus {
      box-shadow: none;
    }
  }
}
#login {
  min-height: 50vh;
  width: 100%;

  &Button {
    border-bottom-left-radius: 0rem;
    &:focus {
      box-shadow: none;
    }
  }
}
.signup {
  &-active {
    border-right: 2px solid white;
    border-top: 2px solid white;
  }
  &-inactive {
    border-bottom: 2px solid white;
  }
}
.login {
  &-active {
    border-left: 2px solid white;
    border-top: 2px solid white;
  }
  &-inactive {
    border-bottom: 2px solid white;
  }
}
</style>