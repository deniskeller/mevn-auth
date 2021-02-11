<script>

export default {
  components: {
    
  },

  props: {
    title: {
      type: String,
      default: null
    },
    editable: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      edit: false
    };
  },
  computed: {},

  mounted() {},

  methods: {
    
    editStart() {
      this.edit = true;
      setTimeout(() => {
        this.$refs.input.select();
      });
    },
    editEnd() {
      this.edit = false;
      this.title = this.$refs.input.value;
      this.postChangeNamePortflio({
        name: this.$refs.input.value
      });
    }
  }
};
</script>

<template>
  <div 
    :class="{ 'base-headline_row': !editable }" 
    class="base-headline">
    
    <div class="base-headline__info">
      <BaseTitle 
        v-if="!edit && title" 
        class="base-headline__title">{{ title }}</BaseTitle>
      
      <input
        v-if="edit"
        ref="input"
        :value="title"
        type="text"
        maxlength="15"
        class="base-headline__input"
      >
    </div>  
      
    
    
    <slot />
    
    
    
  </div>
</template>

<style lang="scss">
.base-headline {  
  @include ifmobile {
    position: relative;    
  }
}
.base-headline {
  position: relative;
  box-sizing: border-box;  

  &__input {
    font-size: em(36px);
    font-family: $font-IBMPlexSans;
    width: 100%;
    max-width: em(130px);
    border: none;
    background-color: $white;
    color: $blue;
    outline: none;

    &::placeholder {
      color: #dedede;
    }
  }
}
</style>
