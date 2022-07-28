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
  <div class="UsersShow">
    <h1>{{ user.name }}</h1>
    <p>{{ user.email }}</p>
    <router-link to="/trainings">My Trainings</router-link>
    <div v-if="user.count_of_trainings > 0">
      <h2>My stats</h2>
      <p>Training Sessions: {{ user.count_of_trainings }}</p>
      <p>Axes Thrown: {{ user.throw_count }}</p>

      <h3>Hatchet Stats</h3>
      <p>Hatchets Thrown: {{ user.hatchet_throws.throw_count }}</p>
      <p>Average Hatchet Score: {{ user.hatchet_throws.average_axe }}</p>
      <p>Bullseye Attempts: {{ user.hatchet_throws.bullseye_attempts }}</p>
      <p>Bullseye Accuracy: {{ user.hatchet_throws.bullseye_accuracy }}%</p>
      <p>Clutch Attempts: {{ user.hatchet_throws.clutch_attempts }}</p>
      <p>Clutch Accuracy: {{ user.hatchet_throws.clutch_accuracy }}%</p>

      <h3>Big Axe Stats</h3>
      <p>Big Axes Thrown: {{ user.big_axe_throws.throw_count }}</p>
      <p>Average Big Axe Score: {{ user.big_axe_throws.average_axe }}</p>
      <p>Bullseye Attempts: {{ user.big_axe_throws.bullseye_attempts }}</p>
      <p>Bullseye Accuracy: {{ user.big_axe_throws.bullseye_accuracy }}%</p>
      <p>Clutch Attempts: {{ user.big_axe_throws.clutch_attempts }}</p>
      <p>Clutch Accuracy: {{ user.big_axe_throws.clutch_accuracy }}%</p>
    </div>
    <div v-else>
      <router-link to="/trainings">Start a Training!</router-link>
    </div>
  </div>
</template>

<style></style>
