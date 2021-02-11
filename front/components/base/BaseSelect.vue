<template>
  <div class="wrapper">

    <label class="base-select__label">
      {{ label }}
    </label>

    <div
      class="base-select"
      @click.stop="showList">      

      <input 
        :name="name" 
        :value="value" 
        type="hidden">

      <div
        v-if="!value"
        :class="{ active: show }"
        class="base-select__input"
      >
        <slot/>
      </div>

      <div
        v-else-if="value"
        :class="{ active: show }"
        class="base-select__input__select-item"
      >
        <BaseCurrency :title="value" />
      </div>    

      <svg  class="base-select__icon" viewBox="0 0 18 9"  fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 6.58581L14.2929 0.292906C14.6834 -0.0975945 15.3166 -0.0975945 15.7071 0.292906C16.0976 0.683406 16.0976 1.31661 15.7071 1.70711L8.7071 8.70711C8.3166 9.09761 7.6834 9.09761 7.2929 8.70711L0.29289 1.70711C-0.09763 1.31661 -0.09763 0.683406 0.29289 0.292906C0.68342 -0.0975945 1.31658 -0.0975945 1.70711 0.292906L8 6.58581Z" fill="#0880AE"/>
            
      </svg>

      <transition name="base-select-fade">
        <div 
          v-if="show" 
          class="base-select-list base-select__list">
          <template>
            <BaseScrollBlock>
              <div
                v-for="(item, index) in list"
                :key="index"
                class="base-select-list__item"
                @click="setData(item)"
              >              

                <BaseCurrency 
                  v-if="currencies" 
                  :title="item" />              

                <template v-else-if="!currencies">
                  {{ item }}
                </template>
              </div>
            </BaseScrollBlock>
          </template>
        </div>
      </transition>
    </div>

  </div>  
</template>

<script>

export default {
  props: {
    list: {
      type: Array,
      default: null
    },
    type: {
      type: String,
      default: 'default'
    },
    name: {
      type: String,
      default: null
    },
    label: {
      type: String,
      default: null
    },
    isError: {
      type: Boolean,
      default: false
    },
    currencies: {
      type: Boolean,
      default: false
    },
  },

  data() {
    return {
      show: false,
      value: null
    };
  },

  methods: {
    keyUp(e) {
      if (e.keyCode == 27) {
        this.show = false;
        document.removeEventListener('click', this.hideList);
        document.removeEventListener('keyup', this.keyUp);
      }
    },
    showList() {
      this.show = !this.show;
      document.addEventListener('click', this.hideList);
      document.addEventListener('keyup', this.keyUp);
    },
    hideList(e) {      
      if ( e.target.className !== 'base-select') {
        document.removeEventListener('click', this.hideList);
        document.removeEventListener('keyup', this.keyUp);
        this.show = false;
      }
    },
    setData(item) {      
      this.value = item;
      this.$emit('input', this.value);
    }
    
  }
};
</script>

<style lang="scss" scoped>
.base-select {
  $this: &;
  $size: 16px;
  width: 100%;
  min-width: em(250px);
  position: relative;
  display: inline-block;
  cursor: pointer;

  &__label {
    font-size: em(16px);
    line-height: 21px;
    font-weight: 500 !important;
    color: $grey;
    margin-bottom: em(8px);
    display: block;
  }

  &__input, .base-select__input__select-item, .active {
    $size: 16px;
    font-size: em($size);
    font-family: $font-IBMPlexSans;
    font-weight: 400;
    color: $light-blue;
    background-color: $white;
    width: 100%;
    height: em(52px);
    padding: em(16px, $size);
    box-sizing: border-box;
    border: 1px solid $light-grey;
    border-radius: em(6px, $size);
    box-shadow: 0px 4px 8px rgba(44, 39, 56, 0.04);
    pointer-events: none;
    display: flex;
    justify-content: space-between;
    align-items: center;
    white-space: nowrap;    
    outline: none;

    &__select-item {
      color: $black !important;   
    } 

    &.is_error {
      border-color: $red;
    }
  }

  .active {
    border: 2px solid $blue !important;
  }
  

  &__icon {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    transition: fill $speed;
    right: em(15px);
    width: em(18px);
    height: em(9px);
  }

  &__list {
    position: absolute;
    min-width: 100px;
    max-width: 100%;
    width: 100%;
    overflow: hidden;
    top: em(57px);
    right: 0;
    z-index: 2;
  }
}


.base-select-list {
  background-color: $white;
  border-radius: em(6px);
  border: 1px solid $light-grey;
  box-shadow: 0px em(4px) em(8px) rgba(44, 39, 56, 0.04), 0px em(20px) em(20px) rgba(44, 39, 56, 0.04);
  padding: em(12px) 0;

  &__item {
    color: $grey;
    padding: 0 em(15px);
    height: em(48px);
    transition: background-color $speed;
    display: flex;
    justify-content: space-between;
    align-items: center;
    white-space: nowrap;
    position: relative;

    &:hover {
      background-color: $super-light-blue;
    }
  }

  &__second {
    text-align: right;
  }
}

.base-select-fade-enter-active,
.base-select-fade-leave-active {
  transition-property: max-height;
  transition-timing-function: ease-in;
  transition-duration: $speed;
  max-height: em(200px);
}
.base-select-fade-enter,
.base-select-fade-leave-to {
  max-height: 100%;
}

.base-select-fade-leave-to {
  transition-duration: 0.1s;
  z-index: 1;
}

</style>
