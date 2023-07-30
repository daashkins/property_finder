<script setup>
import { ref, watchEffect } from 'vue';
import { RouterLink } from 'vue-router';
import { useRoute } from "vue-router";

//Condition of rendering of icons
let activeHome = ref(true);
let activeInfo = ref(false);

const route = useRoute();

//Hook to watch changes in the url
watchEffect(() => {
    if (route.fullPath === '/about') {
        activeInfo.value = true;
        activeHome.value = false;
    } else {
        activeInfo.value = false;
        activeHome.value = true;
    }
})
</script>

<template>
    <footer>
        <div class="container">
            <ul class="footer-navigation">
                <li class="home-button">
                    <RouterLink to="/">
                        <img v-if="activeHome" src="../assets/ic_mobile_navigarion_home_active@3x.png" alt="Home">
                        <img v-else src="../assets/ic_mobile_navigarion_home@3x.png" alt="Home">
                    </RouterLink>
                </li>
                <li class="info-buttton">
                    <RouterLink to="/about">
                        <img v-if="activeInfo" src="../assets/ic_mobile_navigarion_info_active@3x.png" alt="Info">
                        <img v-else src="../assets/ic_mobile_navigarion_info@3x.png" alt="Info">
                    </RouterLink>
                </li>
            </ul>
        </div>
    </footer>
</template>

<style lang="scss" scoped>
@import "../scss/main";
@import "../scss/variables";


footer {
    display: none;
    background-color: $color-bg-2;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;

    .footer-navigation {
        margin: 0 auto;
        padding-top: 10px;
        padding-bottom: 10px;
        width: 85%;
        list-style: none;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;

        img {
            width: 70%;
        }
    }
}



@media only screen and (max-width: 600px) {
    footer {
        display: block;
    }
}
</style>