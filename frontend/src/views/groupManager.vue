<template>
  <v-container fluid>
    <v-dialog persistent v-model="success" width="400">
      <v-card>
        <v-card-text>
          <p v-if="create_group_success">
            Le groupe à été créé !
          </p>
        </v-card-text>
        <v-card-actions>
          <v-btn name="group_button" text @click="$router.push('/group/' + create_groupId)">
            Y aller !
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-row>
      <v-col cols="11" md="8" class="mx-auto">
        <v-card>
          <v-container>
            <v-row class="btn-row">
              <v-col
                cols="4"
                @click="selectedBlock = 'loadGroup'"
                class="btn-group"
              >
                Vos groupes
              </v-col>
              <v-col
                cols="4"
                @click="selectedBlock = 'createGroup'"
                class="btn-group"
              >
                Créer
              </v-col>
              <v-col
                cols="4"
                @click="selectedBlock = 'searchBlock'"
                class="btn-group"
              >
                Rechercher
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <!-- LOAD group -->
                <!-- LOAD group -->
                <!-- LOAD group -->
                <!-- LOAD group -->
                <!-- LOAD group -->
                <v-expand-transition v-if="selectedBlock === 'loadGroup'">
                  <getGroup />
                </v-expand-transition>
                <!-- CREATE group -->
                <!-- CREATE group -->
                <!-- CREATE group -->
                <!-- CREATE group -->
                <!-- CREATE group -->
                <v-expand-transition v-if="selectedBlock === 'createGroup'">
                  <v-container>
                    <v-row>
                      <v-col cols="6" class="mx-auto" md="4">
                        <v-text-field
                          outline
                          label="Nom du groupe"
                          v-model="c_group_name"
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
                    <v-row>
                      <v-col>
                        <v-textarea
                          rows="2"
                          placeholder="Une petite description peut être ?"
                          v-model="description"
                        >
                        </v-textarea>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="4" md="3">
                        <v-btn name="create_group" @click="createGroup">
                          Créer le groupe !
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-expand-transition>
                <!-- SEARCH group -->
                <!-- SEARCH group -->
                <!-- SEARCH group -->
                <!-- SEARCH group -->
                <!-- SEARCH group -->

                <v-expand-transition v-if="selectedBlock === 'searchBlock'">
                  <v-container>
                    <v-row>
                      <v-col cols="10" class="mx-auto">
                        <v-text-field
                          v-model="inputSearch"
                          label="Rechercher un groupe"
                          @change="searchGroup()"
                        >
                        </v-text-field>
                      </v-col>
                    </v-row>
                    <v-container>
                      <h2>
                        Liste des groupes
                      </h2>
                      <v-row>
                        <v-container>
                          <template v-if="input">
                            <template v-if="groups.length > 0">
                              <v-row
                                v-for="group in groups"
                                :key="group.groupName"
                              >
                                <v-col>
                                  <v-card>
                                    <v-row>
                                      <v-col cols="4" md="2" lg="1">
                                        <div class="img--wrapper">
                                          <img
                                            :src="group.imgUrl"
                                            :alt="
                                              'image de groupe de ' +
                                                group.groupName
                                            "
                                          />
                                        </div>
                                      </v-col>
                                      <v-col>
                                        {{ group.groupName }}
                                      </v-col>
                                      <v-col>
                                        <v-btn
                                            name="go_to_group"
                                          color="primary"
                                          @click="
                                            $router.push(
                                              '/group/' + group.groupId
                                            )
                                          "
                                        >
                                          Y aller
                                        </v-btn>
                                      </v-col>
                                    </v-row>
                                  </v-card>
                                </v-col>
                              </v-row>
                              <div class="pagination">
                                <div class="block-icon">
                                  <button
                                    :disabled="links.first === links.last"
                                    @click="searchGroup(links.first)"
                                    aria-label="first"
                                  >
                                    <v-icon  color="black">mdi-page-first</v-icon>
                                  </button>
                                  <button
                                    :disabled="
                                      links.prev === null ||
                                        links.prev === links.next
                                    "
                                    @click="searchGroup(links.prev)"
                                    aria-label="previous"
                                  >
                                    <v-icon  color="black">mdi-chevron-left</v-icon>
                                  </button>
                                  <span class="current-page">{{
                                    current_page
                                  }}</span>
                                  <button
                                    :disabled="
                                      links.next === null ||
                                        links.prev === links.next
                                    "
                                    @click="searchGroup(links.next)"
                                    aria-label="next"
                                  >
                                    <v-icon  color="black">mdi-chevron-right</v-icon>
                                  </button>
                                  <button
                                    :disabled="links.first === links.last"
                                    @click="searchGroup(links.last)"
                                    aria-label="last"
                                  >
                                    <v-icon  color="black">mdi-page-last</v-icon>
                                  </button>
                                </div>
                              </div>
                            </template>
                            <template v-else>
                              Aucun groupe trouvé !
                            </template>
                          </template>
                          <template v-else>
                            <p>Veuillez rechercher un groupe</p>
                          </template>
                        </v-container>
                      </v-row>
                    </v-container>
                  </v-container>
                </v-expand-transition>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import getGroup from "@/components/group/ownGroup.vue";

export default {
  name : "groupManager",

  metaInfo :{
      title : "Menu de groupe",
      meta : [{
        name : "description",
        content : "Créer, rechercher ou affichez vos groupe"
      }]
  },


  components: {
    getGroup
  },
  data() {
    return {
      selectedBlock: "loadGroup",
      c_group_name: "",
      bannerImg: undefined,
      profilImg: undefined,
      description: "",
      success: false,
      create_group_success: false,
      create_groupId: "",
      inputSearch: "",
      groups: [],
      current_page: 1,
      links: {}
    };
  },
  computed: {
    input() {
      if (this.inputSearch.length > 0) {
        return true;
      } else {
        return false;
      }
    }
  },
  watch: {
    selectedBlock() {
      this.inputSearch = "";
    }
  },
  methods: {
    createGroup() {
      let body = new FormData();
      body.append(
        "body",
        JSON.stringify({
          groupName: this.c_group_name,
          description: this.description,
          userId: this.$store.state.user.userId
        })
      );

      if (this.bannerImg !== undefined) {
        body.append("bannerImg", this.bannerImg);
      }
      if (this.profilImg !== undefined) {
        body.append("profileImg", this.profilImg);
      }

      fetch(process.env.VUE_APP_BACKEND + "/api/group/", {
        body,
        method: "POST",
        credentials: "include"
      })
        .then(response => {
          response.json().then(res => {
            if(response.ok){
            this.create_group_success = true;
            this.success = true;
            this.create_groupId = res.group.groupId;
            }else {
              this.$store.dispatch('activateSnack', {color : "error", msg : res.message})
            }

          });
        })
        .catch(error => console.log(error));
    },
    searchGroup(link) {
      if (link === undefined) {
        link =
          process.env.VUE_APP_BACKEND + "/api/group/search?group=" + this.inputSearch;
      }
      if (this.inputSearch.length > 0) {
        fetch(link, {
          credentials: "include"
        }).then(response =>
          response.json().then(res => {
            this.$set(this, "groups", res.result.docs);
            this.$set(this, "links", res.links);
            this.$set(this, "current_page", res.current_page);
          })
        );
      }
    }
  }
};
</script>


<style scoped>
.btn-group {
  cursor: pointer;
}

.btn-row {
  border-bottom: 2px solid grey;
}
</style>