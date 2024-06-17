<template>

    <q-page class="q-pa-md q-gutter-sm">
        <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
            <q-input
                filled
                v-model="email"
                label="Email"
                type="email"
                lazy-rules
                :rules="[val => !!val || 'Email is required']"
            />
            <q-input
                filled
                v-model="password"
                label="Password"
                type="password"
                lazy-rules
                :rules="[val => !!val || 'Password is required']"
            />

            <div class="row">
                <q-btn label="Login" type="submit" color="primary" />
                <q-btn label="Reset" type="reset" color="secondary" flat />
                <q-btn label="Back" type="button" color="secondary" flat @click="onBack" />
            </div>
        </q-form>
    </q-page>
</template>

<script>
    import AuthService from '../services/AuthService';

    export default {
        name: 'Login',
        data() {
            return {
                email: '',
                password: ''
            };
        },
        methods: {
            onSubmit() {
                const credentials = {
                    email: this.email,
                    password: this.password
                };

                this.loginUser(credentials)
            },
            onReset() {
                this.email = '';
                this.password = '';
            },
            onBack() {
                this.email = '';
                this.password = '';
                this.$router.push({ name: 'home' });
            },
            async loginUser(credentials){
                try {
                    const { data } = await AuthService.login(credentials);
                    const token = data.data.token;
                    localStorage.setItem('token', token);
                    this.$q.notify({
                        type: 'positive',
                        message: 'Login Efetuado com sucesso!'
                    });
                    this.$router.push({ name: 'home' });
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
        },
        components: {
        },
    };
</script>