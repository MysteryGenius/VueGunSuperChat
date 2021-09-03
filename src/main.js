import { createApp } from 'vue'
import store from './store'
import App from './App.vue'
import './styles/index.css'

createApp(App).use(store).mount('#app')
