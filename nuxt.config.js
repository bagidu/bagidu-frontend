
export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: 'Bagidu ID',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap', async: true }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#68d391' },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/axios'
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    // Doc: https://github.com/nuxt-community/stylelint-module
    '@nuxtjs/stylelint-module',
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    '@nuxtjs/tailwindcss',

    '@nuxtjs/dotenv'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/apollo'
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
  },

  // Apollo module config
  apollo: {
    clientConfigs: {
      // default: {
      //   httpEndpoint: (process.env.API_URL || 'https://api.bagidu.id') + '/graphql',
      //   httpLinkOptions: {
      //     credentials: 'omit'
      //   }
      // }
      default: '~/plugins/apollo.js'
    }
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    },
    terser: {
      terserOptions: {
        compress: {
          drop_console: true
        }
      }
    }
  }
}
