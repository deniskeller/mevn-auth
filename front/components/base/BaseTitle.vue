<script>
export default {
  props: {
    type: {
      type: String,
      default: 'h1'
    }
  }
};
</script>

<template>
  <h1 
    v-if="type === 'h1'" 
    :class="['title_' + type]" 
    class="title">
    <slot />
  </h1>
  <h2 
    v-else-if="type === 'h2'" 
    :class="['title_' + type]" 
    class="title">
    <slot />
  </h2>
  <h3 
    v-else-if="type === 'h3'" 
    :class="['title_' + type]" 
    class="title">
    <slot />
  </h3>
</template>

<style lang="scss" scoped>
.title {
  font-weight: bold;
  margin: 0;

  &_h1 {
    @include ifdesktop {
      font-size: em(34px);
      line-height: 44px;
    }
    @include ifmobile {
      font-size: em(26px);
    }
  }
  &_h2 {
    font-size: em(26px);
  }
  &_h3 {
    text-transform: uppercase;
    font-size: em(14px);
    margin-bottom: 0.3em;
  }
}
</style>
