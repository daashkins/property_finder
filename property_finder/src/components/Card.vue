<script setup>
import Button from './Button.vue'
import { ref } from "vue"
import { RouterLink } from 'vue-router'

defineProps({
    house: {
        id: {
            type: Number,
        },
        image: {
            type: String,
        },
        price: {
            type: Number,
        },
        rooms: {
            bedrooms: {
                type: Number,
            },
            bathrooms: {
                type: Number,
            }
        },
        size: {
            type: Number,
        },
        description: {
            type: String,
        },
        location: {
            street: {
                type: String,
            },
            houseNumber: {
                type: Number,
            },
            houseNumberAddition: {
                type: Number | null,
            },
            city: {
                type: String,
            },
            zip: {
                type: String,
            },
        },
        createdAt: {
            type: String,
        },
        constructionYear: {
            type: Number,
        },
        hasGarage: {
            type: Boolean,
        },
        madeByMe: {
            type: Boolean,
        },
    },
    recomendedCard: {
        type: Boolean,
        default: false
    },
    detailedCard: {
        type: Boolean,
        default: false
    },
    mainCard: {
        type: Boolean,
        default: false
    }
})

const hover = ref(false)
</script>

<template>
    <a class="card-link" :href="'/house/' + house?.id" @mouseover="hover = true" @mouseleave="hover = false">
        <div :class="{ 'card-detailed': detailedCard, 'card-main': mainCard, 'card-recomendation': recomendedCard }">
            <img class="card-image" :src="house?.image" />
            <div class="card-content">
                <div class="card-content-header">
                    <h3>{{ house?.location.street }} {{ house?.location.houseNumber }}</h3>
                    <div v-if="house?.madeByMe"
                        :class="[hover === true ? 'card-content-controls-active' : 'card-content-controls', detailedCard && 'card-content-controls-mobile']">
                        <RouterLink :to="'/edit/' + house?.id">
                        <Button editIcon isNoBg class="custom-button-padding"></Button>
                    </RouterLink>
                        <Button deleteIcon isNoBg class="custom-button-padding"></Button>
                    </div>
                </div>
                <div class="card-main-details" v-if="mainCard">
                    <h4 class="price text">{{ house?.price }}</h4>
                    <h3 class="adress text">{{ house?.location.zip }} {{ house?.location.city }}</h3>
                    <div class="dimensions">
                        <img src="../assets/ic_bed@3x.png" alt="Bed">
                        <p class="text-tetriary">{{ house?.rooms.bedrooms }}</p>
                        <img src="../assets/ic_bath@3x.png" alt="Bath">
                        <p class="text-tetriary">{{ house?.rooms.bathrooms }}</p>
                        <img src="../assets/ic_size@3x.png" alt="Size">
                        <p class="text-tetriary">{{ house?.size }}</p>
                    </div>
                </div>
                <div class="card-main-details" v-if="recomendedCard">
                    <h4 class="price text">{{ house?.price }}</h4>
                    <h3 class="adress text">{{ house?.location.zip }} {{ house?.location.city }}</h3>
                    <div class="dimensions">
                        <img src="../assets/ic_bed@3x.png" alt="Bed">
                        <p class="text-tetriary">{{ house?.rooms.bedrooms }}</p>
                        <img src="../assets/ic_bath@3x.png" alt="Bath">
                        <p class="text-tetriary">{{ house?.rooms.bathrooms }}</p>
                        <img src="../assets/ic_size@3x.png" alt="Size">
                        <p class="text-tetriary">{{ house?.size }}</p>
                    </div>
                </div>
                <div class="card-detailed-details" v-if="detailedCard">
                    <div class="dimensions">
                        <p class="adress text"><img src="../assets//ic_location@3x.png" alt="">{{ house?.location.zip }} {{
                            house?.location.city }}</p>
                    </div>
                    <div class="dimensions">
                        <img src="../assets/ic_price@3x.png" alt="Price">
                        <p class="price text">{{ house?.price }}</p>
                        <img src="../assets/ic_size@3x.png" alt="Size">
                        <p class="text-tetriary">{{ house?.size }}</p>
                        <img src="../assets/ic_construction_date@3x.png" alt="Construction">
                        <p class="text-tetriary">Built in {{ house?.constructionYear }}</p>
                    </div>
                    <div class="dimensions">
                        <img src="../assets/ic_bed@3x.png" alt="Bed">
                        <p class="text-tetriary">{{ house?.rooms.bedrooms }}</p>
                        <img src="../assets/ic_bath@3x.png" alt="Bath">
                        <p class="text-tetriary">{{ house?.rooms.bathrooms }}</p>
                        <img src="../assets/ic_garage@3x.png" alt="Garage">
                        <p class="text-tetriary">{{ house?.hasGarage ? "Yes" : "No" }}</p>
                    </div>
                    <div class="dimensions description">
                        <p class="text-tetriary">{{ house?.description }}</p>
                    </div>
                </div>
            </div>
        </div>
    </a>
</template>



<style lang="scss" scoped>
@import "../scss/variables";

.card-link {
    text-decoration: none;


}

.card-detailed {
    flex-direction: column !important;

    .card-image {
        width: 100%;
    }
}

.card-main,
.card-detailed {
    .card-content {
        flex-grow: 1;

        .card-content-header {
            display: flex;
            flex-direction: row;
            align-items: center;
            width: auto;
            justify-content: space-between;

        }

        .dimensions {
            display: flex;
            flex-direction: row;
            align-items: center;

            img {
                height: 16px;
                margin-right: 5px;
            }

            p {
                color: $color-text-secondary;
                margin-right: 15px;
            }

        }

        h3 {
            color: $color-text-primary;
            // margin-bottom: 10px;

        }

        .card-content-controls {
            display: none;
            align-self: flex-start;
        }

        .card-content-controls-active {
            display: flex;
            flex-direction: row;
            transition: $transition;
        }

        .custom-button-padding {
            padding: 3px !important;
        }
    }
}

.card-main {
    display: flex;
    flex-direction: row;
    background-color: $color-bg-2;
    border-radius: 4px;
    padding: 15px 10px;

    .card-image {
        width: 30%;
        object-fit: cover;
        border-radius: 4px;
        margin-right: 30px;
    }


}


.card-main-details {
    .price {
        color: $color-text-primary;
        margin-bottom: 8px;
    }

    .adress {
        color: $color-tertiary-2;
        margin-bottom: 8px;
    }


}

.card-detailed {
    .card-content {
        margin-top: 20px;
    }

    h3 {
        margin-bottom: 20px;
    }

    .dimensions {
        margin-bottom: 20px;


    }
}

@media only screen and (max-width: 600px) {

    .card-content-controls-mobile {
        position: absolute;
        right: 20px;
        top: 3%;
        display: flex;
    }

    .custom-button-padding {
        padding: 3px !important;
    }

}</style>