import {initializeApp} from "firebase/app";
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import 'primevue/resources/themes/saga-blue/theme.css';
import './assets/main.css';
import ToastService from "primevue/toastservice";
import Toast from "primevue/toast";

import {createPinia} from 'pinia';
import PrimeVue from 'primevue/config';
import Menubar from 'primevue/menubar';
import {createApp} from 'vue';

import App from './App.vue';
import router from './router';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import ProgressSpinner from "primevue/progressspinner";

const firebaseConfig = {
  apiKey: "AIzaSyCzM0gZXVW_6i5fjPSL9wkYeYBUi7CjnJY",
  authDomain: "vue-interviews-2e421.firebaseapp.com",
  projectId: "vue-interviews-2e421",
  storageBucket: "vue-interviews-2e421.appspot.com",
  messagingSenderId: "79925594363",
  appId: "1:79925594363:web:8795d44b10da590bbd485e"
};

initializeApp(firebaseConfig);

const app = createApp(App)

app.use(ToastService)
app.use(createPinia())
app.use(PrimeVue)
app.use(router)
app.component('app-menubar', Menubar)
app.component('app-input-text', InputText)
app.component('app-button', Button)
app.component('app-toast', Toast)
app.component('app-progress-spinner', ProgressSpinner)

app.mount('#app')
