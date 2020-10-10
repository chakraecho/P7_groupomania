<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>Centre de notification</h1>
      </v-col>
    </v-row>
    <v-row class="mt-4">
      <v-col>
        <v-container>
          <v-row v-for="notification in notifications" :key="notification.id">
            <v-col>
              <v-card>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="2" md="1">
                        <div class="profile--wrapper rounded-circle">
                          <img
                            class="profile--img"
                            :src="notification.creator.profilImgUrl"
                            :alt="
                              'image de profile de ' +
                                notification.creator.lastName +
                                ' ' +
                                notification.creator.firstName
                            "
                          />
                        </div>
                      </v-col>
                      <v-col>
                        <p v-if="notification.groupId === null">
                          {{ notification.creator.lastName }} {{ notification.creator.firstName }} à publié un post !
                        </p>
                        <p v-else>
                          {{ notification.creator.lastName }} {{ notification.creator.firstName }} à publié un post dans le groupe
                        </p>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      notifications: []
    };
  },
  beforeCreate() {
    fetch(
      "http://localhost:3000/api/users/notification/" +
        this.$store.state.user.userId,
      { credentials: "include" }
    )
      .then(response =>
        response.json().then(res => {
          this.notifications = res.result;
        })
      )
      .catch(error => console.log(error));
  }
};
</script>

<style lang="scss">
.profile {
  &--wrapper {
    width: 100%;
  }
  &--img {
    width: 100%;
  }
}
</style>