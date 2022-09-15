<template>
    <p>Espere ...</p>
</template>

<script>
    import store from '@/store'
    import { useRouter } from 'vue-router'

    export default {
        name: 'VerifyLogin',
        setup(){
            const router = useRouter()

            if( store.getters.isAuthenticated ) {
                router.push('/')
            }else{
                router.push('/')
            }
        }
    }
</script>