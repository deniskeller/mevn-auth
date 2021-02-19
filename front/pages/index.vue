<template>
  <div class="container">
    <div class="user">
      <img src="http://via.placeholder.com/127x127" alt="">
      <div class="name">Имя: {{ this.user.name }}</div>
      <div class="company">Email: {{ this.user.email }}</div>
      <div class="border"> Телефон: {{ this.user.phone }}</div>
    </div>    
  </div>  
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';
import { loginUser, getUser } from '@/services/ApiServicesAuth';

export default {
  name: '',
  data() {
    return {
    }
  },
  components: {},
  created() {},
  async mounted() {
    try {
      const storageName =  'userData';
      const data = JSON.parse(localStorage.getItem(storageName))

      if(data && data.token && data.userAuth) {        
        this.setAuth(true)
        this.userLogin()
      }
    } catch (error) {
      console.log('error: ', error);      
    } 
  },
  computed: {
    ...mapGetters(['user']),
  },
  watch: {},
  methods: {
    ...mapMutations(['setAuth']),
    ...mapActions(['userLogin'])
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