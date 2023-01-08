import {
  createRouter,
  createWebHistory
} from 'vue-router'
import AccountsData from '../views/admin/AccountsData.vue'
import StaffData from '../views/admin/StaffData.vue'
import AllStoreList from '../views/admin/AllStoreList.vue'

const routes = [{
  path: '/StaffData/:client?',
  name: 'StaffData',
  component: StaffData,
  meta: {
    title: "職員用アカウント管理",
    sub: "職員マスタで登録済みの職員に対して、福祉見聞録システムを使用可能にするアカウント発行や、グランドメニューに表示するボタンの設定などができます。"
  },
},
{
  path: '/accountsData/:client?',
  name: 'AccountsData',
  component: AccountsData,
  meta: {
    title: "管理者用アカウント管理",
  },
},
{
  path: '/allStoreList/:client?',
  name: 'AllStoreList',
  component: AllStoreList,
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