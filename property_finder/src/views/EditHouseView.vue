<script setup>
import Button from '../components/Button.vue'
import Input from '../components/Input.vue'
import { RouterLink } from 'vue-router'
import { ref,watchEffect, onMounted } from 'vue';
import { useHousesStore } from "../stores/useHousesStore.js";
import { useRoute } from "vue-router";
const route = useRoute();
const store = useHousesStore();


onMounted(async () => {
  await store.getHouseById(route.params.id);
})
const selectOptions = ref(["Yes", "No"]);

const newListing = ref({
    price: store.house?.price,
    bedrooms: store.house?.rooms.bedrooms,
    bathrooms: store.house?.rooms.bathrooms,
    size: store.house?.size,
    description: store.house?.description,
    streetName: store.house?.location?.street,
    houseNumber: store.house?.location?.houseNumber,
    numberAddition: store.house?.location?.numberNumberAddition,
    zip: store.house.location?.zip,
    city: store.house.location?.city,
    constructionYear: store.house?.constructionYear,
    hasGarage: store.house?.hasGarage
})
// const newListing = ref({
//     price: null,
//     bedrooms: null,
//     bathrooms: null,
//     size: null,
//     description: "",
//     streetName: "",
//     houseNumber: null,
//     numberAddition: "",
//     zip: "",
//     city: "",
//     constructionYear: null,
//     hasGarage: null,
// })
const newListingImage = ref({
    image: null,
})
const fileInput = ref(null);
let imageData = ref(store.house.image);

const chooseImage = () => {
   fileInput.value.click()
}

const addFile = (event) => {
    newListingImage.value.image = event.target.files[0];
}

watchEffect(()=> {
  if(newListingImage.value.image) {
    const reader = new FileReader();
  reader.onload = e => {
  imageData.value = e.target.result
  }
  reader.readAsDataURL(newListingImage.value.image)
  } 
})

const handleSubmit = async(event) => {
event.preventDefault();
 await store.createHouse(newListing.value, newListingImage.value.image)
}
</script>

<template>
    <main class="main-with-bg">
        <div class="container">
            <div class="top-main">
                <RouterLink to="/">
                    <Button backIcon textAppearence isNoBg class="custom-text-color back-button">
                        Back to overview
                        {{ houseForEdit }}
                    </Button>
                </RouterLink>
                <h2>Edit listing</h2>
            </div>
            <form @submit="handleSubmit">
                <Input inputLabel='Street name' inputId="streetName" placeholder="Enter the street name"
                    v-model="newListing.streetName" isRequired/>
                <div class="input-group">
                    <Input inputLabel='House number' inputId="houseNumber" placeholder="Enter house number"
                        v-model="newListing.houseNumber" isRequired/>
                    <Input inputLabel='Addition (optional)' inputId="addition" placeholder="e.g. A" :isRequired="false"
                        v-model="newListing.houseAddition"/>
                </div>
                <Input inputLabel='Postal code' inputId="postal" placeholder="e.g. 1000 AA"  isRequired v-model="newListing.zip" />
                <Input inputLabel='City' inputId="city" placeholder="e.g Utrecht" isRequired v-model="newListing.city" />
                <div class="input-upload">
                    <label class="input-title">Upload picture (PNG or JPG) <sup class="star">*</sup></label>
                    <div class="image-input" :style="{ 'background-image': `url(${imageData})` }" @click="chooseImage">
                        <span v-if="!imageData" class="placeholder">
                            <img src="../assets/ic_upload@3x.png" alt="">
                        </span>
                        <input class="file-input" ref="fileInput" type="file" @input='addFile'>
                    </div>
                </div>
                <Input inputLabel='Price' inputId="price" placeholder="e.g &#8364; 150.000" v-model="newListing.price" isRequired />
                <div class="input-group">
                    <Input inputLabel='Size' inputId="size" placeholder="e.g 60m2" v-model="newListing.size" isRequired/>
                    <Input inputLabel='Garage' inputId="garage" placeholder="Select" select :options="selectOptions"
                        v-model="newListing.hasGarage" isRequired/>
                </div>
                <div class="input-group">
                    <Input inputLabel='Bedrooms' inputId="bedrooms" placeholder="Enter amount"
                        v-model="newListing.bedrooms" isRequired/>
                    <Input inputLabel='Bathrooms' inputId="bathrooms" placeholder="Enter amount"
                        v-model="newListing.bathrooms" isRequired/>
                </div>
                <Input inputLabel='Construction date' inputId="construction" placeholder="e.g. 1990"
                    v-model="newListing.constructionYear" isRequired/>
                <Input inputLabel='Description' inputId="description" placeholder="Enter description" textarea
                    v-model="newListing.description" isRequired/>


                <Button isBlured isSubmit isPrimary >POST</Button>
            </form>
        </div>
    </main>
</template>



<style lang="scss" scoped>
@import "../scss/main";
@import "../scss/variables";

.container {
    display: flex;
    flex-direction: column;
}

.main-with-bg {
    height: 100%;
    background-image: url('../assets/img_background@3x.png');
    background-size: contain;
    background-position: right bottom;
    background-repeat: no-repeat;
}


.top-main {
    margin-top: 50px;


    .custom-text-color {
        color: $color-text-primary !important;
        padding-left: 0 !important;
    }

    h2 {
        margin-top: 20px;
    }
}

form {
    margin-top: 20px;
    width: 45%;

    .input-group {
        display: flex;
        flex-direction: row;
        justify-content: space-between;

        div {
            width: 47%;
        }
    }

    .input-upload {
        margin-bottom: 20px;

        .input-title {
            color: $color-text-secondary;
        }

        .image-input {
            border-style: dashed;
            border-color: gray;
            border-width: 2px;
            display: block;
            width: 100px;
            height: 100px;
            cursor: pointer;
            background-size: cover;
            background-position: center center;
            margin-top: 10px;

            img {
                width: 18px;
            }
        }

        .placeholder {
            background: #F0F0F0;
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .file-input {
            display: none;
        }
    }
}

@media only screen and (max-width: 600px) {
    .main-with-bg {
        min-height: 100%;
        // background-image: url('../assets/img_background@3x.png');
        // background-size: contain;
        // background-position: right bottom;
        // background-repeat: no-repeat;
    }

    .top-main {
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;

        h2 {
            margin-top: 0;
            margin-right: auto;
            margin-left: auto;
        }
    }

    form {
        width: 100%;
    }
}</style>