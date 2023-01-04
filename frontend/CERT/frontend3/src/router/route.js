import Vue from 'vue'
import VueRouter from 'vue-router'
import AdminUserList from '../views/admin/UserList.vue'
import TemploraryPage from '../views/admin/TemploraryPage.vue'
import AccountsData from '../views/admin/AccountsData.vue'

Vue.use(VueRouter)
const routes = [{
        path: '/UserList',
        name: '管理者ユーザアカウント一覧',
        component: AdminUserList,
        meta: {
            title: "管理者ユーザアカウント一覧",
        },
    },
    {
        path: '/temp/:id',
        name: 'テンポラリ',
        component: TemploraryPage,
        meta: {
            title: "テンポラリ",
        },
    },
    {
        path: '/accountsData/:id',
        name: '',
        component: AccountsData,
        meta: {
            title: "管理者用アカウント管理",
        },
    },

]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router