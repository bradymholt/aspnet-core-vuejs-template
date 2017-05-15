<template>
  <div>
    <form class="formAuth" v-on:submit.prevent="onSubmit">
      <h2 class="formAuthHeading">Please sign in</h2>
      <div v-if="isConfirmed" class="alert alert-success" role="alert">
        Your email address has been successfully confirmed.
      </div>
      <div v-if="isExpired" class="alert alert-info" role="alert">
        <strong>Sesion Expired</strong> You need to sign in again.
      </div>
      <div v-if="isSignedOut" class="alert alert-info" role="alert">
        <strong>Signed Out</strong>
      </div>
      <div v-if="error" class="alert alert-danger" role="alert">
        {{error}}
      </div>
      <label htmlFor="inputEmail" class="form-control-label sr-only">Email address</label>
      <input type="email" id="inputEmail" v-model="username" class="form-control form-control-danger" placeholder="Email address" />
      <label htmlFor="inputPassword" class="form-control-label sr-only">Password</label>
      <input type="password" id="inputPassword" v-model="password" class="form-control" placeholder="Password" />
      <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
    </form>
    <div class="authEtc">
      <router-link to="/register">Register</router-link>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import AuthService from '../services/Auth';

@Component
export default class SignIn extends Vue {
  username: string = "user@test.com";
  password: string = "P2ssw0rd!";
  error: string = null;

  get isConfirmed() {
    return this.$route.query.confirmed;
  }

  get isExpired() {
    return this.$route.query.expired;
  }

  get isSignedOut() {
    return this.$route.query.signedOut;
  }

  onSubmit() {
    let authService = new AuthService();
    authService.signIn(this.username, this.password).then(response => {
      if (!response.is_error) {
        this.$router.push({ path: '/contacts' });
      } else {
        this.error = response.error_content.error_description;
      }
    });
  }

}
</script>

<style scoped lang="stylus">
</style>
