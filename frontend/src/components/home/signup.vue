<template>
  <div class="signup">
    <div class="row">
      <div class="container align-items-around m-0">
        <form>
          <div class="row">
            <div class="col-6 form-group">
              <label for="name">Nom</label>
              <input type="text" class="form-control" name="name" v-model='name'/>
            </div>
            <div class="col-6 form-group">
              <label for="first-name">Prénom</label>
              <input type="text" class="form-control" name="first-name" v-model='firstName'/>
            </div>
          </div>
          <div class="col-12 form-group">
            <label for="email">email:</label>
            <input
              type="email"
              pattern="[\w-\.]+@([\w-]+\.)+[\w-]{2,4}"
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
              <button type="submit" class="btn btn-primary" @click.prevent='submitSignup()'>Inscription</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "signup",
  data: function () {
    return {
      email:'',
      password:'',
      name:'',
      firstName:''
    };
  },
  methods:{
    submitSignup: function(){
      const email = this.email;
      const password = this.password;
      const lastName = this.name;
      const firstName = this.firstName;
     
      const body = JSON.stringify({email, password, lastName, firstName})
      console.log(body)
      const headers = {
        method:'POST',
        body:body,
        headers:{
        'Content-Type': 'application/json'
        }
      }
      fetch('http://localhost:3000/api/users/auth/signup', headers)
    
    }
  }
}
</script>

<style>
</style>