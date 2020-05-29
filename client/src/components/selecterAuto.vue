<template>
  <v-container fluid>
    <v-row>
      <v-col cols="4">
        <v-autocomplete
          v-model="values"
          :items="items"
          item-text="name"
          v-bind:item-value="value"
          dense
          chips
          small-chips
          label="Ajouter une dépendance/adhérence"
          multiple
          solo
        ></v-autocomplete>
      </v-col>
      <v-col cols="8">
        <Tableau v-if="values.length" :values="values"></Tableau>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Tableau from "./Tableau";

export default {
   props: ["items"],
  components: {
    Tableau
  },
  data: () => ({
  
    values: [],
    value: null
  }),

     methods: {
      
      emitToParent () {
        console.log('souuuuuu ', this.values)
        //this.$emit('childSelecterToParent', this.selectionnes)
      }
    },
};
</script>
