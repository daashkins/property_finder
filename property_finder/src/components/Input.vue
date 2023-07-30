<script setup>

defineProps({
  inputLabel: {
    type: String
  },
  inputId: {
    type: String
  },
  inputType: {
    type: String
  },
  placeholder: {
    type: String
  },
  isRequired: {
    type: Boolean,
    default: false,
  },
  select: {
    type: Boolean,
    default: false,
  },
  textarea: {
    type: Boolean,
    default: false,
  },
  options: {
    type: Array,
  },
  error: {
    type: Boolean,
    default: false
  },
  modelValue: {
    type: [String, Number, File, Boolean],
    default: ""
  }
})
</script>

<template>
  <div class="input-container">
    <label :for="inputId" class="input-title">{{ inputLabel }} <sup v-if="isRequired" class="star">*</sup></label>
    
    <select v-if="select" :id="inputId" @input="$emit('update:modelValue', $event.target.value)" :class="error && 'input-error'">
      <option class="input" value="">Select</option>
      <option v-for="(option, index) in options" :key="index" :value="option.value" class="input"
        :selected="modelValue === option.value">
        {{ option.label }}
      </option>
    </select>

    <textarea v-else-if="textarea" :id="inputId" rows="4" cols="50" :placeholder="placeholder" class="input" :class="error && 'input-error'"
      :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" ></textarea>

    <input v-else :type="inputType" :id="inputId" :placeholder="placeholder"  class="input" :class="error && 'input-error'"
      :value="modelValue" @input="$emit('update:modelValue', $event.target.value)">

  </div>
</template>



<style lang="scss" scoped>
@import "../scss/variables";
@import "../scss/main";

.input-container {
  display: flex;
  flex-direction: column;
  width: 100%;

  label {
    margin-top: 10px;
    margin-bottom: 10px;
    color: $color-text-secondary;
  }

  input,
  select,
  textarea {
    padding: 10px;
    border-radius: 6px;
    border: none;
    margin-bottom: 10px;
  }

  .input:focus {
    outline: none;
    border: none;
  } 
  input:focus,
  select:focus
   {
    outline: none;
    border: none;
  }

  select:focus {
    width: 100%;
  }

  .input-error {
    border: 1px solid red;
  }

  select,
  option {
    font-family: "Open Sans", sans-serif;
    font-weight: 400;
    font-size: 14px;
    color: #777777;
    padding: 8.5px;
  }

  option {
    width: 100%;
  }


}

@media only screen and (max-width: 600px) {
  .input-container {
    select,
    option {
      font-size: 12px;
    }
  }

}
</style>