<template>
  <div class="login">
    <div class="row">
      <div class="container bg-light align-items-around m-0">
        <form>
          <div class="col-12 form-group">
            <label for="email">email:</label>
            <input
              type="email"
              pattern="[\w-\.]+@([\w-]+\.)+[\w-]{2,4}"
              required
              name="email"
              class="form-control"
            />
          </div>
          <div class="col-12 form-group">
            <label for="password">Mot de passe :</label>
            <input type="password" class="form-control" name="password" />
          </div>
          <div class="row">
            <div class="offset-md-3 mx-auto col-12 col-md-9">
              <button type="submit" class="btn btn-primary">Connexion</button>
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
};
</script>

<style>

</style>