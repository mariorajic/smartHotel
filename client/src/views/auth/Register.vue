<template>
    <b-container class="align-self-center">
        <b-row class="justify-content-center m-4 py-4 flex-center">
            <b-col cols="6">
                <b-img :src="require('../../assets/img/logoblk.png')" fluid alt="eGate SH"/>
            </b-col>
        </b-row>
        <b-row class="justify-content-center align-items-center">
            <b-col cols="12" md="6">
                <b-form v-on:submit.prevent="register" class="auth-form">
                    <b-form-group label="Username"
                                  label-for="username">
                        <b-form-input v-model="user.username" id="username" type="text" size="md" name="username" required></b-form-input>
                    </b-form-group>

                    <b-form-group label="Password"
                                  label-for="password">
                        <b-form-input v-model="user.password" id="password" type="password" size="md" name="password" required></b-form-input>
                    </b-form-group>

                    <b-form-group label="Email"
                                  label-for="email">
                        <b-form-input v-model="user.email" id="email" type="email" size="md" name="email" required></b-form-input>
                    </b-form-group>

                    <div class="form-help d-flex justify-content-between">
                        <b-link>
                            Prijava
                        </b-link>
                        <b-link>
                            Pomoć
                        </b-link>
                    </div>

                    <b-btn type="submit" variant="primary" class="mt-3 align-self-center w-50">
                        Registriraj se
                    </b-btn>
                </b-form>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
    export default {
        data() {
            return {
                user:{},
            }
        },
        name: 'register',
        methods: {
            register: function() {
                axiMara.post('register',
                    this.user
                ).then(response => {
                    if(response.data.success) {
                        this.$router.push('/auth/login');
                    }
                });
            },
        },
        created() {
            if (localStorage.getItem('id_token')){
                this.$router.push('/users');
            }
        }
    }
</script>