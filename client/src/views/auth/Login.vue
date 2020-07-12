<template>
    <b-container class="align-self-center">
        <b-row class="justify-content-center m-4 py-4 flex-center">
            <b-col cols="6">
                <b-img :src="require('../../assets/img/logoblk.png')" fluid alt="eGate SH"/>
            </b-col>
        </b-row>
        <b-row class="justify-content-center align-items-center">
            <b-col cols="12" md="6">
                <b-form v-on:submit.prevent="login" class="auth-form">
                    <b-form-group label="Username"
                                  label-for="username">
                        <b-form-input v-model="user.username" id="username" type="text" size="md" name="username" required></b-form-input>
                    </b-form-group>

                    <b-form-group label="Password"
                                  label-for="password">
                        <b-form-input v-model="user.password" id="password" type="password" size="md" name="password" required></b-form-input>
                    </b-form-group>

                    <div class="form-help d-flex justify-content-between">
                        <b-link>
                            Zaboravili ste lozinku?
                        </b-link>
                        <router-link to="register">
                            Registriraj se
                        </router-link>
                    </div>

                    <b-btn type="submit" variant="primary" class="mt-3 align-self-center w-50">
                        Prijava
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
        name: 'login',
        methods: {
            login: function () {


                axiMara.post('login',
                    this.user
                ).then(response => {
                    if(response.data.success) {
                        axiMara.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.token;
                        localStorage.setItem('id_token', 'Bearer ' + response.data.token);
                        this.$store.dispatch('authenticate');
                        this.$router.push('/floors');
                    }
                }).catch(err => {
                    //vratit gresku
                });
            }
        },
        mounted(){

        },
        created() {
            localStorage.clear();
            this.$store.dispatch('logout');
            if (this.$store.getters.isAuth){
                this.$router.push('/users');
            }
        }
    }
</script>