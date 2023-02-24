import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Datepicker from '@vuepic/vue-datepicker';
import Notifications from '@kyvg/vue3-notification'
import '@vuepic/vue-datepicker/dist/main.css'

createApp(App).component('Datepicker', Datepicker).use(Notifications).use(store).use(router).mount('#app')
