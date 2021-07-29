<template>
  <v-card class="justify-center" max-width="21%" tile>
    <v-list rounded>

      <h1>About</h1>

      <v-list-item-group v-model="selectedItem" color="primary">

        <!-- Iterate through the item list given below in "data" -->
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
        >
          <v-list-item-content>
            <v-list-item-title v-text="item.text"></v-list-item-title>
          </v-list-item-content>

        </v-list-item>
        <!-- ---- -->

      </v-list-item-group>
    </v-list>
  </v-card>
</template>

<script>
  export default {
    data: () => ({
      items: [
        { text: 'Made using Vue JS' },
        { text: 'Vuex for state management' },
        { text: 'Vuetify for UI' },
        { text: 'Token authentication using JWT' },
      ],
    }),
  }
</script>