<template>
  <div class="user">
    <p>{{user.name}}</p>
    <p>{{user.email}}</p>
    <p>{{user.phone}}</p>
    <p>{{user.language}}</p>
    
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex';

export default {
  name: '',
  components: {},
  mounted() {},
  computed: {    
    ...mapGetters(['user']),
  },
  methods: {
  },
}
</script>