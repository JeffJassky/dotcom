import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home.vue'
import Project from './views/Project.vue'
import Contact from './views/Contact.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: Home },
    { path: '/contact', component: Contact },
    { path: '/project/:id', component: Project },
  ]
})

createApp(App).use(router).mount('#app')
