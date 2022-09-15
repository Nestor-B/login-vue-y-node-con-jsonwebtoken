<template>
    <h1>Login</h1>
    <router-link to="/register">Register</router-link>
    <button @click="login">Loggin</button>
</template>

<script>
    import store from '@/store'
    import { useRouter } from 'vue-router'

    export default {
        name: 'LoginView',
        setup(){
            const router = useRouter()

            if( store.getters.isAuthenticated ) {
                router.push('/')
            }

            const login = () => {

                fetch(`${store.state.URL_SERVER}/login`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then((e) => e.json())
                .then((e) => {
                    if(e.token) {
                        store.commit('AuthenticatedToTrue')
                        localStorage.setItem('accessToken', JSON.stringify(e))
                        router.push('/verify-login')
                    }
                })

            }

            return {
                login
            }
        }
    }
</script>