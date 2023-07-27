<script setup>
import Button from '../components/Button.vue'
import Input from '../components/Input.vue'
import { RouterLink } from 'vue-router'
import { ref } from 'vue';

const selectOptions = ref(["Yes", "No"]);
const newListing = ref({
    price: null,
    bedrooms: null,
    bathrooms: null,
    size: null,
    description: "",
    streetName: "",
    houseNumber:  null,
    numberAddition: "",
    zip:  "",   
    city: "",   
    constructionYear: null,   
    hasGarage: null,
})
</script>

<template>
    <main class="main-with-bg">
        <div class="container">
            <div class="top-main">
                <RouterLink to="/">
                    <Button backIcon textAppearence isNoBg class="custom-text-color back-button">
                        Back to overview
                    </Button>
                </RouterLink>
                <h2>Create new listing</h2>
            </div>
            <form>
                <Input inputLabel='Street name' inputId="streetName" placeholder="Enter the street name" v-model="newListing.streetName" />
                <div class="input-group">
                    <Input inputLabel='House number' inputId="houseNumber" placeholder="Enter house number" v-model="newListing.houseNumber"/>
                    <Input inputLabel='Addition (optional)' inputId="addition" placeholder="e.g. A" :isRequired="false" v-model="newListing.houseAddition"/>
                </div>
                <Input inputLabel='Postal code' inputId="postal" placeholder="e.g. 1000 AA" v-model="newListing.zip" />
                <Input inputLabel='City' inputId="city" placeholder="e.g Utrecht" v-model="newListing.city"/>
                <div class="input-upload">
                    <p class="input-title"> Upload picture (PNG or JPG) <sup class="star">*</sup></p>
                <button>
                    <img src="../assets/ic_upload@3x.png" alt="">
                </button>
                </div>
                <Input inputLabel='Price' inputId="price" placeholder="e.g &#8364; 150.000" v-model="newListing.price"/>
                <div class="input-group">
                    <Input inputLabel='Size' inputId="size" placeholder="e.g 60m2" v-model="newListing.size"/>
                    <Input inputLabel='Garage' inputId="garage" placeholder="Select" select :options="selectOptions" v-model="newListing.hasGarage"/>
                </div>
                <div class="input-group">
                    <Input inputLabel='Bedrooms' inputId="bedrooms" placeholder="Enter amount" v-model="newListing.bedrooms"/>
                    <Input inputLabel='Bathrooms' inputId="bathrooms" placeholder="Enter amount" v-model="newListing.bathrooms"/>
                </div>
                <Input inputLabel='Construction date' inputId="construction" placeholder="e.g. 1990" v-model="newListing.constructionYear"/>
                <Input inputLabel='Description' inputId="description" placeholder="Enter description" textarea v-model="newListing.description"/>
                <Button isBlured isSubmit isPrimary>POST</Button>
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
        div{
            width: 47%;
        }
    }
    .input-upload {
        margin-bottom: 20px;
        p {
            margin-bottom: 10px;
        }
        button {
            border-style: dashed;
            padding: 35px;
            img {
                width: 18px;
            }
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