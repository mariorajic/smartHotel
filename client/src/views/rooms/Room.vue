<template>
  <b-container fluid v-if="room">
    <b-row>
      <b-col md="4">
        <router-link
          :to="{ name: 'floor', params: { id: this.room.floor_id } }"
        >
          Back to floor
        </router-link>
      </b-col>
    </b-row>

    <b-row>
      <b-col
        md="12"
        class="align-items-center justify-content-center text-center"
      >
        <h3>Room {{ room.number }} details</h3>
      </b-col>
    </b-row>

    <b-row>
      <b-col md="9" class="p-4 align-items-center justify-content-center">
        <table class="table b-table table-striped">
          <thead>
            <tr>
              <td><b>Name:</b> {{ room.name }}</td>
              <td v-if="room.key_status" class="table-success">
                <b>Key status</b>
              </td>
              <td v-else class="table-danger">
                <b>Key status</b>
              </td>
            </tr>
            <tr>
              <td><b>Number:</b> {{ room.number }}</td>
              <td v-if="room.door_status" class="table-success">
                <b>Door status </b>
              </td>
              <td v-else class="table-danger">
                <b>Door status </b>
              </td>
            </tr>
            <tr>
              <td><b>Capacity:</b> {{ room.capacity }}</td>
              <td v-if="room.window_status" class="table-success">
                <b>Window status</b>
              </td>
              <td v-else class="table-danger">
                <b>Window status</b>
              </td>
            </tr>
          </thead>
        </table>
      </b-col>
      <b-col cols="3">
        <b-col md="12" class="p-2 flex-center flex-column">
          <b-row class="p-2 w-100">
            <b-btn
              size="md"
              variant="danger"
              class="w-100"
              v-b-modal.deleteRoom
            >
              Delete room
            </b-btn>
          </b-row>
        </b-col>
        <b-col md="12" class="p-2 flex-center flex-column">
          <b-row class="p-2 w-100">
            <b-btn
              size="md"
              variant="secondary"
              class="w-100"
              @click.prevent="goToRoomEdit"
            >
              Edit room
            </b-btn>
          </b-row>
        </b-col>
        <b-col md="12" class="p-2 flex-center flex-column">
          <b-row class="p-2 w-100">
            <b-btn
              v-if="!occupied"
              size="md"
              variant="success"
              class="w-100"
              v-b-modal.addBooking
            >
              Add booking
            </b-btn>
            <b-btn v-else size="md" disabled class="w-100">
              Add booking
            </b-btn>
          </b-row>
        </b-col>
      </b-col>
    </b-row>

    <b-row class="buttonsRow">
      <b-col md="3" class="p-4 flex-center flex-column">
        <b-row class="p-2 w-75">
          <b-btn
            v-if="room.sos_status === false"
            size="lg"
            variant="danger"
            class="w-100"
            @click.prevent="sosActivate"
          >
            Activate SOS
          </b-btn>
          <b-btn
            v-else
            size="lg"
            variant="success"
            class="w-100"
            @click.prevent="sosActivate"
          >
            Deactivate SOS
          </b-btn>
        </b-row>
      </b-col>
      <b-col md="3" class="p-4 flex-center flex-column">
        <b-row class="p-2 w-100">
          <b-btn
            size="lg"
            variant="primary"
            class="w-100"
            @click.prevent="keyStatus"
          >
            Change key status
          </b-btn>
        </b-row>
      </b-col>
      <b-col md="3" class="p-4 flex-center flex-column">
        <b-row class="p-2 w-100">
          <b-btn
            size="lg"
            variant="primary"
            class="w-100"
            @click.prevent="doorStatus"
          >
            Change door status
          </b-btn>
        </b-row>
      </b-col>
      <b-col md="3" class="p-4 flex-center flex-column">
        <b-row class="p-2 w-100">
          <b-btn
            size="lg"
            variant="primary"
            class="w-100"
            @click.prevent="windowStatus"
          >
            Change window status
          </b-btn>
        </b-row>
      </b-col>
    </b-row>

    <b-row class="buttonsRow" v-if="occupied">
      <b-col md="12" class="py-4 text-center justify-content-center">
        <h4>Current guest info</h4>
      </b-col>
      <b-col md="6" class="align-items-center justify-content-center">
        <table class="table b-table table-striped table-bordered">
          <thead>
            <tr>
              <td><b>Firstname:</b> {{ occupied.firstname }}</td>
              <td><b>Lastname: </b> {{ occupied.lastname }}</td>
            </tr>
            <tr>
              <td>
                <b>Occupied from: </b>
                {{ occupied.date_from | moment("DD. MMM.") }}
              </td>
              <td>
                <b>Occupied to: </b> {{ occupied.date_to | moment("DD. MMM.") }}
              </td>
            </tr>
            <tr>
              <td colspan="2">
                Add another key
                <b-img
                  :src="require('../../assets/img/plus.png')"
                  v-b-modal.addKey
                  fluid
                  alt="Add room key"
                  style="cursor: pointer;"
                />
              </td>
            </tr>
          </thead>
        </table>
      </b-col>

      <b-col v-if="activeKeys" cols="6">
        <b-table
          medium
          bordered
          :items="activeKeys"
          :fields="keysFields"
          :per-page="5"
        >
        </b-table>
      </b-col>
    </b-row>

    <b-modal
      centered
      size="lg"
      hide-footer
      header-bg-variant="secondary"
      header-text-variant="light"
      id="addBooking"
      title="Add booking for selected room"
      ok-only
      @ok=""
    >
      <b-container fluid>
        <b-row class="my-2">
          <b-col cols="12" class="text-center">
            <h4>Room no.: {{ room.number }}</h4>
          </b-col>
        </b-row>
        <b-form v-on:submit.prevent="createBooking" class="">
          <b-row class="my-2">
            <b-col md="6">
              <b-form-group label="First name" label-for="firstname">
                <b-form-input
                  id="firstname"
                  type="text"
                  v-model="booking.firstname"
                  size="md"
                  name="firstname"
                  required
                >
                </b-form-input>
              </b-form-group>
            </b-col>
            <b-col md="6">
              <b-form-group label="Last name" label-for="lastname">
                <b-form-input
                  id="lastname"
                  type="text"
                  v-model="booking.lastname"
                  size="md"
                  name="lastname"
                  required
                >
                </b-form-input>
              </b-form-group>
            </b-col>
            <b-col md="6">
              <b-form-group label="Date from" label-for="date_range">
                <v-date-picker
                  id="date_range"
                  :attributes="bookedDates"
                  mode="range"
                  v-model="booking.range"
                  is-inline
                  :min-date="new Date()"
                  size="md"
                  name="date_range"
                  required
                >
                </v-date-picker>
              </b-form-group>
            </b-col>

            <b-col md="6" v-if="booking.range.start <= new Date()">
              <b-form-group label="Key card" label-for="code">
                <b-form-input
                  v-for="booking_key in booking_keys"
                  :key="booking_key.id"
                  id="code"
                  type="text"
                  v-model="booking_key.code"
                  class="form-control form-control-sm my-1"
                  name="code"
                >
                </b-form-input>
                <b-input-group-append>
                  <b-button @click="addKey" variant="primary">Add key</b-button>
                </b-input-group-append>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" class="text-center">
              <b-btn type="submit" variant="primary" class="float-right"
                >Create booking</b-btn
              >
            </b-col>
          </b-row>
        </b-form>
      </b-container>
    </b-modal>

    <b-modal
      centered
      id="addKey"
      title="Confirmation"
      @ok="additionalKey()"
      ok-variant="success"
    >
      <b-col md="12">
        <b-form-group label="Key card" label-for="additional_code">
          <b-form-input
            v-for="booking_key in booking_keys"
            id="additional_code"
            type="text"
            v-model="booking_key.code"
            class="form-control form-control-sm my-1"
            name="additional_code"
          >
          </b-form-input>
          <b-input-group-append>
            <b-button @click="addKey" variant="primary">Add key</b-button>
          </b-input-group-append>
        </b-form-group>
      </b-col>
    </b-modal>

    <b-modal
      centered
      id="deleteRoom"
      title="Confirmation"
      @ok="deleteRoom"
      ok-variant="danger"
    >
      <p class="my-4">Are you sure you want to completely delete this Room?</p>
    </b-modal>
  </b-container>
</template>

<script>
export default {
  name: "Room",
  data() {
    return {
      room: null,
      keys: null,
      activeKeys: null,
      occupied: null,
      allBookings: {},
      booking: {
        range: {
          start: new Date(),
          end: new Date(),
        },
      },
      booking_keys: [{ code: "", id: -1 }],
      bookedDates: [
        {
          bar: {
            backgroundColor: "#ff4d4d",
          },
          dates: [],
          popover: {
            label: "This date is already booked!",
          },
        },
      ],
      keysFields: [
        {
          key: "code",
          label: "Key code",
        },
      ],
    };
  },
  methods: {
    addKey() {
      console.log('check')
      axiMara
        .get("keyCheck", {
          params: {
            code: this.booking_keys[this.booking_keys.length - 1].code,
          },
        })
        .then((response) => {
          if (response.data.success === true) {
            this.booking_keys[this.booking_keys.length - 1].id =
              response.data.data.id;
            this.booking_keys.push({
              code: "",
              id: -1,
            });
          } else {
            this.$toasted.global.err({
              message: response.data.data.msg,
            });
          }
        });
    },

    goToRoomEdit() {
      this.$router.push("/rooms/edit/" + this.room.id);
    },
    goToFloor() {
      this.$router.push("/floors/" + this.room.floor_id);
    },
    deleteRoom() {
      axiMara.post("rooms/deleteById", this.room).then((response) => {
        this.$router.push("/floors");
      });
    },
    keyStatus() {
      axiMara.post("rooms/keyStatus", this.room).then((response) => {
        if (response.data.success) {
          this.$router.push("/floors/" + this.room.floor_id);
        }
      });

      axiMara.post("events/createKey", this.room).then((response) => {
        if (response.data.success) {
        }
      });
    },
    doorStatus() {
      axiMara.post("rooms/doorStatus", this.room).then((response) => {
        if (response.data.success) {
          this.$router.push("/floors/" + this.room.floor_id);
        }
      });

      axiMara.post("events/createDoor", this.room).then((response) => {
        if (response.data.success) {
        }
      });
    },
    windowStatus() {
      axiMara.post("rooms/windowStatus", this.room).then((response) => {
        if (response.data.success) {
          this.$router.push("/floors/" + this.room.floor_id);
        }
      });

      axiMara.post("events/createWindow", this.room).then((response) => {
        if (response.data.success) {
        }
      });
    },

    sosActivate() {
      axiMara.post("rooms/sos", this.room).then((response) => {
        if (response.data.success) {
          this.$router.push("/floors/" + this.room.floor_id);
        }
      });

      axiMara.post("events/createSos", this.room).then((response) => {
        if (response.data.success && response.data.data.event.event_id === 7) {
          this.$toasted.global.sos({
            message: this.room.number,
          });
        } else if(response.data.success && response.data.event.event_id === 9
        ){
          this.$toasted.show({
            message: this.room.number,
          });
        }
      });
    },
    createBooking: function() {
      this.booking_keys.pop();
      this.booking.range.end = this.booking.range.end.setDate(
        this.booking.range.end.getDate() - 1
      );
      axiMara
        .post("bookings/create", {
          params: {
            booking: this.booking,
            room_id: this.room.id,
            booking_keys: this.booking_keys,
          },
        })
        .then((response) => {
          this.booking.range.start = new Date();
          this.booking.range.end = new Date();
          this.booking.firstname = "";
          this.booking.lastname = "";
          this.booking_keys = [{ code: "", id: -1 }];
          if (response.data.success) {
            this.$toasted.show("Booking successfully added!");
            this.$root.$emit("bv::hide::modal", "addBooking");
            this.getBookedDates();
          } else {
            this.$toasted.global.err({
              message: response.data.data.msg,
            });
          }
        });
    },
    additionalKey: function() {
      this.getActiveKeys();
      this.booking_keys.pop();
      axiMara
        .post("bookings/additionalKey", {
          params: {
            id: this.occupied.id,
            booking_keys: this.booking_keys,
          },
        })
        .then((response) => {
          if (response.data.success) {
            this.$toasted.show("New key successfully added!");
            this.booking_keys = [{ code: "", id: -1 }];
          } else {
            this.$toasted.global.err({
              message: response.data.data.msg,
            });
            this.booking_keys = [{ code: "", id: -1 }];
          }
        });
    },

    getActiveKeys() {
      axiMara
        .get("keys/getByRoomId", {
          params: {
            room_id: this.$route.params.id,
          },
        })
        .then((response) => {
          if (response.data.success) {
            console.log(response.data)
            this.activeKeys = response.data.data;
          }
        });
    },

    getBookedDates: function() {
      let self = this;
      self.bookedDates[0].dates = [];
      axiMara
        .get("bookings/getDatesByRoomId", {
          params: {
            id: this.$route.params.id,
          },
        })
        .then((response) => {
          if (response.data.success) {
            this.allBookings = response.data.data;
            this.allBookings.forEach(function(item) {
              self.bookedDates[0].dates.push({
                start: new Date(item.date_from),
                end: new Date(item.date_to),
              });
            });
          }
        });
    },
  },
  mounted() {
    this.$root.$emit("refreshEvents", "room");
  },
  created() {
    this.getActiveKeys();
    this.getBookedDates();
    axiMara
      .get("rooms/getById", {
        params: {
          id: this.$route.params.id,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          this.room = response.data.data;
        }
      });

    axiMara
      .get("bookings/getByRoomId", {
        params: {
          id: this.$route.params.id,
        },
      })
      .then((response) => {
        if (response.data.success) {
          this.occupied = response.data.data;
        }
      });

    axiMara.get("keys").then((response) => {
      if (response.status === 200) {
        this.keys = response.data.data;
      }
    });
  },
};
</script>
<style lang="scss">
td {
  img {
    max-height: 20px;
  }
}
</style>
