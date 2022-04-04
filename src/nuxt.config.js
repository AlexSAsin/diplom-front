require('dotenv').config({
  path: '.env.local'
})

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  server: {
    port: process.env.NUXT_PORT,
    host: process.env.NUXT_HOST
  },
  mode: 'universal',
  head: {
    titleTemplate: '%s - src',
    title: 'src',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@mdi/font/css/materialdesignicons.min.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    ['@nuxtjs/vuetify', { iconfont: 'mdi' }]
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      light: true,
      themes: {
        light: {
          primary: '#A9C833',
          secondary: '#5300BC',
          accent: '#FF8900',
          secondaryLighten1: '#7831D1',
          secondaryLighten2: '#9154DD',
          secondaryLighten3: '#AC7AEA',
          darkGrey: '#2E2E2E',
          grey: '#9E9E9E'
        }
      }
    },
    defaultAssets: false
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
