<template>
  <section>
      <div class='container col-10 col-md-10 col-lg-8 post-rounded'>
          <div class='row justify-content-between'>
              <div class='col'>
                  <p>{{name}}</p>
              </div>
              <div class='col'>
                  <p>le {{date}}</p>
              </div>
          </div>
          <div class='row'>
              <p>{{content}}</p>
              <div class='container'>
                <slot></slot>
              </div>
          </div>
          <div class='row'>
              <div class='likes col'>
                  <p>-</p>
                  <p>{{likes}}</p>
                  <p>+</p>
              </div>
              <div class='col'>
                  <p>Commentaires</p>
              </div>
          </div>

          
</template>

<script>
export default {
    name:post,
    props:{
        name:String,
        date:String,
        likes:Number,
    }
}
</script>

<style>

</style>