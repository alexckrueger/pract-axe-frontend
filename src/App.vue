<script>
export default {
  data: function () {
    return {
      userId: "",
      isLoggedIn: "",
    };
  },
  watch: {
    $route: function () {
      this.userId = localStorage.userId;
      this.isLoggedIn = !!localStorage.userId;
    },
  },
};
</script>

<template>
  <nav>
    <div v-if="!isLoggedIn">
      <router-link to="/signup">Signup</router-link>
      |
      <router-link to="/login">Login</router-link>
    </div>
    <div v-else>
      <router-link to="/logout">Logout</router-link>
      |
      <router-link :to="`/users/${userId}`">My Profile</router-link>
      |
      <router-link to="/trainings">My Trainings</router-link>
    </div>
  </nav>
  <router-view />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
