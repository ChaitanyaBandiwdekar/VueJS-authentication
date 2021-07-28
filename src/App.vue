<template>
  <div id="app">
    <v-app-bar dark class="navbar">
      
      <router-link to="/">
        <v-btn elevation="2" dark>Home</v-btn>
      </router-link>
      
      <router-link to="/about">
        <v-btn elevation="2">About</v-btn>
      </router-link>

      <span v-if="isLoggedIn"> 
        <router-link to="/resources">
          <v-btn elevation="2">Resources</v-btn>
        </router-link> 
        
        <v-btn elevation="2">
          <a @click="logout">Logout</a>
        </v-btn>
      </span>

      <span v-else> 
        <router-link to="/login">
          <v-btn elevation="2">Login</v-btn>
        </router-link> 
        
        <router-link to="/register">
          <v-btn elevation="2">Register</v-btn>
        </router-link> 
      </span>
      
    </v-app-bar>
      
    <router-view />

  </div>
</template>

<script>
export default {
  computed: {
    isLoggedIn: function() {
      return this.$store.getters.isLoggedIn;
    }
  },
  methods: {
    logout: function() {
      this.$store.dispatch("logout").then(() => {
        this.$router.push("/login");
      });
    }
  }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat&display=swap');

#app {
  font-family: 'Montserrat', sans-serif;
}
  
</style>
