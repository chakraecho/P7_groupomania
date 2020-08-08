<template>
  <div class="connexion-page">
    <div class='container mt-5'>
      <div class='row'>
        <div class='col-12 col-md-6 col-lg-8'>
          Bienvenue sur le réseau social de Groupomania
        </div>
        <div class='col-12 col-md-6 col-lg-4 border p-0'>
          <connexionBlock></connexionBlock>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import connexionBlock from '@/components/home/connexion.vue'
export default {
  name: 'Home',
  components:{
    connexionBlock
    
  }
 
}
</script>
