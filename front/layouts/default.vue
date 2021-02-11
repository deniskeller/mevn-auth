<template>
  <div class="">
    <LayoutPreload />
    <Navbar />
    <main>
      <div class="container">
        <nuxt />
      </div>
    </main>
  </div>
</template>
<script>
import Navbar from '@/components/Navbar'
import LayoutPreload from '~/components/LayoutPreload'

export default {
  middleware: 'auth',
  components: {
    LayoutPreload,
    Navbar
  }
}
</script>
