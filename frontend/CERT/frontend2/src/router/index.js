import {
  createRouter,
  createWebHistory
} from 'vue-router'
import AccountsData from '../views/admin/AccountsData.vue'
const routes = [{
  path: '/accountsData',
  name: 'AccountsData',
  component: AccountsData,
  meta: {
    title: "管理者用アカウント管理",
  },
},
  // {
  //   path: '/aaa',
  //   name: 'home2',
  //   component: HomeView2
  // },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import( /* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router