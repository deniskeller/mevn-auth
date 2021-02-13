<template>
  <BaseContent>
    <BaseHeadline 
      title="Регистрация" 
      class="login-headline">
      <p class="login-headline__subtitle">
        Уже есть аккаунт? <nuxt-link class="login-headline__subtitle__link" to="/login">Войти</nuxt-link>
      </p>
    </BaseHeadline>
    <form class="login-form" id="form">     

      <BaseInput
        label="Имя"   
        type="text"
        name="name"
        placeholder="Введите Ваше имя"
        class="login-form__input"  
        v-model="form.name"
        :is_error="isNameValid"
        :error="error"
        @blur="$v.form.name.$touch()"
      />      

      <BaseInput
        label="Еmail"   
        type="text"
        name="email"
        v-model.trim="form.email"
        placeholder="Введите ваш email"
        class="login-form__input"
        :is_error="!$v.form.email.email && $v.form.email.$error"
        :error="error"
        @blur="$v.form.email.$touch()"
      />

      <BaseInput
        label="Номер телефона"   
        type="text"
        name="phone"
        v-model="form.phone"
        placeholder="Введите номер телефона"
        class="login-form__input"
        :is_error="isPhoneValid"
        :error="error"
        @blur="$v.form.phone.$touch()"
      />
      
      <BaseSelect
        label="Язык"  
        :list="['Русский', 'Китайский', 'Английский', 'Испанский', 'Английский', 'Испанский', 'Английский', 'Испанский']"
        :currencies="true"
        type="form"
        name="language"
        v-model="form.language"
        class="login-form__select"
      >
        Язык
      </BaseSelect>

      <div class="login-form__chekbox">
        <BaseCheckbox 
          :is_active="form.is_agree"
          v-model="form.is_agree"
          name="agree"
          @click="isAgree(form.is_agree)"/>
        <p class="login-form__chekbox__title">Принимаю <nuxt-link  to="/terms">условия</nuxt-link> использования</p> 
      </div>

      <BaseButton
        type="default"
        class="login-form__button"
        :is-inactive="$v.$invalid || !form.is_agree || !form.language"
        @click.native="submitHandler()"
      >
        Зарегистрироваться
      </BaseButton>
    </form>
  </BaseContent>
</template>

<script>
import { validationMixin } from 'vuelidate';
import { email, required } from "vuelidate/lib/validators";
import { checkRegexPhone, checkLengthPhone } from '@/validators/phone';

import { mapGetters, mapActions, mapMutations } from 'vuex';

import { register } from '@/services/ApiServicesAuth';

export default {
  layout: 'empty',
  data() {
    return {
      form: {
        name: '',
        email: '',
        phone: '',
        language: null,
        is_agree: false,
      },
      error: 'Введено не корректное значение'      
    };
  },
  mixins: [validationMixin],
  validations: {
    form: {
      name: {
        isNameValid(value) {
          return /^[A-ZА-Яa-zа-я -]+$/.test(value);
        },
        required,
      },
      email: { email, required },
      phone: {
        checkRegexPhone,
        checkLengthPhone,
        required
      }
    }    
  },

  computed: {

    isNameValid() {
      return (!this.$v.form.name.isNameValid && this.$v.form.name.$model !== '' && this.$v.form.name.$dirty) ? true : false;
    },
    isPhoneValid() {
      return ((!this.$v.form.phone.checkRegexPhone || !this.$v.form.phone.checkLengthPhone) 
          && this.$v.form.phone.$error && this.$v.form.phone.$model !== '') ? true : false;
    },
    isAgreeValid() {
      return this.is_agree 
    },
  },

  mounted() {},

  methods: {
    ...mapMutations(['increment']),
    
    async submitHandler(){

      try {
        const formData = {
          name: this.form.name,
          email: this.form.email,
          phone: this.form.phone,
          language: this.form.language
        };

        let response = await register(formData);

        console.log('response: ', response);

        this.$store.commit('setAuth', true);
        // this.$router.push('/');

      } catch (err) {
        console.log('error: ' + err)
      }
    },

    isAgree(is_agree) {
      is_agree = !is_agree
    }

  }
}

</script>

<style lang="scss" scoped>
.login-headline {
  margin-bottom: em(56px);
  @include ifmobile {
    margin-bottom: em(40px);
  }
  &__subtitle {
    font-size: em(16px);
    &__link {
      margin-left: em(6px);
    }
  }
}

.login-form {
  &__input {
    width: 100%;
    margin-bottom: em(34px);
  }
  &__select {
    width: 100%;
    margin-bottom: em(31px);
  }

  &__chekbox {
    display: flex;
    margin-bottom: em(38px);
    &__title {
      font-size: em(16px);
      font-family: $font-IBMPlexSans;
      font-style: normal;
      font-weight: 500;
      color: $grey;
      a{
        color: $blue;
        text-decoration: none;
      }
    }
  }
  
}


</style>