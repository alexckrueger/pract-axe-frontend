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
  <nav class="navbar navbar-expand-lg" style="background-color: #fd7e14">
    <div class="container-fluid">
      <span class="navbar-brand">PractAxe</span>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav">
          <li v-if="!isLoggedIn" class="nav-item">
            <a class="nav-link" href="/signup">Signup</a>
          </li>
          <li v-if="!isLoggedIn" class="nav-item">
            <a class="nav-link" href="/login">Login</a>
          </li>
          <li v-if="isLoggedIn" class="nav-item">
            <a class="nav-link" :href="`/users/${userId}`">My Profile</a>
          </li>
          <li v-if="isLoggedIn" class="nav-item">
            <a class="nav-link" href="/trainings">My Trainings</a>
          </li>
          <li v-if="isLoggedIn" class="nav-item">
            <a class="nav-link" href="/logout">Logout</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <router-view />
</template>

<style></style>
