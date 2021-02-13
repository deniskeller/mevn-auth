<template>
  <div class="container">
    <div class="user">
      <img src="http://via.placeholder.com/127x127" alt="">
      <div class="name">Имя: {{ user.name }} </div>
      <div class="company">Email: {{ user.email }} </div>
      <div class="border"> Телефон: {{ user.phone }} </div>
    </div>    
  </div>  
</template>

<script>
export default {
  name: '',
  data() {
    return {
      user: {
        name: 'Вася',
        email: 'kek@lol.com',
        phone: '02'
      }
    }
  },
  components: {},
  mounted() {},
  computed: {
  },
  methods: {
  },
}
</script>

<style lang="scss" scoped>
.container {
  max-width: 1080px;
  width: 100%;
  margin: 0 auto;
}
</style>