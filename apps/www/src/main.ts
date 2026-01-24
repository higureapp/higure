import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './assets/index.css'

import App from './App.vue'
import router from './router'
import { setupApollo } from './plugins/apollo'

const app = createApp(App)

app.use(createPinia())
app.use(router)

setupApollo(app)
app.mount('#app')
