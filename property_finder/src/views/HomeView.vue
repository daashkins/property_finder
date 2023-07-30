<script setup>
import Button from '../components/Button.vue'
import Search from '../components/Search.vue'
import FilterTabs from '../components/FilterTabs.vue'
import Card from '../components/Card.vue'
import Circular from '../components/Circular.vue'
import { useHousesStore } from "../stores/useHousesStore.js";
import router from '../router/index'

const store = useHousesStore();
</script>

<template>
  <main>
    <div class="container">
      <div class="top-main">
        <h2>Houses</h2>
        <Button text="CREATE NEW" textAppearence isPrimary class="top-main-add" @click="router.push('/create')">
          <img class="icon-add-desktop" src="../assets/ic_plus_white@3x.png" alt="Plus">
          <img class="icon-add-mobile" src="../assets/ic_plus_grey@3x.png" alt="Plus">
        </Button>
      </div>

      <div class="search-main">
        <div class="search-container">
          <Search />
        </div>
        <div class="filter">
          <FilterTabs />
        </div>
      </div>

      <p v-if="store.searchValue !== '' && store.searchResults >= 1" class="search-results input-title">{{
        store.searchResults }} results found</p>

      <div class="houses">
        <Circular v-if="store.loading" />
        <Card v-for="house in store.searchHouses" :key="house?.id" :house="house" class="house-card" mainCard />
        <img v-if="store.searchValue !== '' && store.searchResults < 1" src="../assets/img_empty_houses@3x.png"
          alt="No houses found">
        <div class="houses-not-found">
          <p v-if="store.searchValue !== '' && store.searchResults < 1" class="text"> No results found.</p>
          <p v-if="store.searchValue !== '' && store.searchResults < 1" class="text"> Please try another keyword.</p>
        </div>

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

.top-main {
  margin-top: 50px;
  margin-bottom: 30px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  h2 {
    color: $color-text-primary;
  }

  .icon-add-desktop {
    display: block;
    height: 16px;
  }

  .icon-add-mobile {
    display: none;
    height: 16px;
  }
}

.search-main {
  width: 100%;
  display: flex;
  margin-bottom: 20px;
  flex-direction: row;
  justify-content: space-between;

  .search-container {
    width: 35%;
  }

}

.search-results {
  padding-left: 20px;
}

.houses {
  position: relative;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  gap: 20px;

  img {
    margin-top: 100px !important;
    margin: auto;
    width: 30%;
    object-fit: cover;
  }
  .houses-not-found {
    margin: 0 auto;
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    p {
    color: $color-text-secondary;
  }
  }
  
}

@media only screen and (max-width: 600px) {
  main {
    margin-bottom: 100px;
  }

  .search-main {
    flex-direction: column;
    gap: 20px;

    .search-container {
      width: 100%;
    }
  }

  .top-main {
    justify-content: center;
    position: relative;

    .top-main-add {
      position: absolute;
      right: 0;
      top: auto;
    }

    button {
      background-color: transparent;
    }

    .icon-add-desktop {
      display: none;
    }

    .icon-add-mobile {
      display: block;
    }
  }

  .houses {
    img {
      width: 70%;
    }
    p:last-child {
      margin-top: 0px;
      ;
    }
  }
}

@media only screen and (min-width: 600px) and (max-width: 768px) {

  .search-main {
    gap: 10px;

    .search-container {
      width: 45%;
    }
  }


}</style>