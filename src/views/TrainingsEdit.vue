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
        this.training.throws.unshift(response.data);
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
  <div class="TrainingsEdit container text-center">
    <div class="row">
      <div class="col-md-12 col-lg-6">
        <h1>{{ training.name }}</h1>
        <div class="mt-2">
          <!-- toggles for hatchet type -->
          <input
            type="radio"
            class="btn-check"
            name="axe-type-outlined"
            id="hatchet-outlined"
            autocomplete="off"
            checked
            v-model="throwingBigAxe"
            v-bind:value="false"
          />
          <label class="btn btn-outline-primary" for="hatchet-outlined">Hatchet</label>
          <input
            type="radio"
            class="btn-check"
            name="axe-type-outlined"
            id="big-axe-outlined"
            autocomplete="off"
            v-model="throwingBigAxe"
            v-bind:value="true"
          />
          <label class="btn btn-outline-danger" for="big-axe-outlined">Big Axe</label>
        </div>
        <div class="mt-2">
          <!-- toggles for clutch called -->
          <input
            type="radio"
            class="btn-check"
            name="clutch-call-outlined"
            id="no-clutch-outlined"
            autocomplete="off"
            checked
            v-model="callingClutch"
            v-bind:value="false"
          />
          <label class="btn btn-outline-dark" for="no-clutch-outlined">No Clutch</label>
          <input
            type="radio"
            class="btn-check"
            name="clutch-call-outlined"
            id="clutch-outlined"
            autocomplete="off"
            v-model="callingClutch"
            v-bind:value="true"
          />
          <label class="btn btn-outline-success" for="clutch-outlined">Clutch Called</label>
        </div>
        <div class="mt-4 mb-4">
          <button v-on:click="addThrow(0)" class="btn btn-outline-secondary p-4 fs-4 ms-1">0</button>
          <button v-on:click="addThrow(1)" class="btn btn-outline-primary p-4 fs-4 ms-1">1</button>
          <button v-on:click="addThrow(3)" class="btn btn-outline-danger p-4 fs-4 ms-1">3</button>
          <button v-on:click="addThrow(5)" class="btn btn-outline-dark p-4 fs-4 ms-1">5</button>
          <button v-on:click="addThrow(7)" class="btn btn-outline-success p-4 fs-4 ms-1">7</button>
        </div>
        <router-link :to="`/trainings/${training.id}`" class="btn btn-dark mb-4">Finish Training</router-link>
      </div>
      <div class="col">
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
    </div>
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
