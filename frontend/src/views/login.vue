<template>
  <main class="connexion-page">
    <div class='container mt-5'>
      <div class='row'>
        <div class='col-12 col-md-6 col-lg-8'>
          <h1>Bienvenue sur le réseau social de Groupomania</h1>
        </div>
        <section class='col-12 col-md-6 col-lg-4 border p-0'>
          <connexionBlock></connexionBlock>
        </section>
      </div>
    </div>
  </main>
</template>

<script>
// @ is an alias to /src
import connexionBlock from '@/components/home/connexion.vue'

export default {
  name: 'login',
  components:{
    connexionBlock
    
  }
 
}
</script>
