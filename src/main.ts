import {initializeApp} from "firebase/app";
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import 'primevue/resources/themes/saga-blue/theme.css';
import './assets/main.css';
import ToastService from "primevue/toastservice";
import ConfirmationService from "primevue/confirmationservice";
import Toast from "primevue/toast";

import {createPinia} from 'pinia';
import PrimeVue from 'primevue/config';
import Menubar from 'primevue/menubar';
import {createApp} from 'vue';

import App from './App.vue';
import router from './router';
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import Textarea from "primevue/textarea";
import RadioButton from "primevue/radiobutton";
import Calendar from "primevue/calendar";
import Button from 'primevue/button';
import ProgressSpinner from "primevue/progressspinner";
import AppCard from "primevue/card"
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import ConfirmDialog from "primevue/confirmdialog";
import InlineMessage from "primevue/inlinemessage";

// console.log(import.meta.env, "import.meta.env");

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_API_KEY,
  authDomain: import.meta.env.VITE_APP_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_APP_PROJECT_ID,
  storageBucket: import.meta.env.VITE_APP_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_APP_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_APP_ID
};

initializeApp(firebaseConfig);

const app = createApp(App)

app.use(ToastService)
app.use(ConfirmationService)
app.use(createPinia())
app.use(PrimeVue)
app.use(router)
app.component('app-menubar', Menubar)
app.component('app-input-text', InputText)
app.component('app-input-number', InputNumber)
app.component('app-textarea', Textarea)
app.component('app-radio-button', RadioButton)
app.component('app-calendar', Calendar)
app.component('app-button', Button)
app.component('app-toast', Toast)
app.component('app-progress-spinner', ProgressSpinner)
app.component('app-card', AppCard)
app.component('AppDataTable', DataTable)
app.component('AppColumn', Column)
app.component('AppConfirmDialog', ConfirmDialog)
app.component('AppInlineMessage', InlineMessage)

app.mount('#app')
