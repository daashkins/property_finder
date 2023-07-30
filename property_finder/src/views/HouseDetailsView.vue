<script setup>
import Button from '../components/Button.vue'
import PopUp from '../components/PopUp.vue'
import Card from '../components/Card.vue'
import { useRoute } from "vue-router";
import router from '../router/index'
import { onMounted, watchEffect } from 'vue'
import { useHousesStore } from "../stores/useHousesStore.js";

const store = useHousesStore();
const route = useRoute();

onMounted(async () => {
  await store.getHouseById(route.params.id);
})

watchEffect(async () => {
  if (parseInt(route.params.id) !== store.house?.id) {
    await store.getHouseById(route.params.id);
  }
})

watchEffect(async () => {
  if (!store.house?.image) {
    await store.getHouseById(route.params.id);
  }
})


</script>

<template>
  <main>
    <div class="container">
      <div class="top-main">
        <Button textAppearence text="Back to overview" class="custom-text-color back-button" @click="router.push('/')">
          <img class="icon-back-dark" src="../assets/ic_back_grey@3x.png" alt="Back">
          <img class="icon-back-light" src="../assets/ic_back_white@3x.png" alt="Back">
        </Button>
      </div>
      <div class="card-container">
        <Card class="house" :house="store.house" detailedCard />
        <aside>
          <h3>Recommended for you</h3>
          <Card class="house-reccomendation" v-for="house in store.randomHouses" :key="house?.id" :house="house"
            recomendedCard />
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

  .icon-back-dark {
    display: block;
    height: 16px;
  }

  .icon-back-light {
    display: none;
    height: 16px;
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
  .top-main {
    .icon-back-dark {
      display: none;
    }

    .icon-back-light {
      display: block;
    }
  }
}

@media only screen and (min-width: 600px) and (max-width: 768px) {
  .top-main .icon-back-dark {
    display: block;
  }

  .icon-back-light {
    display: none;
  }
}

@media only screen and (max-width: 768px) {
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
      margin-top: 30px;
      padding-left: 20px;
      width: 90%;
      margin-bottom: 100px;
    }
  }
}

@media only screen and (max-width: 1200px) and (min-width: 768px) {
  .card-container {
    .house {
      width: 55%
    }

    aside {
      width: 35%;

      h3 {
        font-size: 20px;
      }
    }
  }
}
</style>
