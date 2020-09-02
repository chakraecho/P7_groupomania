<template>
  <section>
      <div class='container col-10 col-md-10 col-lg-8 post-rounded'>
          <div class='row justify-content-between' :class="this.state ? 'selected' : 'unselected'">
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
          <div class='row ' :class="this.state ? 'selected' : 'unselected'">
              <div class='likes col'>
                  <p>-</p>
                  <p>{{likes}}</p>
                  <p>+</p>
              </div>
              <div class='col'>
                  <p>Commentaires</p>
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