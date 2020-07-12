<template>
    <b-container fluid v-if="floor">
        <b-row>
            <b-col>
                <router-link :to="{ name: 'floors' }">
                    Back to list of floors
                </router-link>
            </b-col>
            <b-col md="12" class="align-items-center justify-content-center text-center py-2">
                <h3>Floor no. {{floor.number}} details</h3>
            </b-col>
        </b-row>


        <b-row class="buttonsRow">
            <b-col v-for="(room) in orderedRooms" :key="room.id" class="room p-4" cols="3">
                <b-row>
                    <b-col cols="8">
                        <h5 class="text-center">
                    {{room.name}} - {{room.number}}
                </h5>
                    </b-col>
                    <b-col v-if="room.sos_status" cols="4">
                        <b-badge variant="danger">SOS active</b-badge>
                    </b-col>
                </b-row>
                
                
                <b-row>

                    <b-col v-if="room.occupied_from" cols="6" class="roomOcc text-center flex-center" v-on:click="goToRoom2(room)">
                        <p>
                            <br/>
                            <br/>
                            <b> {{room.number}}</b>
                        </p>
                    </b-col>
                    <b-col v-else cols="6" class="roomFree text-center flex-center" v-on:click="goToRoom2(room)">
                        <p>
                            <br/>
                            <br/>
                            <b> {{room.number}}</b>
                        </p>
                    </b-col>

                    <b-col cols="2">
                        <b-row>
                            <b-col class="py-2">
                                <!--                                <b-img :src="require('../../assets/img/key.png')" fluid alt="Key card status" /> - -->
                                <b-img v-if="room.key_status" :src="require('../../assets/img/cardIn.png')" fluid alt="IN" />
                                <b-img v-else :src="require('../../assets/img/cardOut.png')" fluid alt="OUT" />
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col class="py-2">
                                <!--                                <b-img :src="require('../../assets/img/door.png')" fluid alt="Door status" /> - -->
                                <b-img v-if="room.door_status" :src="require('../../assets/img/doorClosed.png')" fluid alt="CLOSED" />
                                <b-img v-else :src="require('../../assets/img/doorOpen.png')" fluid alt="OPEN" />
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col class="py-2">
                                <!--                                <b-img :src="require('../../assets/img/window.png')" fluid alt="Window status" /> - -->
                                <b-img v-if="room.window_status" :src="require('../../assets/img/winClosed.png')" fluid alt="CLOSED" />
                                <b-img v-else :src="require('../../assets/img/winOpen.png')" fluid alt="OPEN" />
                            </b-col>
                        </b-row>
                    </b-col>

                    <b-col v-if="!room.occupied_from" cols="2" class="py-2 flex-center"  v-b-modal.addBooking style="cursor: pointer;">
                        <b-img :src="require('../../assets/img/plus.png')" @click="sendRoomInfo(room)" fluid alt="Add booking" />
                    </b-col>
                    <b-row class="flex-center w-100">
                        <b-col cols="12" v-if="room.occupied_from" class="flex-center align-items-center w-100">
                            <p>{{room.occupied_from | moment("DD. MMM.")}} - {{room.occupied_to | moment("DD. MMM.")}} - {{room.firstname}} {{room.lastname}}</p>
                        </b-col>
                    </b-row>
                </b-row>
            </b-col>

        </b-row>

        <b-row class="buttonsRow">
            <b-col cols="4" class="p-4 flex-center flex-column">
                <b-btn size="lg" variant="danger" class="w-50" v-b-modal.deleteFloor>
                    Delete floor
                </b-btn>
            </b-col>
            <b-col cols="4" class="p-4 flex-center flex-column">
                <b-btn size="lg" variant="secondary" class="w-50" @click.prevent="goToFloorEdit">
                    Edit floor
                </b-btn>
            </b-col>
            <b-col cols="4" class="p-4 flex-center flex-column">
                <b-btn size="lg" variant="primary" class="w-50 pull-right" @click.prevent="addRooms">
                    Add rooms
                </b-btn>
            </b-col>
        </b-row>

        <b-modal centered
                 size="lg"
                 hide-footer
                 header-bg-variant="secondary"
                 header-text-variant="light"
                 id="addBooking"
                 title="Add booking for selected room"
                 ok-only
                 @ok="">
            <b-container fluid>
                <b-row class="my-2">
                    <b-col cols="12" class="text-center">
                        <h4>Room no.: {{selectedRoom.number}}</h4>
                    </b-col>
                </b-row>
                <b-form v-on:submit.prevent="createBooking" class="">
                    <b-row class="my-2">
                        <b-col md="6">
                            <b-form-group label="First name"
                                          label-for="firstname">
                                <b-form-input id="firstname"
                                              type="text"
                                              v-model="booking.firstname"
                                              size="md"
                                              name="firstname"
                                              required>
                                </b-form-input>
                            </b-form-group>
                        </b-col>
                        <b-col md="6">
                            <b-form-group label="Last name"
                                          label-for="lastname">
                                <b-form-input  id="lastname"
                                               type="text"
                                               v-model="booking.lastname"
                                               size="md"
                                               name="lastname"
                                               required>
                                </b-form-input>
                            </b-form-group>
                        </b-col>
                        <b-col md="6">
                            <b-form-group label="Date from"
                                          label-for="date_range">
                                <v-date-picker  id="date_range"
                                                :attributes="bookedDates"
                                                :disabled-dates="bookedDates[0].dates"
                                                mode="range"
                                                v-model="booking.range"
                                                is-inline
                                                :min-date='new Date()'
                                                size="md"
                                                name="date_range"
                                                required>
                                </v-date-picker>
                            </b-form-group>
                        </b-col>

                        <b-col md="6" v-if="booking.range.start <= new Date()">
                            <b-form-group label="Key card"
                                          label-for="code">
                                <b-form-input
                                        v-for="booking_key in booking_keys"
                                        :key="booking_key.id"
                                        id="code"
                                        type="text"
                                        v-model="booking_key.code"
                                        class="form-control form-control-sm my-1"
                                        name="code">
                                </b-form-input>
                                <b-input-group-append>
                                    <b-button @click="addKey" variant="primary">Add key</b-button>
                                </b-input-group-append>
                            </b-form-group>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col cols="12" class="text-center">
                            <b-btn type="submit" variant="primary" class="float-right">Create booking</b-btn>
                        </b-col>
                    </b-row>
                </b-form>
            </b-container>
        </b-modal>

        <b-modal centered
                 id="deleteFloor"
                 title="Confirmation"
                 @ok="deleteFloor"
                 ok-variant="danger">
            <p class="my-4">Are you sure you want to completely delete this floor?</p>
        </b-modal>
    </b-container>
</template>

<script>
    export default {
        name: 'Floor',
        data() {
            return {
                interval: null,
                floor: null,
                rooms: null,
                keys: null,
                roomsBookings: null,
                allBookings: {},
                booking: {
                    range: {
                        start: new Date(),
                        end: new Date()
                    }
                },
                booking_keys: [{code: '', id: -1}],
                selectedRoom: '',
                bookedDates: [
                    {
                        bar: {
                            backgroundColor: '#ff4d4d',
                        },
                        dates: [],
                        popover: {
                            label: 'This date is already booked!',
                        }
                    },
                ],
                roomsFields:  [
                    {
                        key: 'name',
                        label: 'Room name',
                        sortable: true
                    },
                    {
                        key: 'number',
                        label: 'Room number',
                        sortable: true
                    },
                    {
                        key: 'key_status',
                        label: 'Key status',
                    },
                    {
                        key: 'door_status',
                        label: 'Door status',
                    },
                    {
                        key: 'window_status',
                        label: 'Window status',
                    },

                ],

            }

        },
        methods: {
            sendRoomInfo(item) {
                this.selectedRoom = item;
                this.getBookedDates();
            },
            addKey() {
                axiMara.get('keyCheck', {
                        params:{
                            code:  this.booking_keys[this.booking_keys.length - 1].code
                        }
                    }
                ).then(response => {
                    if (response.data.success === true) {
                        this.booking_keys[this.booking_keys.length - 1].id = response.data.data.id;
                        this.booking_keys.push({
                            code: '',
                            id: -1
                        });
                    }else{
                        this.$toasted.global.err({
                            message : response.data.data.msg
                        });
                    }
                });
            },
            getRooms(){
                axiMara.get('rooms',
                    {
                        params: {
                            floor_id: this.$route.params.id,
                        }
                    }
                ).then(response => {
                    if (response.data.success) {
                        this.rooms = response.data.data;
                    }
                });
            },
            goToRoom(item) {
                this.$router.push('/rooms/' + item.id);
            },
            goToRoom2(room) {
                this.$router.push('/rooms/' + room.id);
            },
            addRooms() {
                this.$router.push('/rooms/create');
            },
            goToFloorEdit() {
                this.$router.push('/floors/edit/' + this.floor.id);
            },
            deleteFloor() {
                axiMara.post('floors/deleteById', this.floor
                ).then(response => {
                    this.$router.push('/floors');
                })
            },

            createBooking: function() {
                this.booking_keys.pop();
                this.booking.range.end = this.booking.range.end.setDate(this.booking.range.end.getDate()-1);
                axiMara.post('bookings/create', {
                        params: {
                            booking: this.booking,
                            room_id: this.selectedRoom.id,
                            booking_keys: this.booking_keys
                        }
                    }
                ).then(response => {
                    this.booking.range.start = new Date();
                    this.booking.range.end = new Date();
                    this.booking.firstname = '';
                    this.booking.lastname = '';
                    this.booking_keys = [{code: '', id: -1}];
                    if(response.data.success) {
                        this.$toasted.show('Booking successfully added!');
                        this.$root.$emit('bv::hide::modal', 'addBooking');
                        this.getBookedDates();
                    }else{
                        this.$toasted.global.err({
                            message : response.data.data.msg
                        });
                    }
                });
            },
            getBookedDates: function() {
                let self = this;
                self.bookedDates[0].dates=[];
                axiMara.get('bookings/getDatesByRoomId',
                    {
                        params: {
                            id: this.selectedRoom.id,
                        }
                    }
                ).then(response => {
                    if (response.data.success) {
                        this.allBookings = response.data.data;
                        this.allBookings.forEach(function (item) {
                            self.bookedDates[0].dates.push(
                                {
                                    start: new Date(item.date_from),
                                    end: new Date(item.date_to)
                                }
                            )
                        });
                    }
                });
            },

        },
        mounted(){
            this.$root.$emit('refreshEvents', 'floor');
        },
        created() {
            let self = this;
            this.getRooms();
            this.interval = setInterval(function () {
                self.getRooms();
            }, 2000);

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


        },
        destroyed(){
            clearInterval(this.interval);
        },
        computed: {
            orderedRooms: function () {
                return _.orderBy(this.rooms, 'id');
            }
        }

    }
</script>

<style lang="scss">

    .roomOcc{
        background-image: url('../../assets/img/roomOcc.png');
        background-size: 50px;
        background-position: center;
        background-repeat: no-repeat;
        color: #FFF;
        cursor: pointer;
    }
    .roomFree{
        background-image: url('../../assets/img/roomFree.png');
        background-size: 50px;
        background-position: center;
        background-repeat: no-repeat;
        color: #FFF;
        cursor: pointer;
    }

</style>