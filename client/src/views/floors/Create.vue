<template>
    <b-container fluid>
        <b-row>
            <b-col cols="12">
                <h2 class="text-center my-4">Create new floor</h2>
            </b-col>
            <b-col class="flex-center">
                <b-form v-on:submit.prevent="createFloor" class="w-75">
                    <b-form-group :label-cols-md="4"
                                  label="Floor no.:"
                                  label-for="number">
                        <b-form-input id="number"
                                      type="number"
                                      size="sm"
                                      name="name"
                                      v-model="floor.number"
                                      required>
                        </b-form-input>
                    </b-form-group>
                    <b-btn type="submit" variant="primary" class="pull-right">Confirm</b-btn>
                </b-form>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
    export default {
        data() {
            return {
                floor:{},
            }
        },
        methods: {
            createFloor: function() {
                axiMara.post('floors/create',
                    this.floor
                ).then(response => {
                    if(response.data.success) {
                        this.$router.push('/floors');
                    }
                });
            },
        },
        created() {

        }
    }
</script>