<template>
  <b-navbar id="myNavbar" type="dark" variant="info" class="px-4">
    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

    <b-collapse is-nav id="nav_collapse" ref="nav_collapse">
      <b-navbar-nav>
        <b-nav-item-dropdown class="sidebar mr-5">
          <template slot="button-content">
            <b-img
              :src="require('../assets/img/logo.png')"
              fluid
              alt="eGateSH"
            />
          </template>

          <template
            v-for="(item, index) in navItems"
            v-if="$store.getters.isAuth"
          >
            <li class="sidebar-link">
              <router-link
                :to="item.href"
                v-b-toggle="'collapse' + item.title"
                class="d-flex justify-content-between"
              >
                <div>
                  {{ item.title }}
                </div>
              </router-link>
              <b-collapse
                accordion="my-accordion"
                :id="'collapse' + item.title"
              >
                <ul v-if="item.submenuItems" class="list-unstyled">
                  <li v-for="sub in item.submenuItems" class="submenu-link">
                    <router-link
                      :to="sub.href"
                      v-b-toggle="'collapse' + sub.title"
                      class="ml-2"
                    >
                      {{ sub.title }}
                    </router-link>
                    <b-collapse
                      accordion="my-accordion2"
                      :id="'collapse' + sub.title"
                    >
                      <ul v-if="sub.submenuItems" class="list-unstyled">
                        <li
                          v-for="subsub in sub.submenuItems"
                          class="submenu-link"
                        >
                          <router-link :to="subsub.href" class="ml-3">
                            {{ subsub.title }}
                          </router-link>
                        </li>
                      </ul>
                    </b-collapse>
                  </li>
                </ul>
              </b-collapse>
            </li>
            <div v-if="index < navItems.length - 1" class="separator"></div>
          </template>
        </b-nav-item-dropdown>
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto" v-if="$store.getters.isAuth">
        <b-nav-item v-if="$store.getters.sosActive" v-b-modal.sosList>
          <em
            ><b-img
              :src="require('../assets/img/sosIcon.png')"
              fluid
              alt="profile.png"
          /></em>
        </b-nav-item>
        <b-nav-item-dropdown right>
          <!-- Using button-content slot -->
          <template slot="button-content">
            <em
              ><b-img
                :src="require('../assets/img/profile.png')"
                fluid
                alt="profile.png"
            /></em>
          </template>
          <b-dropdown-item @click="logout">Logout</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>

    <b-modal
      centered
      size="lg"
      no-close-on-backdrop
      header-bg-variant="danger"
      header-text-variant="light"
      id="sosList"
      title="Active SOS calls"
      ok-only
      @ok=""
    >
      <b-container fluid>
        <b-row v-for="sosEvent in sosEvents" class="my-2">
          <b-col cols="10">
            <b>Room no.: {{ sosEvent.number }}</b>
            <b>
              - SOS ACTIVATED at ({{
                sosEvent.created_at | moment("H:mm, DD. MM.")
              }})</b
            >
            <b> on floor no.: {{ sosEvent.floor_num }}</b>
          </b-col>
          <b-col cols="2">
            <b-button
              @click="sosChecked(sosEvent)"
              size="sm"
              variant="success"
              >Check</b-button
            >
          </b-col>
        </b-row>
      </b-container>
    </b-modal>
  </b-navbar>
</template>

<script>
export default {
  name: "navbar",
  created() {
    let self = this;
    this.getSosEvents();
    this.interval = setInterval(function() {
      self.getSosEvents();
    }, 2000);
  },
  data() {
    return {
      sosEvents: null,
      navItems: [
        {
          title: "Pregled katova",
          href: "/floors",
          show: true,
        },
        {
          title: "Korisnici",
          href: "/users",
        },
      ],
    };
  },
  methods: {
    logout() {
      this.$router.push("/auth/login");
    },
    getSosEvents() {
      if(this.$store.getters.isAuth){
        axiMara.get("events/sos").then((response) => {
        if (response.status === 200) {
          this.sosEvents = response.data.data;
          if (this.sosEvents.length > 0) {
            this.$store.dispatch("sosActivate");
          } else {
            this.$store.dispatch("sosDeactivate");
          }
        }
      });
      }
      
    },
    sosChecked(payload) {
      axiMara
        .post("events/sosCheck", {
          payload: payload,
          timestamp: this.$moment().startOf("day").toDate(),
        })
        .then((response) => {
          if (response.data.success) {
          }
        });
    },
  },
  computed: {},
  destroyed() {
  },
};
</script>

<style lang="scss">
#myNavbar {
  width: 100%;
  min-height: 70px;
  background-color: #455a64 !important;
  img {
    max-height: 40px;
  }
}
.sidebar {
  .dropdown-menu {
    background: #607d8b;
    padding: 8px 16px;
  }
}

.sidebar-link {
  font-size: 1em !important;
  min-width: 300px;
}

.submenu-link {
  font-size: 0.9em !important;
}

.sidebar-link,
.submenu-link {
  background: #607d8b;
  margin: 8px 0;
  a {
    padding: 10px 10px;
    color: #fff !important;
  }
  a.active {
    font-weight: 700;
    text-decoration: underline;
  }
}

.separator {
  height: 2px;
  background: rgba(255, 255, 255, 0.4);
  margin: 0 10px;
}
</style>
