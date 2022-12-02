import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import BootstrapVue3 from "bootstrap-vue-3";

//set-up bootstrap
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import 'bootstrap-icons/font/bootstrap-icons';
import "bootstrap-vue-3/dist/bootstrap-vue-3.css";

//vue+vite boiler-plate css
// import './assets/main.css'

const app = createApp(App)

app.use(createPinia())
app.use(BootstrapVue3);
app.use(router)

app.mount('#app')

// import { createApp } from 'vue'
// import App from './App.vue'
// import router from './router'

// createApp(App).use(router).mount('#app')
