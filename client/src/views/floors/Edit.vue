<template>
    <b-container fluid>
        <b-row>
            <b-col cols="12">
                <h2 class="text-center my-4">Edit floor {{ floor.number }}</h2>
            </b-col>
            <b-col class="flex-center">
                <b-form v-on:submit.prevent="editFloor" class="w-75">
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
                    <b-btn type="submit" variant="primary" class="pull-right">Confirm edit</b-btn>
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
            editFloor: function() {
                axiMara.post('floors/editById',
                    this.floor
                ).then(response => {
                    if(response.data.success) {
                        this.$router.push('/floors/' + this.floor.id);
                    }
                });
            },
        },
        created() {
            axiMara.get('floors/getById',
                {
                    params: {
                        id: this.$route.params.id,
                    }
                }
            ).then(response => {
                if (response.status === 200) {
                    this.floor = response.data.data;
                }
            });

        }
    }
</script>