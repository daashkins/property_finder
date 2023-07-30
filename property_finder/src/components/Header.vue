<script setup>
import { watchEffect, ref } from 'vue';
import { RouterLink } from 'vue-router';
import { useRoute } from "vue-router";

let currentURL = ref(null)
const route = useRoute();

//Hook to watch changes in url 
watchEffect(() => {
    currentURL.value = route.fullPath
})
</script>


<template>
    <header>
        <div class="container">
            <RouterLink to="/">
                <img class="logo" src="../assets/img_logo_dtt@3x.png" alt="Logo">
            </RouterLink>
            <ul class="navigation">
                <li class="menu">
                    <RouterLink to="/" :class="currentURL.includes('house') || currentURL === '/' || currentURL === '/house/create' ? 'exact-active-link': '' ">Houses</RouterLink>
                </li>
                <li class="menu">
                    <RouterLink to="/about" :class="currentURL.includes('/about') && 'exact-active-link'">About</RouterLink>
                </li>
            </ul>
        </div>
    </header>
</template>



<style lang="scss" scoped>
@import "../scss/main";
@import "../scss/variables";
 

header {
    background-color: $color-bg-2;
    .container {
        padding-top: 1%;
        padding-bottom: 1%;
        flex-direction: row;
        align-items: center;
        .logo {
            height: 40px;
            margin-right: 60px;
        }
        .navigation {
            list-style: none;
            display: flex;
            flex-direction: row;
            gap: 60px;
            a {
                font-family: $font-family-montserrat;
                font-weight: 500;
                color: $color-tertiary-2;
            }
            .exact-active-link {
                 color: $color-text-primary;
                 font-weight: bold;
            }
        }
    }
}

@media only screen and (max-width: 600px) {
   header {
    display: none;
   }
  }
</style>