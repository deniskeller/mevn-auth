export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [
    { 
      src: '@/assets/scss/common.scss',
      lang: 'sass'
    },
  ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    {src: '~/plugins/global'},
    {src: '~/plugins/Vuelidate'}
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/style-resources',
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',    
    // Doc: https://auth.nuxtjs.org/
    '@nuxtjs/auth-next',

  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  styleResources: {
    scss: ['./assets/scss/resources.scss']
  },
  axios: {},
  /*
   ** Build configuration
   */

  auth: {
    strategies: {
      local: {
        scheme: 'refresh',
        token: {
          property: 'accessToken',
          maxAge: 1800,
          // type: 'Bearer'
        },
        refreshToken: {
          property: 'refreshToken',
          data: 'refreshToken',
          maxAge: 60 * 60 * 24 * 30,
        },
        endpoints: {
          user: false,
          refresh: {
            url: '/auth/refresh',
            method: 'post',
          },
          login: {
            url: '/auth/login',
            method: 'post',
            propertyName: 'accessToken',
          },
          logout: {
            url: '/auth/logout',
            method: 'post',
          },
        },
      },
    },
  },

  
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
}
