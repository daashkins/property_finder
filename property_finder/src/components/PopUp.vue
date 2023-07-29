<script setup>
import Button from '../components/Button.vue'
import router from '../router';
import { useModalStore } from "../stores/useModalStore.js";
import { useHousesStore } from "../stores/useHousesStore.js";

const houseStore = useHousesStore();
const modalStore = useModalStore();

const handleDelete = async (id) => {
    await houseStore.deleteHouse(id);
    modalStore.closeModal();
    router.push('/')
}
</script>

<template>
    <Teleport to="body">
        <Transition name="modal-fade">
            <div v-if="modalStore.open" class="modal-wrapper">
                <div class="modal-container">
                    <h3>Delete listing</h3>
                    <p class='input'> Are you sure you want to delete the listing?</p>
                    <p class='input last-p'> This action cannot be undone.</p>
                    <div class="buttons-group">
                        <Button isPrimary @click="handleDelete(modalStore.id)">YES, DELETE</Button>
                        <Button isSecondary @click="modalStore.closeModal">GO BACK</Button>
                    </div>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>



<style lang="scss" scoped>
@import "../scss/main";
@import "../scss/variables";

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.modal-wrapper {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 500;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.2);
    display: grid;
    place-items: center;
}


.modal-container {
    background-color: $color-bg-2;
    border-radius: 8px;
    // margin: 0 auto;
    padding: 20px;
    width: 30%;
    height: 40%;
    display: flex;
    flex-direction: column;
    align-items: center;

    h3 {
        margin-bottom: 20px;
    }

    p {
        color: $color-text-secondary;
    }

    .last-p {
        margin-bottom: 20px;
    }

    .buttons-group {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        height: auto;
        margin: auto;

        button {
            width: 80%;
            justify-content: center;
        }

        button:first-child {
            margin-bottom: 20px;
        }
    }
}
</style>