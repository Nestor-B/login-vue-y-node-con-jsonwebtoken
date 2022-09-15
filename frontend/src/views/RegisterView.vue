<template>
    <h1>Registro</h1>
    <router-link to="/login">Login</router-link>
    <button @click="register">Register</button>
</template>

<script>
    import store from '@/store'
    import { useRouter } from 'vue-router'

    export default {
        name: 'RegisterView',
        setup(){
            const router = useRouter()

            if( store.getters.isAuthenticated ) {
                router.push('/')
            }
            
            const register = () => {
                store.commit('AuthenticatedToTrue')
                localStorage.setItem('accessToken', '123456789')
                router.push('/')
            }

            return {
                register
            }
        }
    }
</script>