import { createApp } from 'vue'
import App from './App.vue'
import router from './router' //import index.js from router folder

createApp(App).use(router).mount('#app') //use the router from index.js . the mount('#app) means it will be displayed on the div at index.html
