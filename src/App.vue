<template>
  <nav>
    <router-link to="/">Home</router-link>
    |
    <router-link to="/users/new">Users New</router-link>
    |
    <router-link to="/users/1">Users Show</router-link>
    |
    <router-link to="/trainings">Trainings Index</router-link>
    |
    <router-link to="/trainings/1/edit">Trainings Edit</router-link>
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
