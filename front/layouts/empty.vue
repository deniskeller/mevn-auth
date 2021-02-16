<template>
  <div class="empty-layout">
    <nuxt />
    <notifications group="all" classes="my-notification"/>
  </div>
</template>
<style lang="scss" scoped>
.empty-layout {
  display: flex;
  justify-content: center;
}
</style>
<script>
export default {
}
</script>
<style lang="scss" scoped>
.vue-notification-group {
  position: absolute;
  font-size: 12px;
  color: #ffffff;
  background: #44A4FC;
  border-left: 5px solid #187FE7;
}
</style>
