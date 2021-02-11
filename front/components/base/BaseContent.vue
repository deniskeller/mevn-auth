<template>
  <div class="base-content">
    <slot />
  </div>
</template>

<style lang="scss">
.base-content {  
  padding: em(40px) em(30px);
  background: $white;
  box-shadow: 0px 12px 24px rgba(44, 39, 56, 0.02), 0px 32px 64px rgba(44, 39, 56, 0.04);
  border-radius: 24px;
  @include ifdesktop {
    max-width: em(460px);
  }
  @include ifmobile {
    width: 100%;
    border-radius: 0px;
  }
}
</style>
