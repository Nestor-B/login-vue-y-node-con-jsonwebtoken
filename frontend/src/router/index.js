import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import store from '@/store'
// import { reactive } from 'vue'

let isAuthenticated = store.state.isAuthenticated

if( localStorage.getItem('accessToken') ) {
    const token = JSON.parse(localStorage.getItem('accessToken')).token
    fetch(`${store.state.URL_SERVER}/user`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then((e) => e.json())
    .then(async(e) => {
        if(e.token) {
            localStorage.setItem('accessToken', JSON.stringify(e))
        }
        if( e.error ) {
            localStorage.removeItem('accessToken')
        }
    })

    if( JSON.parse(localStorage.getItem('accessToken')).token ){
        store.commit('AuthenticatedToTrue')
    } 
}

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView
    },
    {
        path: '/about',
        name: 'about',
        component: () => import('../views/AboutView.vue')
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/LoginView.vue'),
        beforeEnter: () => {
            isAuthenticated = store.state.isAuthenticated
            return true
        },
    },
    {
        path: '/register',
        name: 'register',
        component: () => import('../views/RegisterView.vue'),
        beforeEnter: () => {
            isAuthenticated = store.state.isAuthenticated
            return true
        },
    },
    {
        path: '/verify-login',
        name: 'verify-login',
        component: () => import('../views/VerifyLogin.vue'),
        beforeEnter: () => {
            isAuthenticated = store.state.isAuthenticated
            return true
        },
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

router.beforeEach((to, from, next) => {
    if (to.name !== 'login' && 
        to.name !== 'register' && 
        to.name !== 'verify-login' && 
        !isAuthenticated) next({ name: 'login' })
    else next()
})

export default router
