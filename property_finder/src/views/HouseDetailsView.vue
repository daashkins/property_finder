<script setup>
import Button from '../components/Button.vue'
import PopUp from '../components/PopUp.vue'
import Card from '../components/Card.vue'
import { useRoute } from "vue-router";
import { onMounted, watchEffect } from 'vue'
import { useHousesStore } from "../stores/useHousesStore.js";
const store = useHousesStore();
const route = useRoute();


onMounted(async () => {
  await store.getHouseById(route.params.id);
})

watchEffect(async () => {
  if(parseInt(route.params.id) !== store.house.id) {
    await store.getHouseById(route.params.id);
  }
})
</script>

<template>
  <main>
    <div class="container">
      <div class="top-main">
        <RouterLink to="/">
          <Button backIcon textAppearence isNoBg class="custom-text-color back-button">
            Back to overview
          </Button>
        </RouterLink>
      </div>
      <div class="card-container">
        <Card class="house" :house="store.house" detailedCard />
        <aside>
          <h3>Recommended for you</h3>
          <Card class="house-reccomendation" v-for="house in store.randomHouses" :key="house?.id" :house="house"
            mainCard />
        </aside>
      </div>
    </div>
    <PopUp></PopUp>
  </main>
</template>

<style lang="scss" scoped>
@import "../scss/main";
@import "../scss/variables";

main {
  width: 100%;
}

.container {
  display: flex;
  flex-direction: column;
}

.card-container {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  .house {
    width: 60%;
  }

  aside {
    width: 30%;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
}

.top-main {
  margin-top: 50px;
  margin-bottom: 30px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  .custom-text-color {
    color: $color-text-primary !important;
  }
}

.main {
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  .house {
    width: 50%;
  }

  aside {
    width: 30%;

    h3 {
      margin-bottom: 20px;
    }

    .house-reccomendation {
      margin-bottom: 20px;
    }
  }
}


@media only screen and (max-width: 600px) {
  .container {
    width: 100%;
    position: relative;
  }

  .top-main {
    position: absolute;
    top: -3%;
    z-index: 10;
  }

  .card-container {
    flex-direction: column;
    align-items: flex-start;
    .house {
      width: 100%;
    }
    aside {
      margin-top: 400px;
      padding-left: 20px;
      width: 90%;
      margin-bottom: 100px;
    }
  }
}

@media only screen and (min-width: 600px) and (max-width: 768px) {

}</style>