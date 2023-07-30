<script setup>
defineProps({
  textAppearence: {
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
  text: {
    type: String,
    default: ""
  },
  isSubmit: {
    type: Boolean,
    default: false
  }
})


</script>

<template>
  <button class="button" :class="{ 'primary': isPrimary, 'secondary': isSecondary, 'tertiary': isTertiary }"
    :type="{ isSubmit: 'submit' }">
    <slot></slot>
    <span :class="textAppearence === true && 'text-show'">
      {{ text }}
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


@media only screen and (max-width: 600px) {
  .button {

    .text-show {
      display: none;
    }
  }
}
</style>