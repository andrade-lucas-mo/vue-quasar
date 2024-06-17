<template>
    <q-page class="q-pa-md q-gutter-sm">
        <q-toolbar>
            <q-space />
            <q-btn v-if="!isLoggedIn" flat @click="goToLogin" label="Login" />
            <q-btn v-if="!isLoggedIn" flat @click="goToRegister" label="Register" />
            <q-btn v-if="isLoggedIn" flat @click="logout" label="Logout" />
        </q-toolbar>
        <Despesas v-if="isLoggedIn" />
    </q-page>
</template>

<script>
import Despesas from './Despesas.vue';
import AuthService from '../services/AuthService';

export default {
    name: 'Home',
    components: {
        Despesas
    },
    data() {
        return {
            isLoggedIn: !!localStorage.getItem('token')
        }
    },
    methods: {
        goToLogin() {
            this.$router.push({ name: 'login' });
        },
        goToRegister() {
            this.$router.push({ name: 'register' });
        },
        logout() {
            const token = localStorage.getItem('token');
            if (token) {
                this.logoutUser(token)
            }
        },
        async logoutUser(token){
            try {
                const { data } = await AuthService.logout(token);
                localStorage.removeItem('token');
                this.isLoggedIn = false;
                this.$q.notify({
                    type: 'positive',
                    message: 'Logout Efetuado com sucesso!'
                });
            } catch (e) {
                const errors = e.response.data.errors;
                let errorMessage = '';

                if (Array.isArray(errors)) {
                    errorMessage = errors.map(error => error.message).join('\n');
                } else {
                    errorMessage = Object.values(errors).flat().join('\n');
                }
                this.$q.notify({
                    type: 'negative',
                    message: errorMessage
                });
            }
        }
    }
};
</script>

<style scoped>
    .q-toolbar {
        background-color: #027be3;
        color: white;
    }
</style>
