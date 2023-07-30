<script setup>
import Button from './Button.vue'
import { useModalStore } from "../stores/useModalStore.js";
import router from '../router/index'
import { ref} from 'vue'

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

const modalStore = useModalStore();

const hover = ref(false)

const openModal = (id) => {
    if (id) {
        modalStore.openModal(id);
    }
}

</script>

<template>
    <div :class="{ 'card-detailed': detailedCard, 'card-main': mainCard, 'card-recomended': recomendedCard }"
        @click.stop="router.push(`/house/${house?.id}`)" @mouseover="hover = true" @mouseleave="hover = false">
        <img class="card-image" v-if="house?.image !== null" :src="house?.image" />
        <img class="card-image" v-if="house?.image === null" src="../assets/img_placeholder_house@3x.png" />
        <div v-if="house?.madeByMe && detailedCard"
            :class="['card-content-controls-mobile-active', 'card-content-mobile-controls', 'card-content-controls-mobile']">
            <Button class="custom-button-padding" @click.stop="router.push(`/house/edit/${house?.id}`)">
                <img class="icon-edit-dark" src="../assets/ic_edit@3x.png" alt="Edit">
                <img v-if="detailedCard" class="icon-edit-light" src="../assets/ic_edit_white@3x.png" alt="Edit">
            </Button>
            <Button class="custom-button-padding" @click.stop="openModal(house.id)">
                <img class="icon-delete-dark" src="../assets/ic_delete@3x.png" alt="Delete">
                <img v-if="detailedCard" class="icon-delete-light" src="../assets/ic_delete_white@3x.png" alt="Delete">
            </Button>
        </div>

        <div class="card-content">
            <div class="card-content-header">
                <h3 v-if="detailedCard || mainCard">{{ house?.location.street }} {{ house?.location.houseNumber }}</h3>
                <h4 v-if="recomendedCard">{{ house?.location.street }} {{ house?.location.houseNumber }}</h4>
                <div v-if="house?.madeByMe && mainCard"
                    :class="[hover === true ? 'card-content-controls-active' : 'card-content-controls']">
                    <Button class="custom-button-padding" @click.stop="router.push(`/house/edit/${house?.id}`)">
                        <img class="icon-edit-dark" src="../assets/ic_edit@3x.png" alt="Edit">
                        <img v-if="detailedCard" class="icon-edit-light" src="../assets/ic_edit_white@3x.png" alt="Edit">
                    </Button>
                    <Button class="custom-button-padding" @click="openModal(house.id)">
                        <img class="icon-delete-dark" src="../assets/ic_delete@3x.png" alt="Delete">
                        <img v-if="detailedCard" class="icon-delete-light" src="../assets/ic_delete_white@3x.png"
                            alt="Delete">
                    </Button>
                </div>
                <div v-else-if="house?.madeByMe && detailedCard"
                    :class="[hover === true ? 'card-content-controls-active' : 'card-content-controls']">
                    <Button class="custom-button-padding" @click.stop="router.push(`/house/edit/${house?.id}`)">
                        <img class="icon-edit-dark" src="../assets/ic_edit@3x.png" alt="Edit">
                        <img v-if="detailedCard" class="icon-edit-light" src="../assets/ic_edit_white@3x.png" alt="Edit">
                    </Button>
                    <Button class="custom-button-padding" @click="openModal(house.id)">
                        <img class="icon-delete-dark" src="../assets/ic_delete@3x.png" alt="Delete">
                        <img v-if="detailedCard" class="icon-delete-light" src="../assets/ic_delete_white@3x.png"
                            alt="Delete">
                    </Button>
                </div>
            </div>

            <div v-if="mainCard" class="card-main-details">
                <p class="price text">&#x20AC; {{ new Intl.NumberFormat('en-DE').format(house?.price) }}</p>
                <p class="adress text">{{ house?.location.zip }} {{ house?.location.city }}</p>
                <div class="dimensions">
                    <img src="../assets/ic_bed@3x.png" alt="Bed">
                    <p class="text-tetriary text">{{ house?.rooms.bedrooms }}</p>
                    <img src="../assets/ic_bath@3x.png" alt="Bath">
                    <p class="text-tetriary text">{{ house?.rooms.bathrooms }}</p>
                    <img src="../assets/ic_size@3x.png" alt="Size">
                    <p class="text-tetriary text">{{ house?.size }} m2</p>
                </div>
            </div>

            <div v-if="recomendedCard" class="card-recomended-details">
                <p class="price text">&#x20AC; {{ new Intl.NumberFormat('en-DE').format(house?.price) }}</p>
                <p class="adress text">{{ house?.location.zip }} {{ house?.location.city }}</p>
                <div class="dimensions">
                    <img src="../assets/ic_bed@3x.png" alt="Bed">
                    <p class="text-tetriary">{{ house?.rooms.bedrooms }}</p>
                    <img src="../assets/ic_bath@3x.png" alt="Bath">
                    <p class="text-tetriary">{{ house?.rooms.bathrooms }}</p>
                    <img src="../assets/ic_size@3x.png" alt="Size">
                    <p class="text-tetriary">{{ house?.size }} m2</p>
                </div>
            </div>

            <div v-if="detailedCard" class="card-detailed-details">
                <div class="dimensions">
                    <p class="adress text"><img src="../assets//ic_location@3x.png" alt="">{{ house?.location.zip }} {{
                        house?.location.city }}</p>
                </div>
                <div class="dimensions">
                    <img src="../assets/ic_price@3x.png" alt="Price">
                    <p class="price text">&#x20AC; {{ new Intl.NumberFormat('en-DE').format(house?.price) }}</p>
                    <img src="../assets/ic_size@3x.png" alt="Size">
                    <p class="size text">{{ house?.size }} m2</p>
                    <img src="../assets/ic_construction_date@3x.png" alt="Construction">
                    <p class="construction text">Built in {{ house?.constructionYear }}</p>
                </div>
                <div class="dimensions">
                    <img src="../assets/ic_bed@3x.png" alt="Bed">
                    <p class="bedrooms text">{{ house?.rooms.bedrooms }}</p>
                    <img src="../assets/ic_bath@3x.png" alt="Bath">
                    <p class="bathrooms text">{{ house?.rooms.bathrooms }}</p>
                    <img src="../assets/ic_garage@3x.png" alt="Garage">
                    <p class="garage text">{{ house?.hasGarage ? "Yes" : "No" }}</p>
                </div>
                <div class="dimensions description">
                    <p class="text-tetriary text">{{ house?.description }}</p>
                </div>
            </div>
        </div>
    </div>
</template>



<style lang="scss" scoped>
@import "../scss/variables";

.icon-edit-dark {
    display: block;
    height: 16px;
}

.icon-delete-dark {
    display: block;
    height: 16px;
}

.custom-button-padding {
    padding: 3px !important;
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
        // .card-main-details {  
        //     position: relative;
        //     display: flex;
        //     flex-direction: column;
        //     height: 100%;
        // }
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

    .card-main-details {
        .price {
            color: $color-text-primary;
            margin-top: 8px;
            margin-bottom: 8px;
        }

        .adress {
            color: $color-tertiary-2;
            margin-bottom: 8px;
        }
    }
}

.card-detailed {
    flex-direction: column !important;

    .card-content-controls-active {
        justify-content: flex-end;
    }

    .card-content-mobile-controls {
        display: none;
        align-self: flex-start;
    }

    .card-content--mobile-controls-active {
        display: flex;
        flex-direction: row;
        transition: $transition;
    }

    .card-image {
        width: 100%;
    }

    .card-content {
        margin-top: 30px;
    }

    h3 {
        margin-bottom: 20px;
    }

    .dimensions {
        margin-bottom: 20px;
    }

    .icon-edit-light {
        display: none;
        height: 16px;
    }

    .icon-delete-light {
        display: none;
        height: 16px;
    }
}

.card-recomended {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    background-color: $color-bg-2;
    border-radius: 4px;
    padding: 15px 10px;

    .card-image {
        width: 35%;
        height: 110px;
        object-fit: cover;
        margin-right: 20px;
    }

    .card-content-header {
        display: flex;
        flex-direction: row;
        align-items: center;
        width: auto;
        justify-content: space-between;

        h4 {
            font-family: $font-family-montserrat;
            font-weight: bold;
            font-size: 14px;
        }

    }

    .card-recomended-details {
        .price {
            color: $color-text-primary;
            margin-top: 5px;
            margin-bottom: 5px;
            font-size: 14px;
        }

        .adress {
            color: $color-tertiary-2;
            margin-bottom: 5px;
            font-size: 14px;
        }

        .dimensions {
            display: flex;
            flex-direction: row;
            align-items: center;
        }

        img {
            height: 16px;
            margin-right: 5px;
        }

        p {
            color: $color-text-secondary;
            margin-right: 10px;
            font-size: 14px;
        }

        p:last-child {
            margin-right: 0;
        }
    }
}

@media only screen and (max-width: 768px) {
    .card-detailed {
        position: relative;

        .card-image {
            object-fit: cover;
        }

        .card-content-controls-mobile {
            position: absolute;
            z-index: 10;
            right: 20px;
            top: 3%;
            display: flex;
        }

        .icon-edit-light {
            display: block;
        }

        .icon-delete-light {
            display: block;
        }

        .card-content {
            width: 100%;
            position: relative;
            z-index: 2;
            margin-top: -50px;
            padding: 40px 40px 40px;
            border-top-right-radius: 30px;
            border-top-left-radius: 30px;
            background-color: $color-bg-2;
        }

        .icon-edit-dark {
            display: none;
        }

        .icon-delete-dark {
            display: none;
            height: 16px;
        }
    }

    .custom-button-padding {
        padding: 3px !important;
    }
}

@media only screen and (max-width: 600px) and (min-width: 280px) {
    .icon-edit-dark {
        height: 14px;
    }

    .icon-delete-dark {
        height: 14px;
    }

    .card-main .card-content .card-content-header {
        align-items: flex-start;
    }

    .card-main .card-content .card-content-header {
        h3 {
            margin-right: 15px;
        }
    }

}

@media only screen and (max-width: 280px) {
    .icon-edit-dark {
        height: 10px;
    }

    .icon-delete-dark {
        height: 10px;
    }

    .custom-button-padding {
        padding: 3px !important;
    }

    .card-main {
        align-items: flex-start;
    }

    .card-main .card-image {
        object-fit: contain;
        margin-right: 10px;
    }

    .card-main .card-content {
        .card-content-header h3 {
            font-size: 12px;
            align-self: start;
        }

        .card-main-details p {
            font-size: 10px;
        }
    }

}

@media only screen and (max-width: 1200px) and (min-width: 768px) {

    .card-recomended {

        .card-image {
            width: 30%;
            height: auto;
            object-fit: cover;
            min-height: 80px;
            margin-right: 13px;
        }

        .card-content-header {
            h4 {
                font-size: 12px;
            }

        }

        .card-recomended-details {

            .price,
            .adress {
                margin-bottom: 3px;
                font-size: 12px;
            }

            .dimensions {
                img {
                    height: 14px;
                    margin-right: 3px;
                }

                p {
                    margin-right: 7px;
                    font-size: 12px;
                }

                p:last-child {
                    margin-right: 0;
                }
            }
        }

    }
}
</style>