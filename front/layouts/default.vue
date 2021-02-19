<template>
  <div class="">
    <LayoutPreload />
    <Navbar />
    <main>
      <div class="container">
        <nuxt />
        <notifications group="all" />
      </div>
    </main>
  </div>
</template>
<script>
import Navbar from '@/components/Navbar';
import LayoutPreload from '~/components/LayoutPreload';

export default {
  middleware: 'authenticated',
  components: {
    LayoutPreload,
    Navbar
  },
  created() {},
  mounted() {},
  computed: {},
  watch: {},
  methods: {},
}
</script>
