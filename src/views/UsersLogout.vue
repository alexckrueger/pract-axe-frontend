<script>
import axios from "axios";

export default {
  created: function () {
    delete axios.defaults.headers.common["Authorization"];
    localStorage.removeItem("jwt");
    localStorage.removeItem("userId");
    this.$router.push("/login");
  },
};
</script>

<template>
  <div class="logout"></div>
</template>
