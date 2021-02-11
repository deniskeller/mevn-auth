<script>
import baron from 'baron';

export default {
  data() {
    return {};
  },
  computed: {},
  mounted() {
    baron({
      root: '.base-scroll-block',
      scroller: '.base-scroll-block__scroller',
      bar: '.base-scroll-block__bar'
    });
  },
  methods: {}
};
</script>

<template>
  <div class="base-scroll-block">
    <div class="base-scroll-block__scroller">
      <slot />
    </div>
    <div class="base-scroll-block__track">
      <div class="base-scroll-block__bar">
        <svg 
          class="base-scroll-block__bar-icon" 
          viewBox="0 0 4 10">
          <path d="M0 1H4M0 4.7651H4M0 8.5302H4" />
          <path d="M0 1H4M0 4.7651H4M0 8.5302H4" />
        </svg>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.base-scroll-block,
.base-scroll-block-2 {
  position: relative;
  overflow: hidden;

  &__scroller,
  &__scroller-2 {
    overflow-y: scroll;
    -ms-overflow-style: none;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    -webkit-overflow-scrolling: touch;
    width: 100%;
    height: 100%;
    max-height: em(200px);

    &::-webkit-scrollbar {
      width: 0;
      height: 0;
    }
  }
  .base-scroll-block__track {
    display: none;
    position: absolute;
    top: 0;
    right: em(4px);
    bottom: em(6px);
    width: em(6px);
    background: $grey;
    border-radius: em(3px);
  }
  &._scrollbar &__track {
    display: block;
  }
  &__free {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
  }
  &__bar,
  &__bar-2 {
    display: none;
    justify-content: center;
    align-items: center;
    position: absolute;
    right: em(-2px);
    width: em(8px);
    border: 1px solid $grey;
    border-radius: em(4px);
    background-color: $white;
    box-shadow: 0 em(2px) em(5px) $grey;
  }
  &._scrollbar &__bar,
  &._scrollbar &__bar-2 {
    display: flex;
  }

  &__bar-icon {
    width: em(5px);
    height: em(10px);
    stroke: $grey;
  }
}
</style>
