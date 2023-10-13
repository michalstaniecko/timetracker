import 'bulma/bulma.sass';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

import BaseContainer from '@/components/UI/BaseContainer.vue';
import BaseBox from '@/components/UI/BaseBox.vue';

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.component('base-container', BaseContainer);
app.component('base-box', BaseBox);

app.mount('#app');
