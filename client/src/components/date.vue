<template>
  <v-layout row wrap>
    <v-flex xs12 sm6 md4>
      <v-menu
        ref="menu"
        v-model="menu"
        :close-on-content-click="false"
        :nudge-right="40"
        :return-value.sync="date"
        lazy
        transition="scale-transition"
        offset-y
        full-width
        min-width="290px"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            v-model="dates"
            label="veuillez choisir une date"
            prepend-icon
            readonly
            v-on="on"
            solo
            :disabled="disabled"
          ></v-text-field>
        </template>
        <v-date-picker v-model="date" no-title scrollable :min="min" >
          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="menu = false">Annuler</v-btn>
          <v-btn text color="primary" @click=" $refs.menu.save(date), emitToParent(), $emit('update:dates',date), disableToParent()">Valider</v-btn>
        </v-date-picker>
      </v-menu>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  props: ["dates","min","disabled"],
  data: function() {
    //date: "",//new Date().toISOString().substr(0, 10),
    return {
      date: this.dates,
      menu: false
    };
  },
  methods: {
    emitToParent() {
      let d = this.date;
      this.$emit("childToParent", d);
    },
    disableToParent() {
      let x = false
      this.$emit("disabledToparent", x);
    }
  }
};
</script>