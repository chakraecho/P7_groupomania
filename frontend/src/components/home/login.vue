<template>
  <div class="login">
    <div class="row">
      <div class="container  align-items-around m-0">
        <form>
          <div class="col-12 form-group">
            <label for="email">email:</label>
            <input
              type="email"
              pattern="[a-zA-Z0-9._\-]+@[a-zA-Z0-9._\-]+\.[a-zA-Z]{2,10}"
              required
              name="email"
              class="form-control" 
              v-model='email'
            />
          </div>
          <div class="col-12 form-group">
            <label for="password">Mot de passe :</label>
            <input type="password" class="form-control" name="password" v-model='password' />
          </div>
          <div class="row">
            <div class="offset-md-3 mx-auto col-12 col-md-9">
              <button type="submit" @click.prevent='submitLogin()' class="btn btn-primary">Connexion</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  data:function(){
    return{
      email:'',
      password:''
    }
  },
  methods:{
    submitLogin: function(){
      const email = this.email;
      const password = this.password;
      const body = JSON.stringify({email, password})
      fetch('http://localhost:3000/api/auth/login', {method:'POST', body:body})
  
    }
  }
};
</script>

<style>

</style>