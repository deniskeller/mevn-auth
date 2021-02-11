<script>
import BaseButton from '~/components/base/BaseButton';
import BaseInput from '~/components/base/BaseInput';
import BaseSelect from '~/components/base/BaseSelect';
import BaseCheckbox from '~/components/base/BaseCheckbox';

export default {
  components: {
    BaseButton, 
    BaseInput, 
    BaseSelect, 
    BaseCheckbox, 
  }
};
</script>

<template>
  <div class="layout-preload">
    <BaseButton />
    <BaseInput />
    <BaseSelect />
    <BaseCheckbox />
  </div>
</template>

<style>
.layout-preload {
  display: none;
}
</style>
