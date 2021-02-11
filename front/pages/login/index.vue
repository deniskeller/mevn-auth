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
        type="name"
        name="name"
        placeholder="Введите Ваше имя"
        class="login-form__input"
        v-model.trim="form.name"
      />

      <BaseInput
        label="Еmail"
        type="email"
        name="email"
        placeholder="Введите ваш email"
        class="login-form__input"
        v-model.trim="form.email"
      />

      <BaseButton
        :is-inactive="is_login"
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
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';

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
      }
    }
  },
  computed: {
    ...mapGetters({
      count: 'auth/count2'
      // ['', 'count2']
    }),
    // ...mapState('auth', ['count']),
    // count() {
    //   return this.$store.state.auth.count;
    // },
  },
  methods: {
    ...mapMutations(['auth/increment']),

    async submitHandler() {

      try {
        const formData = {
          name: this.form.name,
          email: this.form.email
        };
        console.log('formData: ', formData);

        let response = await login(formData);
        console.log('response: ', response);
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
