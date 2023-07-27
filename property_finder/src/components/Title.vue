<script setup>
</script>

<template>
    <h2>       
        <slot></slot>
    </h2>
</template>



<style lang="scss" scoped>
@import "../scss/variables";

h2 {
  text-transform: capitalize;
  color: $color-tertiary-1;
    .icon{
      display: none;
    }
    .iconShow {
      display: block;
      height: 10px;
    }
}
.primary {
  background-color: $color-element-primary;
} 
.secondary {
  background-color: $color-element-secondary;
} 
</style>