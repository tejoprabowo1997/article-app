import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

export default defineNuxtPlugin((nuxtApp) => {
  const customTheme = {
    dark: false,
    colors: {
      primary: '#00BCD4',
      secondary: '#B2EBF2',
      success: '#00BCD4',
      info: '#B2EBF2',
      warning: '#FF5722',
      error: '#DD2C00',
    },
  }

  const vuetify = createVuetify({
    ssr: true,
    components,
    directives,
    theme: {
      defaultTheme: 'customTheme',
      themes: {
        customTheme,
      },
    },
  })

  nuxtApp.vueApp.use(vuetify)
})
