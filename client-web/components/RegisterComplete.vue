<template>
  <div>
    <div class="alert alert-success" role="alert">
      <strong>Success!</strong> Your account has been created.
    </div>
    <p>
      A confirmation email has been sent to {{email}}. You will need to follow the provided link to confirm your email address before signing in.
    </p>
    <router-link class="btn btn-lg btn-primary btn-block" to="/">Sign in</router-link>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({
   props: {
    email: String
  }
})
export default class RegisterComplete extends Vue {
}
</script>

<style scoped lang="stylus">
</style>
