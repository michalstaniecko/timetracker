import 'bulma/bulma.sass';

import { createApp, markRaw } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

import BaseContainer from '@/components/UI/BaseContainer.vue';
import BaseBox from '@/components/UI/BaseBox.vue';
import BasePopup from '@/components/UI/BasePopup.vue';
import BaseBoxLabel from '@/components/UI/BaseBoxLabel.vue';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import { faTrash } from '@fortawesome/free-solid-svg-icons';

library.add(faTrash);

const app = createApp(App);
const pinia = createPinia();

pinia.use(({ store }) => {
  store.router = markRaw(router);
});

app.use(pinia);
app.use(router);

app.component('base-container', BaseContainer);
app.component('base-box', BaseBox);
app.component('base-popup', BasePopup);
app.component('base-box-label', BaseBoxLabel);

app.component('font-awesome-icon', FontAwesomeIcon);

app.mount('#app');
