<template>
  <router-view>
  </router-view>
</template>

<script lang="ts">
// Polyfills
import 'whatwg-fetch';
import './polyfills/object-assign';
import './polyfills/array-find';
import './polyfills/string-startsWith';

import Vue from 'vue';
import Component from 'vue-class-component';
import AuthService from './services/Auth';

@Component
export default class App extends Vue { }
</script>

<style lang="stylus">

/*
 * Global Styles
 */

@import '../node_modules/bootstrap/dist/css/bootstrap.css';
@require './styles/auth.styl';

body {
  padding-top: 5rem;
  font-family: "century gothic", verdana;
}

.btn-link {
  cursor: pointer;
}

.btn {
  margin: 10px 3px 10px 3px;
}
</style>
