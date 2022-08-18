<script>
import axios from "axios";

export default {
  data: function () {
    return {
      training: {},
    };
  },
  created: function () {
    axios.get(`/trainings/${this.$route.params.id}.json`).then((response) => {
      this.training = response.data;
      console.log(response.data);
    });
  },
  methods: {
    throwTypeName: function (axeThrow) {
      if (axeThrow.big_axe) {
        return "Big Axe";
      } else {
        return "Hatchet";
      }
    },
    clutchCalledName: function (axeThrow) {
      if (axeThrow.clutch_called) {
        return "Yes";
      } else {
        return "No";
      }
    },
  },
};
</script>

<template>
  <div class="TrainingsShow container pt-3 text-center">
    <div class="col"></div>

    <router-link class="btn btn-dark" :to="`/trainings/${this.$route.params.id}/edit`">Continue Training</router-link>
    <table class="table table-bordered mt-3">
      <thead>
        <tr>
          <th colspan="3">{{ training.name }}</th>
        </tr>
      </thead>
      <thead>
        <tr>
          <th scope="col"></th>
          <th scope="col">Hatchet</th>
          <th scope="col">Big Axe</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">Throw Count</th>
          <td>{{ training.hatchet_throws.throw_count }}</td>
          <td>{{ training.big_axe_throws.throw_count }}</td>
        </tr>
        <tr>
          <th scope="row">Average Axe</th>
          <td v-if="training.hatchet_throws.throw_count > 0">{{ training.hatchet_throws.average_axe }}</td>
          <td v-else>-</td>
          <td v-if="training.big_axe_throws.throw_count > 0">{{ training.big_axe_throws.average_axe }}</td>
          <td v-else>-</td>
        </tr>
        <tr>
          <th scope="row">Bullseye Accuracy</th>
          <td v-if="training.hatchet_throws.bullseye_accuracy > 0">{{ training.hatchet_throws.bullseye_accuracy }}%</td>
          <td v-else>-</td>
          <td v-if="training.big_axe_throws.bullseye_accuracy > 0">{{ training.big_axe_throws.bullseye_accuracy }}%</td>
          <td v-else>-</td>
        </tr>
        <tr>
          <th scope="row">Clutch Accuracy</th>
          <td v-if="training.hatchet_throws.clutch_accuracy > 0">{{ training.hatchet_throws.clutch_accuracy }}%</td>
          <td v-else>-</td>
          <td v-if="training.big_axe_throws.clutch_accuracy > 0">{{ training.big_axe_throws.clutch_accuracy }}%</td>
          <td v-else>-</td>
        </tr>
      </tbody>
    </table>

    <br />

    <a class="btn btn-dark" href="">Share with a friend! (coming soon)</a>
    <!-- Some 3rd party library that shares a custom image/text with a text message? -->

    <table class="table table-striped mt-3">
      <thead>
        <tr>
          <th>Throw #</th>
          <th>Points</th>
          <th>Throw type</th>
          <th>Clutch called</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="axeThrow in training.throws" v-bind:key="axeThrow.id">
          <td class="count"></td>
          <td>
            <b>{{ axeThrow.points }}</b>
          </td>
          <td>{{ throwTypeName(axeThrow) }}</td>
          <td>{{ clutchCalledName(axeThrow) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style></style>
