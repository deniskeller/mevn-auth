<script>
export default {
  props: {
    title: {
      type: String,
      default: null
    }
  }
};
</script>

<template>
  <div class="base-currency">    
    <div 
      class="base-currency__title" 
      v-html="title" />
  </div>
</template>

<style lang="scss">
.base-currency {
  display: flex;
  align-items: center;
  &__coin {
    margin-right: em(14px);
  }
  &__title {
    $size: 16px;
    font-size: em($size);
  }
}
</style>
