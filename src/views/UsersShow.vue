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
  <div class="UsersShow container text-center">
    <div class="row justify-content-md-center">
      <h1>{{ user.name }}</h1>
      <div v-if="user.count_of_trainings > 0">
        <p>Sessions: {{ user.count_of_trainings }}</p>
        <p>Axes Thrown: {{ user.throw_count }}</p>
        <router-link class="btn btn-dark" to="/trainings">My Trainings</router-link>
      </div>
      <div v-else>
        <router-link to="/trainings">Start a Training!</router-link>
      </div>
    </div>

    <table v-if="user.count_of_trainings > 0" class="table">
      <thead>
        <tr>
          <th scope="col"></th>
          <th scope="col">Hatchet</th>
          <th scope="col">Big Axe</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">Axes Thrown</th>
          <td>{{ user.hatchet_throws.throw_count }}</td>
          <td>{{ user.big_axe_throws.throw_count }}</td>
        </tr>
        <tr>
          <th scope="row">Average Score</th>
          <td>{{ user.hatchet_throws.average_axe }}</td>
          <td>{{ user.big_axe_throws.average_axe }}</td>
        </tr>
        <tr>
          <th scope="row">Bullseye Attempts</th>
          <td>{{ user.hatchet_throws.bullseye_attempts }}</td>
          <td>{{ user.big_axe_throws.bullseye_attempts }}</td>
        </tr>
        <tr>
          <th scope="row">Bullseye Accuracy</th>
          <td>{{ user.hatchet_throws.bullseye_accuracy }}%</td>
          <td>{{ user.big_axe_throws.bullseye_accuracy }}%</td>
        </tr>
        <tr>
          <th scope="row">Clutch Attempts</th>
          <td>{{ user.hatchet_throws.clutch_attempts }}</td>
          <td>{{ user.big_axe_throws.clutch_attempts }}</td>
        </tr>
        <tr>
          <th scope="row">Clutch Accuracy</th>
          <td>{{ user.hatchet_throws.clutch_accuracy }}%</td>
          <td>{{ user.big_axe_throws.clutch_accuracy }}%</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style></style>
