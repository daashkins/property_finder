<script setup>
import { useHousesStore } from "../stores/useHousesStore.js";
import { ref } from 'vue';
const store = useHousesStore();

const searchValue = ref('');
const toShow = ref(false)

const handleSearch = (event) => {
    event.preventDefault();
    searchValue.value = event.target.value;
    store.searchValue = event.target.value;
    toShow.value = true;

}

const handleFocus = () => {
    toShow.value = true;
}
// const handleFocusRemove = () => {
//     toShow.value = false;
// }


const handleClear = () => {
    searchValue.value = "";
    store.searchValue = "";
}

</script>

<template>
    <div class="search">
        <img src="../assets/ic_search@3x.png" alt="search">
        <input class="search-input" v-model="searchValue" type="text" placeholder="Search for a house"
            @change="handleSearch" @focus="handleFocus">
        <button class="search-clear-button" :class="toShow && 'search-clear-button-active'" @click="handleClear">
            <img src="../assets/ic_clear@3x.png" alt="">
        </button>
    </div>
</template>



<style lang="scss" scoped>
@import "../scss/variables";

.search {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding-left: 15px;
    padding-right: 10px;
    padding-top: 10px;
    padding-bottom: 10px;
    background-color: $color-tertiary-1;
    border-radius: 4px;
    width: 100%;
    color: $color-bg-1;

    img {
        height: 16px;
        margin-right: 15px;
    }

    .search-input {
        border: 0;
        outline: none;
        width: -webkit-fill-available;
        background-color: transparent;
    }

    .search-clear-button {
        display: none;
        align-content: flex-end;
        background-color: transparent;
        border: none;
        outline: none;
        height: 16px;
        cursor: pointer;
    }

    .search-clear-button-active {
        display: block;
    }
}</style>