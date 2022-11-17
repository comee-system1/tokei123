import Vue from 'vue'
import VueRouter from 'vue-router'
import AdminUserList from '../views/admin/UserList.vue'
import TemploraryPage from '../views/admin/TemploraryPage.vue'

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
        path: '/temp',
        name: 'テンポラリ',
        component: TemploraryPage,
        meta: {
            title: "テンポラリ",
        },
    },

]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router