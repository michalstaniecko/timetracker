import 'bulma/bulma.sass';

import { createApp, markRaw } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

import BaseContainer from '@/components/UI/BaseContainer.vue';
import BaseBox from '@/components/UI/BaseBox.vue';

const app = createApp(App);
const pinia = createPinia();

pinia.use(({ store }) => {
  store.router = markRaw(router);
});

app.use(pinia);
app.use(router);

app.component('base-container', BaseContainer);
app.component('base-box', BaseBox);

app.mount('#app');