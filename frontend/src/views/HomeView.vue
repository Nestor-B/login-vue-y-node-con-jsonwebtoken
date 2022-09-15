<template>
    <h1>Home</h1>
    <button @click="cerrar">Cerrar</button>
</template>

<script>
    import store from '@/store'
    import { useRouter } from 'vue-router'

    export default {
        name: 'HomeView',
        setup(){
            const router = useRouter()

            if( store.getters.isAuthenticated ) {
                router.push('/')
            }

            const cerrar = () => {
                store.commit('AuthenticatedToFalse')
                if( !store.getters.isAuthenticated ) {
                    router.push('/login')
                    localStorage.removeItem('accessToken')
                }
            }

            return {
                cerrar
            }
        }
    }
</script>
