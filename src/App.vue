<template>
  <div class="mdl-layout mdl-js-layout mdl-layout--fixed-header">
    <header class="mdl-layout__header">
      <div class="mdl-layout__header-row">
        <span class="mdl-layout-title">Rozgar</span>
      </div>
    </header>
    <div class="mdl-layout__drawer">
      <span class="mdl-layout-title">Rozgar</span>
      <nav class="mdl-navigation">
        <router-link class="mdl-navigation__link" to="/sme" @click.native="hideMenu">SME</router-link>
        <router-link class="mdl-navigation__link" to="/workAppointments" @click.native="hideMenu">Work Appointments</router-link>
        <router-link class="mdl-navigation__link" to="/workerAdvertisements" @click.native="hideMenu">Worker Advertisements</router-link>
        <router-link class="mdl-navigation__link" to="/" @click.native="hideMenu">Login</router-link>
        <router-link class="mdl-navigation__link" to="/labourer_registration" @click.native="hideMenu">Register as a Labourer</router-link>
        <router-link class="mdl-navigation__link" to="/aboutus" @click.native="hideMenu">About Us</router-link>
        <router-link class="mdl-navigation__link" to="/" v-on:click.native="logout()" replace>Logout</router-link>
      </nav>
    </div>
    <main class="mdl-layout__content">
      <div class="page-content">
        <router-view></router-view>
      </div>
    </main>
  </div>
</template>

<script>
  require('material-design-lite')

  export default {
    name: 'app',
    methods: {
      hideMenu: function () {
        document.getElementsByClassName('mdl-layout__drawer')[0].classList.remove('is-visible')
        document.getElementsByClassName('mdl-layout__obfuscator')[0].classList.remove('is-visible')
      },
      logout () {
        localStorage.removeItem('session_token')
        this.hideMenu()
      }
    }
  }
</script>

<style>
  @import url('https://fonts.googleapis.com/icon?family=Material+Icons');
  @import url('https://code.getmdl.io/1.2.1/material.blue-red.min.css');
</style>
