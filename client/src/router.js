import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

//auth routes
import Register from "./views/auth/Register.vue";
import Login from "./views/auth/Login.vue";

//Floor routes
import Floors from "./views/floors/Floors.vue";
import FloorsCreate from "./views/floors/Create.vue";
import Floor from "./views/floors/Floor.vue";
import FloorsEdit from "./views/floors/Edit.vue";

//Room routes
import Rooms from "./views/rooms/Rooms.vue";
import RoomsCreate from "./views/rooms/Create.vue";
import Room from "./views/rooms/Room.vue";
import RoomsEdit from "./views/rooms/Edit.vue";

//Users routes
import Users from "./views/Users.vue";

Vue.use(Router);

export default new Router({
    mode: "history",
    base: process.env.BASE_URL,
    routes: [
        {
            path: "/",
            name: "home",
            component: Floors
        },
        {
            path: '/auth/register',
            name: 'register',
            component: Register,
            meta: {
                guest: true
            }
        },
        {
            path: '/auth/login',
            name: 'login',
            component: Login,
            meta: {
                guest: true
            }
        },
        {
            path: '/floors/',
            name: 'floors',
            component: Floors,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/floors/create',
            name: 'floorsCreate',
            component: FloorsCreate,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/floors/:id',
            name: 'floor',
            component: Floor,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/floors/edit/:id',
            name: 'floorsEdit',
            component: FloorsEdit,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/rooms/',
            name: 'rooms',
            component: Rooms,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/rooms/create',
            name: 'roomsCreate',
            component: RoomsCreate,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/rooms/:id',
            name: 'room',
            component: Room,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/rooms/edit/:id',
            name: 'roomsEdit',
            component: RoomsEdit,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/users',
            name: 'users',
            component: Users,
            meta: {
                requiresAuth: true
            }
        },

    ]
});

