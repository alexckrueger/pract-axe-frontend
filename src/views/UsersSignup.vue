<script>
import axios from "axios";

export default {
  data: function () {
    return {
      newUserParams: {},
      errors: [],
    };
  },
  methods: {
    submit: function () {
      axios
        .post("/users", this.newUserParams)
        .then((response) => {
          console.log(response.data);
          this.$router.push("/login");
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
  },
};
</script>

<template>
  <div class="signup container">
    <div class="text-center">
      <h1>Signup</h1>
      <div style="color: red">
        <div v-for="error in errors" v-bind:key="error">{{ error }}</div>
      </div>
      <router-link to="/login">Already have an account?</router-link>
    </div>
    <form v-on:submit.prevent="submit()">
      <div class="mb-3">
        <label for="InputName" class="form-label">Name</label>
        <input type="name" v-model="newUserParams.name" class="form-control" />
      </div>
      <div class="mb-3">
        <label for="InputEmail" class="form-label">Email address</label>
        <input type="email" v-model="newUserParams.email" class="form-control" />
      </div>
      <div class="mb-3">
        <label for="InputPassword1" class="form-label">Password</label>
        <input type="password" v-model="newUserParams.password" class="form-control" />
      </div>
      <div class="mb-3">
        <label for="InputPassword2" class="form-label">Password Confirmation</label>
        <input type="password" v-model="newUserParams.password_confirmation" class="form-control" />
      </div>

      <button type="submit" class="btn btn-dark" value="Submit">Create Account</button>
    </form>
  </div>
</template>
