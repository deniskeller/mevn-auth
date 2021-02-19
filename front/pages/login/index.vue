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
import { email, required } from 'vuelidate/lib/validators'
import { mapGetters, mapActions, mapMutations } from 'vuex'

const Cookie = process.client ? require('js-cookie') : undefined

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
          return /^[A-ZА-Яa-zа-я -]+$/.test(value)
        },
        required
      },
      email: { email, required }
    }
  },

  computed: {
    isNameValid() {
      return !this.$v.form.name.isNameValid &&
        this.$v.form.name.$model !== '' &&
        this.$v.form.name.$dirty
        ? true
        : false
    }
  },

  methods: {
    ...mapMutations(['setAuth']),
    ...mapActions(['login']),

    async submitHandler() {
      
      try {
        const formData = {
          name: this.form.name,
          email: this.form.email
        }      

        await this.login(formData);

        this.setAuth(true)
        Cookie.set('auth', true)
        this.$router.push('/')
        this.$notify(`Hello ${this.form.name}!`)


        // const auth = {
        //   accessToken: 'someStringGotFromApiServiceWithAjax'
        // }
        // this.$store.commit('setAuth', auth) // mutating to store for client rendering
        // Cookie.set('auth', auth) // saving token in cookie for server rendering
        // this.$router.push('/')
        
      } catch (err) {
        console.log('error log: ' + err)
      }
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
