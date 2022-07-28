<script>
export default {
  data: function () {
    return {
      message: "Home",
    };
  },
  created: function () {
    if (localStorage.userId) {
      this.$router.push(`/users/${localStorage.userId}`);
    } else {
      this.$router.push("/login");
    }
  },
  methods: {},
};
</script>

<template>
  <div class="home">
    <h1>{{ message }}</h1>
  </div>
</template>

<style></style>
