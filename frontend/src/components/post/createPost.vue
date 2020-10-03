<template>
  <v-card>
    <v-card-header>
      <v-row justify-space-between>
        <v-col>
          <p>{{ firstName }} {{ lastName }}</p>
        </v-col>
        <v-col>
          <p>{{ date }}</p>
        </v-col>
      </v-row>
    </v-card-header>
    <v-card-text>
      {{ content }}
    </v-card-text>
    <v-card-actions>
      <v-row justify-space-between>
        <v-col>
          <v-btn text>
            -
          </v-btn>
          {{ likes }}
          <v-btn text>
            +
          </v-btn>
        </v-col>
        <v-col>
          <v-btn text>
            commentaires
          </v-btn>
        </v-col>
      </v-row>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  props: ["firstName", "lastName", "date", "content", "likes"]
};
</script>