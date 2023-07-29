<script setup>

defineProps({
  inputLabel: {
    type: String
  },
  inputId: {
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
  modelValue: {
    type: [String, Number, File],
    default: ""
  }
})
</script>

<template>
  <div class="input-container">
    <label :for="inputId" class="input-title">{{ inputLabel }} <sup v-if="isRequired" class="star">*</sup></label>

    <select v-if="select" :id="inputId" @input="$emit('update:modelValue', $event.target.value)" :required='isRequired'>
      <option class="input" value="">Select</option>
      <option v-for="(option, index) in options" :key="index" :value="option" class="input"
        :selected="modelValue === option">
        {{ option }}
      </option>
    </select>

    <textarea v-else-if="textarea" :id="inputId" rows="4" cols="50" :placeholder="placeholder" class="input"
      :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" :required='isRequired'></textarea>

    <input v-else type="text" :id="inputId" :placeholder="placeholder" :required='isRequired' class="input"
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

  input:focus,
  select:focus,
  textarea:focus {
    outline: none;
    border: none;
  }

  select:focus {
    width: 100%;
  }

  select,
  option {
    font-family: "Open Sans", sans-serif;
    font-weight: 400;
    font-size: 14px;
    color: #777777;
  }

  option {
    width: 100%;
  }


}

@media only screen and (max-width: 600px) {
  .input-container {
    textarea {
      margin-bottom: 100px;
    }
  }
}
</style>