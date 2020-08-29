<template>
  <div class="login">
    <div class="row">
      <div class="container align-items-around m-0">
        <form>
          <div class="col-12 form-group">
            <label for="email">email:</label>
            <input
              type="email"
              pattern="[a-zA-Z0-9._\-]+@[a-zA-Z0-9._\-]+\.[a-zA-Z]{2,10}"
              required
              name="email"
              class="form-control"
              v-model="email"
            />
          </div>
          <div class="col-12 form-group">
            <label for="password">Mot de passe :</label>
            <input type="password" class="form-control" name="password" v-model="password" />
          </div>
          <div class="row">
            <div class="offset-md-3 mx-auto col-12 col-md-9">
              <button type="submit" @click.prevent="submitLogin()" class="btn btn-primary">Connexion</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
import {router} from './../../router/index.js'

export default {
  name: "login",
  data: function () {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    ...mapActions['handleAuth'],
    submitLogin: function () {
      const email = this.email;
      const password = this.password;
      const body = JSON.stringify({ email, password });
      fetch("http://localhost:3000/api/users/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: body,
        credentials: 'include',
      })
      .then(res=>{
        if(res.status === 200){
          console.log(this)
          this.$store.dispatch('handleAuth', true)
          router.push("/home")
        }
        else if(res.status >= 400){
          this.$store.dispatch('handleAuth', false)
        }
      })
      .catch(error => console.log(error))
      ;
    },
    
  },
};
</script>

<style>
</style>