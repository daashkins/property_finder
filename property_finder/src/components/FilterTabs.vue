<script setup>
import { useHousesStore } from "../stores/useHousesStore.js";
const store = useHousesStore();

//Fucntion to set up a filter value in store 
const filterHouses = (event) => {
  event.preventDefault();
  store.filter = event.target.value;
  return
}

</script>

<template>
  <div class="filter">
    <button class="buttonLeft" :class="store.filter === 'Price' && 'activeFilter'" value="Price" @click="filterHouses">
      Price
    </button>
    <button class="buttonRight" :class="store.filter === 'Size' && 'activeFilter' " value="Size" @click="filterHouses">
      Size
    </button>
  </div>
</template>



<style lang="scss" scoped>
@import "../scss/variables";
.filter{
  display: flex;
  flex-direction: row;
button {
  padding-top: 11px; 
  padding-bottom: 10px;
  min-width: 100px;
  box-shadow: none;
  border: 0;
  background-color: $color-tertiary-2;
  color: $color-bg-2;
  font-family: $font-family-montserrat;
  font-weight: 500;
  font-size: 14px;
}
.buttonLeft{
  border-radius: 4px 0 0 4px;
}
.buttonRight{
  border-radius: 0 4px 4px 0;
}
.activeFilter{
  background-color: $color-element-primary;
}
}

@media only screen and (max-width: 600px) {
  .filter{
   button {
    width: 50%;
   }
  }
  }

  @media only screen and (min-width: 600px) and (max-width: 768px) {
    .filter{
   button {
    min-width: 120px;
   }
  }
  }
</style>