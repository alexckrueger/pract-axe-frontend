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
  <div class="TrainingsIndex">
    <h1>My Trainings</h1>
    <input v-model="newTraining.name" />
    <button v-on:click="createTraining()" placeholder="Training Name">Start New Training</button>
    <p v-if="errorMessage">{{ errorMessage }}</p>

    <table>
      <tr>
        <th>Training</th>
        <th>Avg. Axe</th>
        <th>Hatchets</th>
        <th>H Avg.</th>
        <th>H Bullseye Accuracy</th>
        <th>H Clutch Accuracy</th>
        <th>Big Axes</th>
        <th>BA Avg.</th>
        <th>BA Bullseye Accuracy</th>
        <th>BA Clutch Accuracy</th>
      </tr>
      <tr v-for="training in trainings" v-bind:key="training.id">
        <router-link :to="`/trainings/${training.id}`">
          <td class="clickable">{{ training.name }}</td>
        </router-link>
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
    </table>
  </div>
</template>

<style>
th {
  padding-right: 1em;
  padding-left: 1em;
  border-bottom-style: outset;
  border-right-style: solid;
  border-width: 1px;
}
td {
  padding-right: 1em;
  border-right-style: solid;
  border-bottom-style: solid;
  border-width: 1px;
}
.clickable:hover {
  background-color: yellow;
}
</style>
