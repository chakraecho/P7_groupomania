<template>
  <v-container>
      <v-row>
          <v-col cols="10" class="mx-auto" md="4">
              <v-text-field
              outline
              label="Nom du groupe"
              v-model="c_group_img"
              >
              </v-text-field>
          </v-col>
      </v-row>  
      <v-row>
          <v-col cols="8" md="4" class="mx-auto">
              <v-file-input
                name="bannerImage"
                outline
                label="Photo de bannière pour le groupe (non requis)"
                v-model="bannerImg"
              >
              </v-file-input>
          </v-col>
      </v-row>
            <v-row>
          <v-col cols="8" md="4" class="mx-auto">
              <v-file-input
                name="profilImg"
                outline
                v-model="profilImg"
                label="Photo de profil pour le groupe (non requis)"
              >
              </v-file-input>
          </v-col>
      </v-row>
  </v-container>
</template>

<script>
export default {

}
</script>

<style>

</style>