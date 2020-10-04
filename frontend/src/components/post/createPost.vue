<template>
  <v-card class="create-post">
    <v-dialog v-model="success">
        <v-card class="success-dialog">
      <div class="success-checkmark">
        <div class="check-icon">
          <span class="icon-line line-tip"></span>
          <span class="icon-line line-long"></span>
          <div class="icon-circle"></div>
          <div class="icon-fix"></div>
        </div>
      </div>
        </v-card>

    </v-dialog>
    <v-dialog v-model="dialog">
      <v-card class="create-post" :loading="loading">
        <v-row class="align-center justify-center">
          <v-col cols="3" md="2" lg="1">
            <img
              :src="profilImgUrl"
              :alt="'photo de profil de' + getFullName"
              class="w-100"
            />
          </v-col>
          <v-col cols="6" md="9" lg="9">
            <v-textarea
              name="new-comment"
              rows="2"
              dense
              autogrow
              v-model="content"
            >
            </v-textarea>
          </v-col>
          <v-col cols="1" md="1" class="d-flex flex-column">
            <v-btn icon>
              <v-icon>
                mdi-image-plus
              </v-icon>
            </v-btn>
            <v-btn icon @click="$emit('send', { content, image })">
              <v-icon>
                mdi-send
              </v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>
    <v-row class="align-center justify-center">
      <v-col cols="3" md="2" lg="1">
        <img
          :src="profilImgUrl"
          :alt="'photo de profil de' + getFullName"
          class="w-100"
        />
      </v-col>
      <v-col cols="6" md="9" lg="9">
        <v-textarea
          name="new-comment"
          rows="2"
          dense
          autogrow
          v-model="content"
        >
        </v-textarea>
      </v-col>
      <v-col cols="1" md="1" class="d-flex flex-column">
        <v-btn icon @click="dialog = true">
          <v-icon>
            mdi-image-plus
          </v-icon>
        </v-btn>
        <v-btn icon @click="$emit('send')">
          <v-icon>
            mdi-send
          </v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      content: "",
      image: [],
      dialog: false,
      loading: false,
      success: false
    };
  },
  computed: {
    ...mapState("user", ["profilImgUrl"])
  }
};
</script>

<style lang="scss">
.w-100 {
  width: 100%;
}
.w-50 {
  width: 50%;
}



/**
 * Extracted from: SweetAlert
 * Modified by: Istiak Tridip
 */
.success-checkmark {
    width: 80px;
    height: 115px;
    margin: 0 auto;
    
    .check-icon {
        width: 80px;
        height: 80px;
        position: relative;
        border-radius: 50%;
        box-sizing: content-box;
        border: 4px solid #4CAF50;
        
        &::before {
            top: 3px;
            left: -2px;
            width: 30px;
            transform-origin: 100% 50%;
            border-radius: 100px 0 0 100px;
        }
        
        &::after {
            top: 0;
            left: 30px;
            width: 60px;
            transform-origin: 0 50%;
            border-radius: 0 100px 100px 0;
            animation: rotate-circle 4.25s ease-in;
        }
        
        &::before, &::after {
            content: '';
            height: 100px;
            position: absolute;
            background: #FFFFFF;
            transform: rotate(-45deg);
        }
        
        .icon-line {
            height: 5px;
            background-color: #4CAF50;
            display: block;
            border-radius: 2px;
            position: absolute;
            z-index: 10;
            
            &.line-tip {
                top: 46px;
                left: 14px;
                width: 25px;
                transform: rotate(45deg);
                animation: icon-line-tip 0.75s;
            }
            
            &.line-long {
                top: 38px;
                right: 8px;
                width: 47px;
                transform: rotate(-45deg);
                animation: icon-line-long 0.75s;
            }
        }
        
        .icon-circle {
            top: -4px;
            left: -4px;
            z-index: 10;
            width: 80px;
            height: 80px;
            border-radius: 50%;
            position: absolute;
            box-sizing: content-box;
            border: 4px solid rgba(76, 175, 80, .5);
        }
        
        .icon-fix {
            top: 8px;
            width: 5px;
            left: 26px;
            z-index: 1;
            height: 85px;
            position: absolute;
            transform: rotate(-45deg);
            background-color: #FFFFFF;
        }
    }
}

@keyframes rotate-circle {
    0% {
        transform: rotate(-45deg);
    }
    5% {
        transform: rotate(-45deg);
    }
    12% {
        transform: rotate(-405deg);
    }
    100% {
        transform: rotate(-405deg);
    }
}

@keyframes icon-line-tip {
    0% {
        width: 0;
        left: 1px;
        top: 19px;
    }
    54% {
        width: 0;
        left: 1px;
        top: 19px;
    }
    70% {
        width: 50px;
        left: -8px;
        top: 37px;
    }
    84% {
        width: 17px;
        left: 21px;
        top: 48px;
    }
    100% {
        width: 25px;
        left: 14px;
        top: 45px;
    }
}

@keyframes icon-line-long {
    0% {
        width: 0;
        right: 46px;
        top: 54px;
    }
    65% {
        width: 0;
        right: 46px;
        top: 54px;
    }
    84% {
        width: 55px;
        right: 0px;
        top: 35px;
    }
    100% {
        width: 47px;
        right: 8px;
        top: 38px;
    }
}
</style>