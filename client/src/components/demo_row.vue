

<template>
  <v-container>
      <v-row>
        <v-col cols="12" sm="6" md="2">
           <v-subheader>Date Démo</v-subheader>
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <DateRange :date_demo="demo_date.date_demo" @keyup="$emit('update',date_demo);" :inputData.sync="demo_date.date_demo" />
        </v-col>
        <v-col cols="12" sm="6" md="2">
        <v-checkbox v-model="demo_date.checkbox"  @keyup="$emit('update',demo_date);"  :label="`stabilité demandé`"></v-checkbox>
        </v-col>
        <v-col cols="12" sm="6" md="4" v-if="demo_date.checkbox">
          <v-select
            v-model="demo_date.stabilite"
             @keyup="$emit('update',demo_date);"
            :items="values"
            attach
            label="stabilite"
            solo
            multiple
          ></v-select>
        </v-col>
  
      </v-row>
        <!-- </div> -->
     

  </v-container>
</template>

<script>

import DateRange from './date_range';
const fields = [
  { key: "code_org", _style: "width:40%" },
  { key: "add_serveur", _style: "width:40%" },
  { key: "couloir", _style: "width:40%;" },
  {
    key: "show_details",
    label: "",
    _style: "width:1%",
    sorter: false,
    filter: false
  }
];

export default {

  components: {
    DateRange
  },
  name: "tables",
  props: ["demo_date","values"],
  data() {
    return {
      parentData:[],
        checkbox:false,
       // demo_date:"",
        valueDateDemo:[],
        stabilite:[],
      disabled3: true,
      items: [],
      fields,
      details: [],
      itemsJustification: [
        "Volume de la base",
        "Disponibilité ",
        "Population",
        "Connaissance des données"
      ]
    };
  },

  methods: {
    deleteDemo() {
      if (this.valueDateDemo.length > 0) {
        this.valueDateDemo.pop();
      }
    },
    addDemo() {
      this.valueDateDemo.push({
        date_demo: [],
        checkbox: false,
        stabilite: ""
      });
    },



    getStatus(val) {
      return val == 1
        ? "En Incubation"
        : val == 0
        ? "Avant Incubation"
        : val == -1
        ? "Sorti d'Incubation"
        : " ";
    },

    getBadge(status) {
      console.log(status);
      return status == 1
        ? "success"
        : status == 0
        ? "warning"
        : status == -1
        ? "danger"
        : "primary";
    },
    toggleDetails(index) {
      const position = this.details.indexOf(index);
      position !== -1
        ? this.details.splice(position, 1)
        : this.details.push(index);
    }
  }
};
</script>

<style scoped>
.TableVue {
  width: 90%;
  height: 30%;
  margin-bottom: 10%;
  padding: 8px 8px;
  position: absolute;
  margin-left: 20%;
}
</style>