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
              <v-btn @click="selectedBlock = 'searchGroup'">
                Rechercher un groupe
              </v-btn>
            </v-col>
          </v-row>
          <v-row><v-col>
            
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
      description:"",
      success : false,
      create_group_success : false,
      create_groupId : '',
    };
  },
  methods:{
      createGroup(){
        let body = new FormData()
        body.append("body" , JSON.stringify({
          groupName : this.c_group_name,
          description : this.description,
          userId : this.$store.state.user.userId
        }))

        if(this.bannerImg !== undefined){
          body.append("bannerImg", this.bannerImg)
        }
        if(this.profilImg !== undefined){
          body.append("profileImg", this.profilImg)
        }
          fetch('http://localhost:3000/api/group/', {
              body,
              method:"POST",
              credentials:'include',
          })
          .then(response => {
            response.json().then(
              res => {
                this.create_group_success = true;
                this.success = true;
                this.create_groupId = res.group.groupId
              }
            )
          })
          .catch(error => console.log(error))
      }
  }
};
</script>

<style>
</style>