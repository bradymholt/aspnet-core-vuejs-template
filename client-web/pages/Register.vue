<template>
  <div>
    <form v-if="!registerComplete" class="formAuth" v-on:submit.prevent="onSubmit">
      <h2 class="formAuthHeading">Please register for access</h2>
      <div v-if="errors.general" class="alert alert-danger" role="alert">
        {{firstError(errors.general)}}
      </div>
      <div v-bind:class="{ 'has-danger': errors.username }" class="form-group">
        <label htmlFor="inputEmail">Email address</label>
        <input type="email" id="inputEmail" v-model="email" class="form-control" placeholder="Email address" />
        <div class="form-control-feedback">{{ firstError(errors.username)}}</div>
      </div>
      <div v-bind:class="{ 'has-danger': errors.password }" class="form-group">
        <label htmlFor="inputPassword">Password</label>
        <input type="password" id="inputPassword" v-model="password" class="form-control" placeholder="Password" />
        <div class="form-control-feedback">{{ firstError(errors.password)}}</div>
      </div>
      <button class="btn btn-lg btn-primary btn-block" type="submit">Sign up</button>
    </form>
    <register-complete v-else v-bind:email="email" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import RegisterComplete from '../components/RegisterComplete.vue';
import AuthService from '../services/Auth';

@Component({components: { RegisterComplete } })
export default class Register extends Vue {
  email: string = "";
  password: string = "";
  registerComplete = false;
  errors: { [key: string]: string } = {};

  onSubmit() {
    let authService = new AuthService();
    authService.register(this.email, this.password).then(response => {
      if (!response.is_error) {
        this.registerComplete = true;
      } else {
        this.errors = response.error_content;
      }
    });
  }

  firstError(errors:string[]){
      return errors ? errors[0] : "";
  }

}
</script>

<style scoped lang="stylus">
</style>
