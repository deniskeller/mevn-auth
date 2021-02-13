<template>
  <div class="container">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <div class="">Страница пользователя</div>      
      </div>

      <div class="navbar__exit">
        <BaseButton
          type="translucent"
          class="login-form__button"
          @click.native="exit"
        >
          Выход
        </BaseButton>
      </div>    
    </nav>
  </div>
</template>

<script>

export default {
  data() {
    return {
    }
  },

  computed: {
  },
  methods: {
    exit() {
      this.$router.push('/login');
    }  
  }
}
</script>

<style scoped>
.container {
  max-width: 1080px;
  width: 100%;
  margin: 0 auto;
}
.navbar {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0px;
}
  .active {
    color: green;
  }
</style>