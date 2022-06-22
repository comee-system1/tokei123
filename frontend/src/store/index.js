import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)
// stateにuserIdとuserTokenを持たせています。状態の保存先
// Vuexではデータの参照は直接できますが、変更をするにはミューテーションとアクションが必要。
// これによりグローバルなデータが様々な場所で変更されてトラッキングしづらい
// 今回はauthアクションを実装して認証情報を格納しています
const store = new Vuex.Store({
    state: {
        userId: "",
        userToken: ""
    },
    mutations: {
        updateUser(state, user) {
            state.userId = user.userId;
            state.userToken = user.userToken;
        },
        updateService(state, user) {
            state.serviceJigyo = user.serviceJigyo;
        }
    },
    actions: {
        auth(context, user) {
            context.commit('updateUser', user);
        },
        service(context, user) {
            context.commit('updateService', user);
        }
    },
    modules: {},
    plugins: [createPersistedState({
        key: 'tokeiKey',
        storage: window.sessionStorage, // 設定しなければlocalStorage
    })],

})

export default store