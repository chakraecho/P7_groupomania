<template>
  <main>
    <div class="row">
      <nav>
        <navbar
          class="col-6 col-md-3 col-lg-2 px-0 d-flex flex-column justify-content-between align-items-center border-right"
        />
      </nav>
      <div class="container text-center">
        <h1>Centre de notifications</h1>
        <div class='container'>
            <template v-for='notif in notification'>
                <div class='container' :key='notif' v-if='notif.type === "post"'>
                    <div class='row'>
                        <p>{{notif.from}} à posté un nouveau post !</p>
                    </div>
                </div>
            </template>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { mapActions } from "vuex";
import navbar from "@/components/side-navbar.vue";

export default {
  name: "notifications",
  computed:{
      notification:{
          get(){
              return this.$store.state.notification.notification
          }
      }
  },
  methods: {
    ...mapActions("notification", ["updateNotifications"]),
  },
  mounted: function() {
    this.updateNotifications();
  },
  components: {
    navbar,
  },
};
</script>

<style>
</style>