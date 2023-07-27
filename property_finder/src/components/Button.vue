<script setup>
defineProps({
  textAppearence: {
    type: Boolean,
    default: false
  },
  addIcon: {
    type: Boolean,
    default: false
  },
  editIcon: {
    type: Boolean,
    default: false
  },
  deleteIcon: {
    type: Boolean,
    default: false
  },
  backIcon: {
    type: Boolean,
    default: false
  },
  isBlured: {
    type: Boolean,
    default: false
  },
  isPrimary: {
    type: Boolean,
    default: false
  },
  isSecondary: {
    type: Boolean,
    default: false
  },
  isTertiary: {
    type: Boolean,
    default: false
  },
  isNoBg: {
    type: Boolean,
    default: false
  },
  isSubmit: {
    type: Boolean,
    default: false
  }
})


</script>

<template>
  <button class="button" 
    :class="{ 'primary': isPrimary, 'secondary': isSecondary, 'blured': isBlured, 'tertiary': isTertiary, 'back-button': backIcon }" :type="{isSubmit: 'submit'}">
    <img :class="addIcon === true && 'icon-add-desktop'" src="../assets/ic_plus_white@3x.png" alt="Plus">
    <img :class="addIcon === true && 'icon-add-mobile'" src="../assets/ic_plus_grey@3x.png" alt="Plus">
    <img :class="editIcon === true && 'icon-edit'" src="../assets/ic_edit@3x.png" alt="Edit">
    <img :class="deleteIcon === true && 'icon-delete'" src="../assets/ic_delete@3x.png" alt="Delete">
    <img :class="backIcon === true && 'icon-back'" src="../assets/ic_back_grey@3x.png" alt="Back">
    <span :class="textAppearence === true && 'text-show'">
      <slot></slot>
    </span>
  </button>
</template>



<style lang="scss" scoped>
@import "../scss/variables";
@import "../scss/main";

.button {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  padding-left: 1rem;
  padding-right: 1rem;
  border-radius: 0.25rem;
  background-color: transparent;
  box-shadow: none;
  border: 0;
  color: $color-bg-1;

  img {
    display: none;
  }

  .icon-add-desktop {
    display: block;
    height: 10px;
  }

  .icon-add-mobile {
    display: none;
    height: 10px;
  }

  .icon-edit {
    display: block;
    height: 16px;
  }

  .icon-delete {
    display: block;
    height: 16px;
  }
  .icon-back {
    display: block;
    height: 16px;
  }
}

.primary {
  background-color: $color-element-primary;
}

.secondary {
  background-color: $color-text-secondary;
}

.tertiary {
  background-color: $color-tertiary-2;
}

.isNoBg {
  background-color: transparent;
}


@media only screen and (max-width: 600px) {
  .button {
    background-color: transparent;

    .icon-add-desktop {
      display: none;
    }

    .icon-add-mobile {
      display: block;
      height: 20px;
    }

    .text-show {
      display: none;
    }
  }
}</style>