import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './style.css'
import App from './App.vue'

let app = null

export function mount(el) {
  const pinia = createPinia()
  app = createApp(App)
  app.use(pinia)
  app.use(ElementPlus)
  app.mount(el)
}

/* Auto-mount when running standalone (dev + production) */
if (!window.__MICRO_FRONTEND_HOST__) {
  const el = document.querySelector('#_todo-mf-dev-root')
  if (el) {
    mount(el)
  }
}