<template>
  <div class="container auth">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class Auth extends Vue {}
</script>
