<template>
  <BaseContent>
    <BaseHeadline title="Вход" class="login-headline">
      <p class="login-headline__subtitle">
        Нет аккаунта?
        <nuxt-link class="login-headline__subtitle__link" to="/registration"
          >Зарегистрироваться</nuxt-link
        >
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

      <BaseButton
        :is-inactive="$v.$invalid"
        type="default"
        class="login-form__button"
        @click.native="submitHandler"
      >
        Войти
      </BaseButton>

    </form>
  </BaseContent>
</template>

<script>
import { email, required } from "vuelidate/lib/validators";
import { mapGetters, mapActions, mapMutations } from 'vuex';

import { login } from '@/services/ApiServicesAuth';

export default {
  layout: 'empty',
  data() {
    return {
      is_login: false,
      is_agree: true,
      form: {
        name: '',
        email: ''
      },
      error: 'Введено не корректное значение'
    }
  },

  validations: {
    form: {
      name: {
        isNameValid(value) {
          return /^[A-ZА-Яa-zа-я -]+$/.test(value);
        },
        required,
      },
      email: { email, required }
    }    
  },

  computed: {    

    isNameValid() {
      return (!this.$v.form.name.isNameValid && this.$v.form.name.$model !== '' && this.$v.form.name.$dirty) ? true : false;
    },

  },
  methods: {
    ...mapMutations('auth', ['setAuth']),

    async submitHandler() {

      try {
        const formData = {
          name: this.form.name,
          email: this.form.email
        };
        console.log('formData: ', formData);

        let response = await login(formData);
        console.log('response: ', response);
        this.$store.commit('setAuth', true);
        this.$router.push('/');

      } catch (err) {
        console.log('error: ' + err)
      }     

      
    },
    increment() {
      this.$store.commit('auth/increment', 5)
      // console.log('count', this.$store.state.auth.count)
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
    margin-bottom: em(38px);
  }
  &__terms-of-use {
    font-size: em(16px);
    font-family: $font-IBMPlexSans;
    font-style: normal;
    font-weight: 500;
    color: $grey;
    a {
      color: $blue;
      text-decoration: none;
    }
  }
}
</style>
