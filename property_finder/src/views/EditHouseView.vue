<script setup>
import Button from '../components/Button.vue'
import Input from '../components/Input.vue'
import { RouterLink } from 'vue-router'
import { ref, watchEffect, onMounted, reactive } from 'vue';
import { useHousesStore } from "../stores/useHousesStore.js";
import { useRoute } from "vue-router";
import { useVuelidate } from '@vuelidate/core';
import { required, numeric } from '@vuelidate/validators';

const route = useRoute();
const store = useHousesStore();
const buttonActive = ref(false);
const selectOptions = ref([
    {label:"Yes", value: true}, 
    {label:"No", value: false}]
);

onMounted(async () => {
    await store.getHouseById(route.params.id);
})

const updatedListing = reactive({
    price: store.house?.price,
    bedrooms: store.house?.rooms.bedrooms,
    bathrooms: store.house?.rooms.bathrooms,
    size: store.house?.size,
    description: store.house?.description,
    streetName: store.house?.location.street,
    houseNumber: store.house?.location.houseNumber,
    numberAddition: store.house?.location.numberNumberAddition,
    zip: store.house?.location.zip,
    city: store.house?.location.city,
    constructionYear: store.house?.constructionYear,
    hasGarage: store.house?.hasGarage,
})

const newImage = reactive({
    image: null,
})
const fileInput = ref(null);
let imageData = ref(store.house?.image);



const chooseImage = () => {
    fileInput.value.click()
}

const addImage = (event) => {
    newImage.image = event.target.files[0];
}

const clearImage = (event) => {
    event.preventDefault();
    imageData.value = null;
}

const rules = {
    price: { required, numeric },
    bedrooms: { required, numeric},
    bathrooms: { required, numeric },
    size: { required, numeric },
    description: { required },
    streetName: { required },
    houseNumber: { required, numeric },
    zip: { required },
    city: { required },
    constructionYear: { required, numeric},
    hasGarage: { required },
}
const rulesForImage = {required}

const v$ = useVuelidate(rules, updatedListing)
const g$ = useVuelidate(rulesForImage, imageData)

watchEffect(() => {
    if (newImage.image) {
        const reader = new FileReader();
        reader.onload = e => {
            imageData.value = e.target.result
        }
        reader.readAsDataURL(newImage.image)
    }
})



watchEffect(() => {
    if (updatedListing.price !== null &&
        updatedListing.bedrooms !== null&&
        updatedListing.bathrooms !== null &&
        updatedListing.size !== null &&
        updatedListing.description !== ""&&
        updatedListing.streetName !== "" &&
        updatedListing.houseNumber !== null &&
        updatedListing.zip !== "" &&
        updatedListing.city !== "" &&
        updatedListing.constructionYear !== null &&
        updatedListing.image !== null&&
        imageData.value !== "" &&
        imageData.value !== null 
        ) {
        buttonActive.value = true
    } else {
        buttonActive.value = false;
    }
})

const handleSubmit = async (event) => {
    event.preventDefault();
    const result = await v$.value.$validate()
    const resultImage = await g$.value.$validate()
    if (result && resultImage) {
        await store.updateHouseById(route.params.id, updatedListing, newImage.image);
    }
}
</script>

<template>
    <main class="main-with-bg">
        <div class="container">
            <div class="top-main">
                <RouterLink to="/">
                    <Button  text="Back to overview"  textAppearence  class="custom-text-color back-button">
                        <img class="icon-back-dark" src="../assets/ic_back_grey@3x.png" alt="Back">
                    </Button>
                </RouterLink>
                <h2>Edit listing</h2>
            </div>
            <form @submit="handleSubmit">
                <Input inputLabel='Street name' inputId="streetName" inputType="text" placeholder="Enter the street name" 
                    v-model="updatedListing.streetName" :error="v$.streetName.$errors.length >=1 ? true : false" isRequired/>
                <span class="error-message error" v-for="error in v$.streetName.$errors" :key="error.$uid">
                    Required field missing </span>
                <div class="input-group">
                    <div>
                        <Input inputLabel='House number' inputId="houseNumber"  placeholder="Enter house number"
                            v-model="updatedListing.houseNumber" :error="v$.houseNumber.$errors.length >=1 ? true : false" isRequired/>
                        <span class="error-message error" v-for="error in v$.houseNumber.$errors" :key="error.$uid">
                            Required field missing </span>
                    </div>
                    <div>
                        <Input inputLabel='Addition (optional)' inputId="addition" inputType="text" placeholder="e.g. A" :isRequired="false"
                            v-model="updatedListing.houseAddition" />
                    </div>
                </div>

                <Input inputLabel='Postal code' inputId="postal" inputType="text" placeholder="e.g. 1000 AA" v-model="updatedListing.zip" :error="v$.zip.$errors.length >=1 ? true : false" isRequired/>
                <span class="error-message error" v-for="error in v$.zip.$errors" :key="error.$uid">
                    Required field missing </span>

                <Input inputLabel='City' inputId="city" inputType="text" placeholder="e.g Utrecht" v-model="updatedListing.city" :error="v$.city.$errors.length >=1 ? true : false" isRequired/>
                <span class="error-message error" v-for="error in v$.city.$errors" :key="error.$uid">
                    Required field missing </span>

                <div class="input-upload">
                    <label class="input-title" >Upload picture (PNG or JPG) <sup class="star" >*</sup></label>
        
                    <div class="image-input" :class="g$.$errors.length >= 1 ? 'image-input-error' : ''" :style="{ 'background-image': `url(${imageData})` }" @click.stop="chooseImage">
                        <div v-if="imageData" class="image-clear-button" @click.stop="clearImage">
                            <img src="../assets/ic_clear_white@3x.png" alt="">
                        </div>
                        <span v-if="!imageData" class="placeholder">
                            <img src="../assets/ic_upload@3x.png" alt="">
                        </span>
                        <input class="file-input" ref="fileInput" type="file" @input='addImage'>
                    </div>
                    <span class="error-message error" v-for="error in g$.$errors" :key="error.$uid">
                        Required field missing </span>
                </div>
                <Input inputLabel='Price' inputId="price" inputType="text" placeholder="e.g &#8364; 150.000" v-model="updatedListing.price" :error="v$.price.$errors.length >=1 ? true : false" isRequired/>
                <span class="error-message error" v-for="error in v$.price.$errors" :key="error.$uid">
                    Required field missing</span>
                <div class="input-group">
                    <div>
                        <Input inputLabel='Size' inputId="size" inputType="text" placeholder="e.g 60m2" v-model="updatedListing.size" :error="v$.size.$errors.length >=1 ? true : false" isRequired/>
                        <span class="error-message error" v-for="error in v$.size.$errors" :key="error.$uid">
                            Required field missing</span>
                    </div>
                    <div>
                        <Input inputLabel='Garage' inputId="garage" placeholder="Select" select :options="selectOptions"
                            v-model="updatedListing.hasGarage" :error="v$.hasGarage.$errors.length >=1 ? true : false" isRequired/>
                        <span class="error-message error" v-for="error in v$.hasGarage.$errors" :key="error.$uid">
                            Required field missing</span>
                    </div>

                </div>
                <div class="input-group">
                    <div>
                        <Input inputLabel='Bedrooms' inputId="bedrooms" inputType="number" placeholder="Enter amount"
                            v-model="updatedListing.bedrooms" :error="v$.bedrooms.$errors.length >=1 ? true : false" isRequired/>
                        <span class="error-message error" v-for="error in v$.bedrooms.$errors" :key="error.$uid">
                            Required field missing</span>
                    </div>
                    <div>
                        <Input inputLabel='Bathrooms' inputId="bathrooms" inputType="number" placeholder="Enter amount"
                            v-model="updatedListing.bathrooms" :error="v$.bathrooms.$errors.length >=1 ? true : false" isRequired/>
                        <span class="error-message error" v-for="error in v$.bathrooms.$errors" :key="error.$uid">
                            Required field missing</span>
                    </div>
                </div>
                <Input inputLabel='Construction date' inputId="construction" inputType="number" placeholder="e.g. 1990"
                    v-model="updatedListing.constructionYear" :error="v$.constructionYear.$errors.length >=1 ? true : false" isRequired/>
                <span class="error-message error" v-for="error in v$.constructionYear.$errors" :key="error.$uid">
                    Required field missing</span>
                <Input inputLabel='Description' inputId="description" inputType="text" placeholder="Enter description" textarea
                    v-model="updatedListing.description" :error="v$.description.$errors.length >=1 ? true : false" isRequired/>
                <span class="error-message error" v-for="error in v$.description.$errors" :key="error.$uid">
                    Required field missing {{  v$.description.$errors.length >=1 }}</span>

                <Button isSubmit isPrimary :style="{ 'opacity': buttonActive === false ? '0.5' : '1' }">Save</Button>
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

.icon-back-dark {
    height: 16px;
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
            div {
                width: 100%;
            }
        }
    }
    button {
        margin-left: auto;
        margin-top: 10px;
        margin-bottom: 20px;
        width: 40%;
        display: flex;
        justify-content: center; 
}
    .input-upload {
        margin-top: 10px;
        margin-bottom: 10px;

        .input-title {
            color: $color-text-secondary;
        }

        .image-input {
            position: relative;
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
            margin-bottom: 10px;

            img {
                width: 18px;
            }

            .image-clear-button {
                position: absolute;
                right: -11px;
                top: -10px;
                cursor: pointer;
            }
        }
        .image-input-error{
            border-color:red;

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
    span {
        color: red;
    }
}

@media only screen and (max-width: 600px) {
    .main-with-bg {
        height: auto;
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
        margin-bottom: 100px;
        button {
            width: 100%;
        }
    }
}</style>