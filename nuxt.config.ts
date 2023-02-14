// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      charset: 'utf-16',
      viewport: 'width=device-width, initial-scale=1',
      title: 'Article App',
      meta: [
        {
          name: 'description',
          content:
            'Article app create by tejo prabowo https://github.com/tejoprabowo1997',
        },
      ],
      link: [
        {
          rel: 'icon',
          type: 'image/x-icon',
          href: '/assets/images/jpg/logo.jpg',
        },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: 'anonymous',
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Handlee&display=swap',
        },
      ],
    },
  },
  css: [
    '~/assets/styles/css/custom.css',
    'vuetify/lib/styles/main.sass',
    '@mdi/font/css/materialdesignicons.min.css',
  ],
  build: {
    transpile: ['vuetify'],
  },
  runtimeConfig: <
    {
      mongoDbUri: string
      dbName: string
    }
  >{
    mongoDbUri: process.env.MONGODB_URI,
    mongoDbName: process.env.MONGODB_NAME,
  },
})
