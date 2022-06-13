<script>
import axios from "axios";

export default {
  data: function () {
    return {
      user: {},
    };
  },
  created: function () {
    axios
      .get(`/users/${localStorage.userId}.json`)
      .then((response) => {
        this.user = response.data;
      })
      .catch((error) => {
        if (error.response.status == 401) {
          this.$router.push("/login");
        }
      });
  },
  methods: {},
};
</script>

<template>
  <div class="UsersShow">
    <p>{{ user }}</p>
  </div>
</template>

<style></style>
