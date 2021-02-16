<script>
export default {
  props: {
    to: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'secondary'
    },
    isInactive: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<template>
  <NuxtLink
    :to="to"
    :class="['base-button_' + type, { is_inactive: isInactive }]"
    tag="button"
    class="base-button"
  >
    <slot />
  </NuxtLink >
</template>

<style lang="scss">
.base-button {
  $size: 16px;
  font-size: em($size);
  font-family: $font-IBMPlexSans;
  box-sizing: border-box;
  border: none;
  border-radius: em(6px);
  height: em(56px);
  padding: 0 em(24px);
  outline: none;
  white-space: nowrap;
  user-select: none;
  cursor: pointer;
  display: inline-flex;
  justify-content: center;
  align-items: center;  

  @include ifdesktop {
    min-width: em(100px, $size);
  }

  &.is_inactive {    
    cursor: default;
    pointer-events: none;
  }

  &_primary,
  &_orange {
    position: relative;
    background-size: 101%;
    color: $white;
    box-shadow: 0 em(2px) em(16px) rgba(15, 103, 240, 0.5);
    transition: box-shadow $speed;

    &.is_inactive {
      background: #f1f7ff;
      box-shadow: none;
    }

    &::after {
      content: '';
      display: block;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background-color: $white;
      opacity: 0;
      border-radius: em(50px);
      transition: opacity $speed;
    }

    &:hover {
      &::after {
        opacity: 0.1;
      }
      box-shadow: 0 em(4px) em(18px) rgba(15, 103, 240, 1);
    }
    &:active {
      background: darken($blue, 10%);
      box-shadow: none;
    }
  }

  &_primary {
    @extend %blue-gradient;
    &:active {
      background: darken($blue, 10%);
    }
  }

  &_orange {
    @extend %orange-gradient;
    &:active {
      background: darken($orange, 10%);
    }
  }

  &_secondary {
    color: $blue;
    border: 2px solid $blue;
    background: none;
    padding: em(12px, $size) em(22px, $size);

    transition-property: color, background;
    transition-duration: $speed;

    &.is_inactive {
      border-color: $grey;
    }

    &:hover {
      color: $white;
      background: $blue;
    }

    &:active {
      background: darken($blue, 10%);
    }
  }

  &_default {
    width: 100%;
    font-size: em(16px);
    font-weight: 500;
    color: $white;
    padding: em(18px) 0px;    
    background: $blue;
    box-shadow: 0px 2px 4px rgba(44, 39, 56, 0.08), 0px 4px 8px rgba(44, 39, 56, 0.08);

    transition-property: color, background;
    transition-duration: $speed;

    &.is_inactive {
      color: #B1B5BF;
      background: $light-grey;
      box-shadow: 0px 4px 8px rgba(44, 39, 56, 0.08);
    }

    &:hover {
      box-shadow: 0px em(12px) em(24px) rgba(44, 39, 56, 0.08), 0px em(24px) em(48px) rgba(44, 39, 56, 0.16);
    }

    &:active {
      border: 2px solid rgba(44, 39, 56, 0.86);
      box-shadow: none;
    }
  }

  &_white {
    background-color: $white;
    color: $blue;
    box-shadow: 0 em(2px) em(16px) rgba(255, 255, 255, 0.5);
    transition: box-shadow $speed;

    &:hover {
      box-shadow: 0 em(3px) em(20px) rgba(255, 255, 255, 1);
    }

    &:active {
      background-color: $light-blue;
      box-shadow: none;
    }
  }

  &_translucent {
    background: linear-gradient(90deg, #f1f7ff 0%, #0395ff 100%);
    color: $white;
    box-shadow: 0px 2px 10px rgba(15, 103, 240, 0.5);
    transition: box-shadow $speed;

    &.is_inactive {
      background: #f1f7ff;
      box-shadow: none;
    }

    &:hover {
      box-shadow: 0 em(4px) em(18px) rgba(15, 103, 240, 1);
    }
    &:active {
      background: darken(#0395ff, 10%);
    }
  }
}
</style>
