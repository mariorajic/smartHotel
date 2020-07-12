<template>
  <b-row v-if="users">
    <b-col>
      <b-table
        striped
        hover
        search-key="name"
        :items="users"
        :fields="usersFields"
        @rowClicked=""
      >
      </b-table>
    </b-col>
  </b-row>
</template>

<script>
// @ is an alias to /src

export default {
  name: "users",
  data() {
    return {
      users: null,
      usersFields: [
        {
          key: "username",
          label: "Username",
          sortable: true,
        },
        {
          key: "email",
          label: "E-mail",
          sortable: true,
        },
      ],
    };
  },

  created() {
    axiMara.get("users").then((response) => {
      if (response.status === 200) {
        this.users = response.data.data;
      }
    });
  },
};
</script>
