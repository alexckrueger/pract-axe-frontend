<script>
import axios from "axios";

export default {
  data: function () {
    return {
      trainings: {},
      newTraining: { name: "" },
      errorMessage: "",
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
  methods: {
    createTraining: function () {
      if (this.newTraining.name) {
        axios.post(`/trainings`, this.newTraining).then((response) => {
          console.log(response.data);
          this.$router.push(`/trainings/${response.data.id}/edit`);
        });
      } else {
        this.errorMessage = "You must name your training!";
      }
    },
  },
};
</script>

<template>
  <div class="TrainingsIndex container text-center">
    <h1>My Trainings</h1>
    <div class="input-group mb-3">
      <input type="text" class="form-control" placeholder="Training Name" />
      <button class="btn btn-dark" type="button" v-on:click="createTraining()">Start New Training</button>
    </div>
    <p v-if="errorMessage" style="color: red">{{ errorMessage }}</p>

    <table class="table table-bordered table-striped">
      <thead>
        <tr>
          <th scope="col">Training</th>
          <th scope="col">Avg. Axe</th>
          <th scope="col" colspan="4">Hatchet</th>
          <th scope="col" colspan="4">Big Axe</th>
        </tr>
      </thead>
      <tbody class="table-group-divider">
        <tr v-for="training in trainings" v-bind:key="training.id">
          <th scope="row">
            <router-link :to="`/trainings/${training.id}`">{{ training.name }}</router-link>
          </th>
          <td>{{ training.average_axe }}</td>
          <td v-if="training.hatchet_throws.throw_count > 0">{{ training.hatchet_throws.throw_count }}</td>
          <td v-else>-</td>
          <td v-if="training.hatchet_throws.throw_count > 0">{{ training.hatchet_throws.average_axe }}</td>
          <td v-else>-</td>
          <td v-if="training.hatchet_throws.bullseye_accuracy > 0">{{ training.hatchet_throws.bullseye_accuracy }}%</td>
          <td v-else>-</td>
          <td v-if="training.hatchet_throws.clutch_accuracy > 0">{{ training.hatchet_throws.clutch_accuracy }}%</td>
          <td v-else>-</td>
          <td v-if="training.big_axe_throws.throw_count > 0">{{ training.big_axe_throws.throw_count }}</td>
          <td v-else>-</td>
          <td v-if="training.big_axe_throws.throw_count > 0">{{ training.big_axe_throws.average_axe }}</td>
          <td v-else>-</td>
          <td v-if="training.big_axe_throws.bullseye_accuracy > 0">{{ training.big_axe_throws.bullseye_accuracy }}%</td>
          <td v-else>-</td>
          <td v-if="training.big_axe_throws.clutch_accuracy > 0">{{ training.big_axe_throws.clutch_accuracy }}%</td>
          <td v-else>-</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style></style>
