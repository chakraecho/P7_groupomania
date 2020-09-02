<template>
  <section>
      <div class='container rounded border border-secondary col-10 col-md-10 col-lg-8 post-rounded'>
          <div class='row justify-content-between' :class="this.state ? 'selected' : 'unselected'">
              <div class='col'>
                  <p>{{name}}</p>
              </div>
              <div class='col'>
                  <p>le {{date}}</p>
              </div>
          </div>
          <div class='row'>
              <p class='text-center'>{{content}}</p>
              <div class='container'>
                <slot></slot>
              </div>
          </div>
          <div class='row ' :class="this.state ? 'selected' : 'unselected'">
              <div class='likes pl-5 row col'>
                  <p class='m-0'>-</p>
                  <p class='m-0'>{{likes}}</p>
                  <p class='m-0'>+</p>
              </div>
              <div class='col'>
                  <p class='m-0'>Commentaires</p>
              </div>
          </div>
      </div>
  </section>       
</template>

<script>
export default {
    
    props:{
        name:String,
        date:String,
        likes:Number,
        content: String
    },
    data: function(){
        return {
            selected: false
        }
    },
    methods: {
        select: function(){
            if(this.selected === true){
                this.selected = false
            }
            else if (this.selected === false){
                this.selected = true
            }
        }
    }
}
</script>

<style lang='scss'>
$red:#D7263D;
$blue:#449DD1;
    .unselected{
        background-color: $blue;
    }
    .selected{
        background-color: $red;
    }
</style>