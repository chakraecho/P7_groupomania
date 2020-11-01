<template>
  <header class="indigo">
    <v-container
      fluid
      class="d-flex flex-column justify-center h-100 pa-0 ma-0"
    >
      <v-row align="center" id="grid-row">
        <v-app-bar-nav-icon
          @click.stop="$emit('handle-nav-bar')"
          class="d-block d-md-none ml-5"
          id="hamburger-button"
        ></v-app-bar-nav-icon>

        <router-link to="/" class="navbar-brand ml-5" id="home-link">
          <img
            src="./../assets/logo/icon-left-font-monochrome-white.png"
            width="150"
            alt="logo de groupomania"
            class="ml-2"
          />
        </router-link>
        <template v-if="isLoggedIn">
          <v-dialog
            v-model="searchDialog"
            fullscreen
            transition="dialog-bottom-transition"
          >
            <v-card>
              <v-toolbar>
                <v-btn icon @click="searchDialog = false">
                  <v-icon>
                    mdi-close
                  </v-icon>
                </v-btn>
                <v-toolbar-title> Recherche ... </v-toolbar-title>
              </v-toolbar>
              <v-container>
                <v-row>
                  <v-col>
                    <v-btn
                      @click="selected = 'users'"
                      :class="selected === 'user' ? 'active-btn' : 'inactive'"
                    >
                      Utilisateurs
                    </v-btn>
                  </v-col>
                  <v-col>
                    <v-btn
                      @click="selected = 'group'"
                      :class="selected === 'group' ? 'active-btn' : 'inactive'"
                    >
                      Groupes
                    </v-btn>
                  </v-col>
                  <v-col>
                    <v-btn
                      @click="selected = 'post'"
                      :class="selected === 'post' ? 'active-btn' : 'inactive'"
                    >
                      Post
                    </v-btn>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="10" class="mx-auto">
                    <v-text-field
                      v-model="searchInput"
                      outlined
                      label="recherchez soit un groupe, soit un utilisateur ..."
                      @change="retrieveData"
                    >
                    </v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-container>
                      <v-row v-if="datas === null">
                        <p>
                          Veuillez taper au moins une lettre dans la barre de
                          recherche
                        </p>
                      </v-row>
                      <v-row v-else-if="datas.length === 0">
                        <p>Aucune données n'a été trouvé !</p>
                      </v-row>
                      <v-row
                        v-else
                        v-for="(data, i) in datas"
                        :key="selected + '_' + i"
                      >
                        <template v-if="selected === 'users'">
                          <v-col>
                            <v-card>
                              <v-container>
                                <v-row justify="space-between" class="px-4">
                                  <div class="img--wrapper rounded-circle">
                                    <img
                                      :src="data.profilImgUrl"
                                      :alt="
                                        'image de ' +
                                          data.firstName +
                                          ' ' +
                                          data.lastName
                                      "
                                      class="img--in"
                                    />
                                  </div>

                                  <v-col>
                                    <p>
                                      {{ data.lastName }} {{ data.firstName }}
                                    </p>
                                  </v-col>
                                  <v-btn
                                    class="ml-auto"
                                    @click="
                                      $router.push('/account/' + data.userId);
                                      searchDialog = false;
                                    "
                                  >
                                    Y aller
                                  </v-btn>
                                </v-row>
                              </v-container>
                            </v-card>
                          </v-col>
                        </template>
                        <template v-else-if="selected === 'group'">
                          <v-col>
                            <v-card>
                              <v-container>
                                <v-row justify="space-between" class="px-4">
                                  <div class="img--wrapper rounded-circle">
                                    <img
                                      :src="data.imgUrl"
                                      :alt="'image de ' + data.groupName"
                                      class="img--in"
                                    />
                                  </div>

                                  <v-col>
                                    <p>
                                      {{ data.groupName }}
                                    </p>
                                  </v-col>
                                  <v-btn
                                    class="ml-auto"
                                    @click="
                                      $router.push('/group/' + data.groupId);
                                      searchDialog = false;
                                    "
                                  >
                                    Y aller
                                  </v-btn>
                                </v-row>
                              </v-container>
                            </v-card>
                          </v-col>
                        </template>
                        <template v-else-if="selected === 'post'">
                          <v-col cols="10" md="7">
                            <post :post="data" :dataId="data.postId" />
                          </v-col>
                          <v-col cols="11" md="5"> </v-col>
                        </template>
                      </v-row>
                    </v-container>
                  </v-col>
                </v-row>
              </v-container>
            </v-card>
          </v-dialog>
          <v-col cols="3" id="searchInputBlock">
            <v-text-field
              @click="searchDialog = true"
              solo
              hide-details
              readonly
              id="searchInput"
            >
            </v-text-field>
          </v-col>
        </template>
      </v-row>
    </v-container>
  </header>
</template>

<script>
import post from "@/components/post/post.vue";

export default {
  components: {
    post
  },
  data() {
    return {
      searchDialog: false,
      searchInput: "",
      datas: null,
      selected: "users"
    };
  },
  computed: {
    isLoggedIn: {
      get() {
        return this.$store.state.isAuth;
      }
    }
  },
  watch: {
    selected() {
      this.searchInput = "";
      this.datas = null;
    }
  },
  methods: {
    retrieveData() {
      fetch(
        "http://localhost:3000/api/" +
          this.selected +
          "/search?" +
          this.selected +
          "=" +
          this.searchInput,
        {
          credentials: "include"
        }
      ).then(async response => {
        const res = await response.json();
        this.datas = res.result.docs;
      });
    }
  }
};
</script>

<style lang="scss">
.h-100 {
  height: 100%;
}
.navbar-brand {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.img {
  &--wrapper {
    overflow: hidden;
    width: 10%;
    border: 1px solid grey;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  &--in {
    width: 100%;
  }
}

@media screen and (max-width: 960px) {
  .img {
    &--wrapper {
      width: 50px;
      height: 50px;
    }
  }
}
</style>