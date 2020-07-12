<template>
    <b-container>
        <b-row v-if="rooms">
            <b-col>
                <b-table striped hover
                         :items="rooms"
                         :fields="roomsFields"
                         @row-clicked="goToRoom">
                </b-table>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
    // @ is an alias to /src

    export default {
        name: 'rooms',
        data() {
            return {
                rooms: null,
                roomsFields: [
                    {
                        key: 'number',
                        label: 'Floor number',
                        sortable: true
                    },
                    {
                        key: 'id',
                        label: 'ID',
                        sortable: true
                    },
                ],
            }
        },
        methods: {
            goToRoom(item) {
                this.$router.push('/rooms/' + item.id);
            },

        },

        created() {
            axiMara.get('rooms').then(response => {
                if (response.status === 200) {
                    this.floors = response.data.data;
                }
            })
        },
    };
</script>
<style lang="scss">
</style>