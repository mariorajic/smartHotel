<template>
    <b-container fluid>
        <b-row>
            <b-col cols="12">
                <h2 class="text-center my-4">Create new Room</h2>
            </b-col>
            <b-col class="flex-center">
                <b-form v-on:submit.prevent="createRoom" class="w-75">
                    <b-form-group :label-cols-md="4"
                                  label="Room name:"
                                  label-for="name">
                        <b-form-input id="name"
                                      type="text"
                                      size="sm"
                                      name="name"
                                      v-model="room.name"
                                      required>
                        </b-form-input>
                    </b-form-group>

                    <b-form-group :label-cols-md="4"
                                  label="Room no.:"
                                  label-for="number">
                        <b-form-input id="number"
                                      type="number"
                                      size="sm"
                                      name="number"
                                      v-model="room.number"
                                      required>
                        </b-form-input>
                    </b-form-group>

                    <b-form-group :label-cols-md="4"
                                  label="Room capacity:"
                                  label-for="capacity">
                        <b-form-input id="capacity"
                                      type="number"
                                      size="sm"
                                      name="capacity"
                                      v-model="room.capacity"
                                      required>
                        </b-form-input>
                    </b-form-group>

                    <b-form-group :label-cols-md="4"
                                  label="Room floor no:"
                                  label-for="floor_id">
                        <b-form-select
                                id="floor_id"
                                type="number"
                                v-model="room.floor_id"
                                class="form-control form-control-sm"
                                name="floor_id"
                                required>
                            <option selected disabled>Please choose the room floor no.</option>
                            <option v-for="floor in floors" :value="floor.id">
                                {{ floor.number }}
                            </option>
                        </b-form-select>
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
                room:{},
                floors:{},
            }
        },
        methods: {
            createRoom: function() {
                axiMara.post('rooms/create',
                    this.room
                ).then(response => {
                    if(response.data.success) {
                        this.$router.push('/floors/' + this.room.floor_id);
                        this.$toasted.show('Room successfully added!');
                    }
                });
            },
        },
        created() {
            axiMara.get('floors').then(response => {
                if (response.status === 200) {
                    this.floors = response.data.data
                }
            });
        }
    }
</script>