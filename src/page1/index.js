import { createApp as createVueApp } from 'vue';
import App from './App.vue';

export default function createApp() {
  const container = document.createElement('div');
  container.id = 'app';
  document.body.appendChild(container);

  const app = createVueApp(App);
  app.mount('#app');
  return app;
}
