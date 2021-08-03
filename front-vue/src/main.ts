import { createApp } from 'vue';
import { authPlugin } from '@/plugins/auth';
import { api } from '@/plugins/api';
import router from './router';
import App from './App.vue';

const app = createApp(App);

api.interceptors.response.use((response) => response, (error) => {
  if (error.response.status === 401 && error.response.data.message === 'jwt expired') {
    authPlugin.tokenHasExpired();
    console.log('token expiré');
  }
});

app.use(router);
app.provide('$auth', authPlugin);
app.mount('#app');
