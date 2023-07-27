<script setup>
import Button from '../components/Button.vue'
import Card from '../components/Card.vue'
import { useRoute } from "vue-router";
import { onMounted } from 'vue'
import { useHousesStore } from "../stores/useHousesStore.js";
const store = useHousesStore();
const route = useRoute();

onMounted(async () => {
  await store.getHouseById(route.params.id);
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
        <Card class="house" :house="store.house" detailedCard/>
        <aside>
          <h3>Recommended for you</h3>
          <Card class="house-reccomendation" v-for="house in store.randomHouses" :key="house?.id" :house="house" mainCard/>
        </aside>
      </div>
    </div>
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
  aside{
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
  .top-main{
    position: absolute;
    top: -4%;
  }
  .card-container  {
    flex-direction: column;
  }
}

@media only screen and (min-width: 600px) and (max-width: 768px) {
  

}</style>