<script>
/**/
export default {
  props: {
    name: {
      type: String,
      default: null
    },
    is_active: {
      type: Boolean,
      default: false
    },
    isError: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      active: this.is_active,
      error: this.isError
    };
  },
  computed: {
    value() {
      return this.active ? 1 : 0;
    }
  },
  watch: {
    active() {
      this.sendEvent();
    }
  },
  mounted() {},
  methods: {
    onClick() {
      this.active = !this.active;
    },
    sendEvent() {
      this.$emit('input', this.active);
    },
    onError() {
      this.error = false;

      setTimeout(() => {
        this.error = true;
      }, 30);
    }
  }
};
</script>

<template>
  <div
    :class="{ is_active: is_active, is_error: isError }"
    class="base-checkbox"
    @click.stop="onClick"
  >
    <input
      ref="input"
      :value="value"
      :name="name"
      type="text"
      class="base-checkbox__input"
    >
    <div class="base-checkbox__check">
      <svg
        class="base-checkbox__tick" viewBox="0 0 15 11" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M15.2 0.801239C15.2 0.800413 15.2 0.799587 15.2 0.798761C15.1997 0.594436 15.1216 0.390209 14.9657 0.234315C14.6533 -0.0781049 14.1467 -0.0781049 13.8343 0.234315L4.8 9.26863L1.36569 5.83431C1.05327 5.5219 0.546734 5.5219 0.234315 5.83431C-0.0781049 6.14673 -0.0781049 6.65327 0.234315 6.96569L4.23431 10.9657C4.54673 11.2781 5.05327 11.2781 5.36569 10.9657L14.9657 1.36569C15.1216 1.20979 15.1997 1.00556 15.2 0.801239Z" fill="#0880AE"/>
      </svg>
    </div>
    <div class="base-checkbox__title">
      <slot />
    </div>
  </div>
</template>

<style lang="scss">
.base-checkbox {
  text-align: left;
  position: relative;
  user-select: none;
  padding-left: em(35px);
  cursor: pointer;
  display: inline-block;
  a {
    text-decoration: underline;
    &:hover {
      text-decoration: none;
    }
  }
  &__title {
    a {
      text-decoration: underline;
      &:hover {
        text-decoration: none;
      }
    }
  }
  &__input {
    position: absolute;
    visibility: hidden;
    font-size: 0;
    width: 0;
    height: 0;
    padding: 0;
    border: 0;
    outline: 0;
  }
  &.is_error {
    color: $red;
    .checkbox__title {
      color: $red;
      a {
        color: $red;
      }
    }
  }
  &__check {
    position: absolute;
    left: 0;
    border: 2px solid $dark-blue;
    box-sizing: border-box;
    border-radius: em(4px);
    width: em(28px);
    height: em(28px);
    background: $white;
    @include ifparent('.base-checkbox.is_active') {
      // background: $blue;
    }
    @include ifparent('.base-checkbox.is_active-add') {
      background: $grey;
      border: 2px solid $grey;
    }
    @include ifparent('.base-checkbox.is_error') {
      background: $red;
    }
  }
  &__tick {
    fill: none;
    width: em(15px);
    height: em(11px);
    position: absolute;
    top: em(7px);
    left: em(5px);
    visibility: hidden;
    transform: scale(1.5);
    @include ifparent('.base-checkbox.is_active') {
      visibility: visible;
      transform: scale(1);
      transition: transform $speed;
    }
  }
}
</style>
