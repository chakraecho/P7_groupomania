<template>
  <v-container fluid>
    <v-dialog persistent v-model="success" width="500">
      <v-card>
        <v-card-text>
          <p v-if="create_group_success">
            Le groupe à été créé !
          </p>
        </v-card-text>
        <v-card-actions>
          <v-btn text @click="$router.push('/group/' + create_groupId)">
            Y aller !
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-row>
      <v-col cols="11" md="8" class="mx-auto">
        <v-container>
          <v-row>
            <v-col>
              <v-btn @click="selectedBlock = 'loadGroup'">
                Vos groupes
              </v-btn>
            </v-col>
            <v-col>
              <v-btn @click="selectedBlock = 'createGroup'">
                Créer un groupe
              </v-btn>
            </v-col>
            <v-col>
              <v-btn @click="selectedBlock = 'searchBlock'">
                Rechercher un groupe
              </v-btn>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <getGroup v-if="selectedBlock === 'loadGroup'" />

              <v-container v-if="selectedBlock === 'createGroup'">
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
                      auto-grow
                      placeholder="Une petite description peut être ?"
                      v-model="description"
                    >
                    </v-textarea>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="4" md="3">
                    <v-btn @click="createGroup">
                      Créer le groupe !
                    </v-btn>
                  </v-col>
                </v-row>
              </v-container>

              <v-container v-if="selectedBlock === 'searchBlock'">
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
                  <v-row>
                    <v-col offset="1">
                      Liste des groupes
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-container>
                      <template v-if="input">
                        <template v-if="groups.length > 0">
                          <v-row v-for="group in groups" :key="group.groupName">
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
                                      color="primary"
                                      @click="
                                        $router.push('/group/' + group.groupId)
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
                              >
                                <v-icon>mdi-page-first</v-icon>
                              </button>
                              <button
                                :disabled="
                                  links.prev === null ||
                                    links.prev === links.next
                                "
                                @click="searchGroup(links.prev)"
                              >
                                <v-icon>mdi-chevron-left</v-icon>
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
                              >
                                <v-icon>mdi-chevron-right</v-icon>
                              </button>
                              <button
                                :disabled="links.first === links.last"
                                @click="searchGroup(links.last)"
                              >
                                <v-icon>mdi-page-last</v-icon>
                              </button>
                            </div>
                          </div>
                        </template>
                        <template v-else>
                          Aucun groupe trouvé !
                        </template>
                      </template>
                      <tempalte v-else>
                        <p>Veuillez rechercher un groupe</p>
                      </tempalte>
                    </v-container>
                  </v-row>
                </v-container>
              </v-container>
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import getGroup from "@/components/group/ownGroup.vue";

export default {
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
      fetch("http://localhost:3000/api/group/", {
        body,
        method: "POST",
        credentials: "include"
      })
        .then(response => {
          response.json().then(res => {
            this.create_group_success = true;
            this.success = true;
            this.create_groupId = res.group.groupId;
          });
        })
        .catch(error => console.log(error));
    },
    searchGroup(link) {
      if (link === undefined) {
        link =
          "http://localhost:3000/api/group/search?group=" + this.inputSearch;
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

<style>
</style>