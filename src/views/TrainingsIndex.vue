<script>
import axios from "axios";

export default {
  data: function () {
    return {
      trainings: {},
    };
  },
  created: function () {
    axios
      .get(`/trainings.json`)
      .then((response) => {
        this.trainings = response.data;
        console.log(response.data);
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
  <div class="TrainingsIndex">
    <p>{{ trainings }}</p>
  </div>
</template>

<style></style>
