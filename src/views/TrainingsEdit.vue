<script>
import axios from "axios";

export default {
  data: function () {
    return {
      training: {},
      callingClutch: false,
      throwingBigAxe: false,
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
    addThrow: function (throwPoints) {
      var newThrow = {};
      newThrow.points = throwPoints;
      newThrow.clutch_called = this.callingClutch;
      newThrow.big_axe = this.throwingBigAxe;
      newThrow.training_id = this.$route.params.id;
      console.log(newThrow);

      axios.post(`/throws`, newThrow).then((response) => {
        console.log(response.data);
        this.training.throws.push(response.data);
      });
    },
    deleteThrow: function (axeThrow) {
      console.log(axeThrow);
      axios.delete(`/throws/${axeThrow.id}`).then((response) => {
        console.log(response.data);
        var index = this.training.throws.indexOf(axeThrow);
        this.training.throws.splice(index, 1);
      });
    },
  },
};
</script>

<template>
  <div class="TrainingsEdit">
    <h1>{{ training.name }}</h1>

    <input type="checkbox" v-model="throwingBigAxe" />
    Big Axe
    <br />
    <input type="checkbox" v-model="callingClutch" />
    Clutch Called
    <br />
    <button v-on:click="addThrow(0)">0</button>
    <button v-on:click="addThrow(1)">1</button>
    <button v-on:click="addThrow(3)">3</button>
    <button v-on:click="addThrow(5)">5</button>
    <button v-on:click="addThrow(7)">7</button>

    <br />

    <table class="table">
      <thead>
        <tr>
          <th></th>
          <th>Hatchet</th>
          <th>Big Axe</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Throw Count</td>
          <td>{{ training.hatchet_throws.throw_count }}</td>
          <td>{{ training.big_axe_throws.throw_count }}</td>
        </tr>
        <tr>
          <td>Average Axe</td>
          <td v-if="training.hatchet_throws.throw_count > 0">{{ training.hatchet_throws.average_axe }}</td>
          <td v-else>-</td>
          <td v-if="training.big_axe_throws.throw_count > 0">{{ training.big_axe_throws.average_axe }}</td>
          <td v-else>-</td>
        </tr>
        <tr>
          <td>Bullseyes</td>
          <td v-if="training.hatchet_throws.bullseye_accuracy > 0">{{ training.hatchet_throws.bullseye_accuracy }}%</td>
          <td v-else>-</td>
          <td v-if="training.big_axe_throws.bullseye_accuracy > 0">{{ training.big_axe_throws.bullseye_accuracy }}%</td>
          <td v-else>-</td>
        </tr>
        <tr>
          <td>Clutches</td>
          <td v-if="training.hatchet_throws.clutch_accuracy > 0">{{ training.hatchet_throws.clutch_accuracy }}%</td>
          <td v-else>-</td>
          <td v-if="training.big_axe_throws.clutch_accuracy > 0">{{ training.big_axe_throws.clutch_accuracy }}%</td>
          <td v-else>-</td>
        </tr>
      </tbody>
    </table>

    <br />

    <table class="table">
      <thead>
        <tr>
          <th>Throw</th>
          <th>Points</th>
          <th>Throw type</th>
          <th>Clutch called</th>
          <th>Delete</th>
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
          <td><button v-on:click="deleteThrow(axeThrow)">x</button></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style>
table {
  counter-reset: section;
}

.count:before {
  counter-increment: section;
  content: counter(section);
}
</style>
