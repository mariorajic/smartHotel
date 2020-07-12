<template>
    <b-container>
<!--        <b-row v-if="floors">-->
<!--            <b-col>-->
<!--                <b-table striped hover-->
<!--                         :items="floors"-->
<!--                         :fields="floorsFields"-->
<!--                         @row-clicked="goToFloor">-->
<!--                </b-table>-->
<!--            </b-col>-->
<!--        </b-row>-->
        <b-row>
            <b-col>
                <h2>
                    Floor list
                </h2>
            </b-col>
        </b-row>
        <b-row class="buttonsRow py-4">
            <b-col v-for="floor in orderedFloors" class="floorNo p-4" cols="3" :actions="actions" v-on:click="goToFloor2(floor)">
                <h5 class="text-center">
                    {{floor.number}}
                </h5>
            </b-col>
        </b-row>

        <b-row class="buttonsRow">
            <b-col cols="8">
            </b-col>
            <b-col cols="4" class="p-4 flex-center flex-column">
                <b-btn size="lg" variant="primary" class="w-50" @click.prevent="addFloors">
                    Add floors
                </b-btn>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
    // @ is an alias to /src

    export default {
        name: 'floors',
        data() {
            return {
                floors: null,
                floorsFields: [
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
                actions: {
                    'assign': {
                        name: 'Select Floor',
                        variant: 'success',
                    }
                }
            }
        },
        methods: {
            goToFloor(floor) {
                this.$router.push('/floors/' + floor.id);
            },
            goToFloor2(item) {
                this.$router.push('/floors/' + item.id);
            },
            addFloors(item) {
                this.$router.push('/floors/create');
            },
        },
        mounted(){
            this.$root.$emit('refreshEvents','floors');
        },
        created() {
            axiMara.get('floors').then(response => {
                if (response.status === 200) {
                    this.floors = response.data.data;
                }
            });
        },
        computed: {
            orderedFloors: function () {
                return _.orderBy(this.floors, 'number');
            }
        }
    };
</script>
<style lang="scss">
    .eventLog{
        background: #bdbdbd;
    }

    .floorNo{
        background-image: url('../../assets/img/circleFloor.png');
        background-size: 70px;
        background-position: center;
        background-repeat: no-repeat;
        color: #FFF;
        cursor: pointer;
    }
</style>