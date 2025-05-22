import './assets/main.css'

import { createApp, provide, h } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

import apolloClient from './lib/apollo';;
import { DefaultApolloClient } from '@vue/apollo-composable'

const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient)
  },
  render: () => h(App)
})

app.use(createPinia())
app.use(router)

app.mount('#app')
