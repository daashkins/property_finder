<script setup>
import { RouterView } from 'vue-router'
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
import {onMounted } from 'vue'
import { useHousesStore } from "./stores/useHousesStore.js";
// import ModalView from './views/ModalView.vue';
import PopUp from './components/PopUp.vue';
const store = useHousesStore();

onMounted (async () => {
     await store.getHouses();
    })

</script>

<template>
  
  <Header/>
  <RouterView />
  <PopUp/>
  <Footer/>
</template>

<style lang="scss">
 @import "./scss/_variables.scss";
 @import "./scss/main.scss"

//  .your-component {
//    color: $color-text-primary;
//  }
</style>