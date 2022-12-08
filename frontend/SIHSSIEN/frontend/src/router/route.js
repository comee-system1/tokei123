import Vue from 'vue'
import VueRouter from 'vue-router'
import KaigoKyufuMeisaisyo from '../views/SIHSSIEN/KaigoKyufuMeisaisyo.vue'

Vue.use(VueRouter)

const TitleKaigoKyufuMeisaisyo = "計画相談レセプト請求";

const routes = [

    {
        path: '/KaigoKyufuMeisaisyo/:uniqid',
        name: '介護給付費明細書',
        component: KaigoKyufuMeisaisyo,
        meta: {
            title: TitleKaigoKyufuMeisaisyo,
        },
    },

    // {
    //     path: '/SIENT/UketukeTourokuParent/:uniqid',
    //     name: '受付・対応登録',
    //     component: SienTUketukeTourokuParent,
    //     meta: {
    //         title: TitleSoudansien,
    //     },
    // },

]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router