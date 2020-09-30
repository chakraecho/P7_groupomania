<template>
  <main id="loginPage">
      <v-container class='wh-100'>
          <v-row>
            <v-col offset='0' md='6' class='mx-auto mx-md-0'>
                <loginBlock />
            </v-col>
          </v-row>
      </v-container>
  </main>
</template>

<script>
import loginBlock from '@/components/login/loginblock.vue'

export default {
components:{
    loginBlock
}
}
</script>

<style>
#loginPage{
    height:100vh;
    width:100vw;
}
.wh-100{
    height:100%;
    width:100%;
}
</style>