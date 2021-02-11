<script>
export default {
  props: {
    type: {
      type: String,
      default: 'text'
    },
    name: {
      type: String,
      default: null
    },
    maxlength: {
      type: Number,
      default: null
    },
    placeholder: {
      type: String,
      default: null
    },
    is_error: {
      type: Boolean,
      default: false
    },
    error: {
      type: String,
      default: null
    },
    value: {
      type: String,
      default: null
    },
    label: {
      type: String,
      default: null
    }
  },
  methods: {}
};
</script>

<template>
  <div class="base-input">
    <label class="base-input__label">
      {{ label }}
    </label>
    <input
      :type="type"
      :name="name"
      :maxlength="maxlength"
      :placeholder="placeholder"
      :value="value"
      class="base-input__input"
      @input="$emit('input', $event.target.value)"
      @blur="$emit('blur')"
    >
    <div 
      v-if="is_error" 
      class="base-input__error">
      {{ error }}
    </div>   
  </div>
</template>

<style lang="scss">
.base-input {
  position: relative;
  display: inline-block;

  &__label {
    font-size: em(16px);
    line-height: 21px;
    font-weight: 500 !important;
    color: $grey;
    margin-bottom: em(8px);
    display: block;
  }

  &__input {
    $size: 16px;
    font-size: em($size);
    font-family: $font-IBMPlexSans;
    width: 100%;
    height: em(52px);
    padding: em(16px, $size);
    box-sizing: border-box;
    box-shadow: 0px 4px 8px rgba(44, 39, 56, 0.04) !important;
    border: 1px solid $light-grey;
    border-radius: em(6px, $size);
    background-color: $white !important;
    outline: none;

    &::placeholder {
      color: $light-blue;
      font-weight: 400;
    }

    &:focus {
      border: 2px solid $blue;
    }    
  }

  &__error {
    font-size: em(14px);
    font-family: $font-IBMPlexSans;
    color: $red;
  }  
}

</style>
