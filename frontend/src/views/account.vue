<template>
    <v-container>
    <v-row>
        <v-container>
            <v-row>
                <v-container fluid class="banner-block">
                    <img :src="bannerUrl" :alt="'photo de bannière de ' + firstName + ' '+ lastName" class="img-banner"/>
                    <img :src="profilImg" :alt="'photo de profil de ' + firstName + ' '+ lastName" class="img-profil" />
                </v-container>
            </v-row>    
        </v-container>
    </v-row>
    </v-container>
</template>

<script>
export default {
    data(){
        return{
            userId: this.$route.params.id,
            firstName:'',
            lastName: '',
            bannerUrl:'',
            profilImgUrl:''
        }
    },
    beforeCreate(){
        fetch('http://localhost:3000/api/users/' + this.$route.params.id)
        .then(res => console.log(res))
    }

}
</script>

<style lang="scss">
.banner{
    &-block{
        position:relative;
        height:30vh;
    }
}
.img{
    &-banner{
        width:100%
    }
    &-profil{
        position:absolute;
        top: 50%; left:50%; z-index:2;
    }
}
</style>