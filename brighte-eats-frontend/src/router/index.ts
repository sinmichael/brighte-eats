import { createRouter, createWebHistory } from 'vue-router'
import LeadForm from '../components/LeadForm.vue'
import LeadsView from '../views/LeadsView.vue'

const routes = [
  { path: '/', name: 'Home', component: LeadForm },
  { path: '/leads', name: 'Leads', component: LeadsView },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router