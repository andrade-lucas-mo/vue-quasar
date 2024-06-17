<template>
    <q-page class="q-pa-md q-gutter-sm">
        <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
  
            <q-input
                filled
                v-model="name"
                label="Name"
                lazy-rules
                :rules="[val => !!val || 'Name is required']"
            />

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

            <q-input
                filled
                v-model="confirmPassword"
                label="Confirm Password"
                type="password"
                lazy-rules
                :rules="[val => !!val || 'Confirmation password is required', val => val === password || 'Passwords must match']"
            />

            <div class="row">
                <q-btn label="Register" type="submit" color="primary" />
                <q-btn label="Reset" type="reset" color="secondary" flat />
                <q-btn label="Back" type="button" color="secondary" flat @click="onBack" />
            </div>
        </q-form>
    </q-page>
  </template>
  
<script>
    import UserService from '../services/UserService';

    export default {
        name: 'Register',
        data() {
            return {
                name: '',
                email: '',
                password: '',
                confirmPassword: ''
            };
        },
        methods: {
            onSubmit() {
                if (this.password !== this.confirmPassword) {
                    this.$q.notify({
                        type: 'negative',
                        message: 'Passwords do not match!'
                    });
                    return;
                }

                const user = {
                    name: this.name,
                    email: this.email,
                    password: this.password,
                    password_confirmation: this.confirmPassword
                };

                this.registerUser(user)
            },
            onReset() {
                this.name = '';
                this.email = '';
                this.password = '';
                this.confirmPassword  = '';
            },
            onBack() {
                this.name = '';
                this.email = '';
                this.password = '';
                this.confirmPassword  = '';
                this.$router.push({ name: 'home' });
            },
            async registerUser(user){
                try {
                    const { data } = await UserService.register(user);
                    this.$q.notify({
                        type: 'positive',
                        message: 'Registro Efetuado com sucesso!'
                    });
                    this.$router.push({ name: 'login' });
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
  