<template>
  <b-container class="align-items-center">
    <b-row>
      <b-col>
        <h4 class="py-3">
          Latest events - <span v-if="room">Room {{ room.number }}</span>
          <span v-else-if="floor">Floor {{floor.number}}</span>
          <span v-else>Overview</span>
        </h4>
      </b-col>
    </b-row>
    <b-row v-if="events">
      <b-col>
        <b-table
          class="eventsTable"
          hover
          small
          :items="events"
          :fields="eventsFields"
          :per-page="20"
        >
          <template slot="created_at" slot-scope="data">
            {{ data.value | moment("DD. MM., H:mm") }}
          </template>
        </b-table>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: "events",
  data() {
    return {
      floor: null,
      room: null,
      events: null,
      sosEvents: null,
      eventsFields: [
        {
          key: "number",
          label: "Room no.",
        },
        {
          key: "message",
          label: "Message",
        },
        {
          key: "code",
          label: "Code",
        },
        {
          key: "created_at",
          label: "Time",
        },
      ],
      sosFields: [
        {
          key: "number",
          label: "Room no.",
        },
        {
          key: "message",
          label: "Message",
        },
        {
          key: "sos",
          label: "SOS",
        },
      ],
    };
  },
  methods: {
    getFloorEvents() {
      axiMara
        .get("events/getByFloorId", {
          params: {
            id: this.$route.params.id,
          },
        })
        .then((response) => {
          if (response.status === 200) {
            this.events = response.data.data;
          }
        });
      axiMara
        .get("floors/getById", {
          params: {
            id: this.$route.params.id,
          },
        })
        .then((response) => {
          if (response.status === 200) {
            this.room = null;
            this.floor = response.data.data;
          }
        });
    },
    getRoomEvents() {
      axiMara
        .get("events/getByRoomId", {
          params: {
            id: this.$route.params.id,
          },
        })
        .then((response) => {
          if (response.status === 200) {
            this.events = response.data.data;
          }
        });
      axiMara
        .get("rooms/getById", {
          params: {
            id: this.$route.params.id,
          },
        })
        .then((response) => {
          if (response.status === 200) {
            this.floor = null;
            this.room = response.data.data;
          }
        });
    },
    getAllEvents() {
      axiMara.get("events/").then((response) => {
        if (response.status === 200) {
          this.floor = null;
          this.room = null;
          this.events = response.data.data;
        }
      });
    },
    getSosEvents() {
      axiMara.get("events/sos").then((response) => {
        if (response.status === 200) {
          this.sosEvents = response.data.data;
        }
      });
    },
  },
  created() {
    let self = this;
    this.getSosEvents();
    this.$root.$on("refreshEvents", (refreshFor) => {
      if (refreshFor === "floors") {
        let self = this;
        clearInterval(this.interval);
        this.getAllEvents();
        this.interval = setInterval(function() {
          self.getAllEvents();
        }, 2000);
      } else if (refreshFor === "floor") {
        clearInterval(this.interval);
        this.getFloorEvents();
        this.interval = setInterval(function() {
          self.getFloorEvents();
        }, 2000);
      } else if (refreshFor === "room") {
        clearInterval(this.interval);
        this.getRoomEvents();
        this.interval = setInterval(function() {
          self.getRoomEvents();
        }, 2000);
      } else {
        console.log("No location parameter sent");
      }
    });
  },
  destroyed() {
    clearInterval(this.interval);
    this.$root.$off("refreshEvents");
  },
  computed: {},
};
</script>

<style lang="scss">
.separator {
  height: 2px;
  background: rgba(255, 255, 255, 0.4);
  margin: 0 0px;
}

.sosTable {
  color: #fff;
  background-color: #f44336;
}
</style>
