<template>
  <section>
      <div class='offset-lg-2 rounded border border-secondary col-10 mb-4 post-rounded postContainer' :data-id='dataId'>
          <div class='row justify-content-between' :class="this.selected ? 'selected' : 'unselected'">
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
          <div class='row ' :class="this.selected ? 'selected' : 'unselected'">
              <div class='likes pl-5 row col'>
                  <p class='m-0'>-</p>
                  <p class='m-0 px-2'>{{likes}}</p>
                  <p class='m-0'>+</p>
              </div>
              <div class='col'>
                  <p class='m-0 px-2 py-1 rounded' @click='select()'>Commentaires</p>
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
        content: String,
        dataId: Number,
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
                this.$emit('unselectPost')
            }
            else if (this.selected === false){
                this.selected = true
                this.$emit('selectPost', {id : this.dataId})
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