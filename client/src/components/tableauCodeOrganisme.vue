<template>
  <CDataTable
    :items="values"
    :fields="fields"
    items-per-page-select
    hover
    sorter
    pagination
    @keyup="$emit('update',values);"
  >
    <template #show_details="{item, index}">
      <td class="py-2">
        <CButton
          color="primary"
          variant="outline"
          square
          size="sm"
          @click="toggleDetails(index)"
        >{{details.includes(index) ? 'Masquer' : 'Afficher'}}</CButton>
      </td>
    </template>

    <template #details="{item, index}">
      <CCollapse :show="details.includes(index)">
        <CCardBody>
          <CMedia :aside-image-props="{ height: 102 }">

            <v-select
              v-model="item.justification"
              :items="itemsJustification"
              attach
              chips
              label="Justification"
              solo
            ></v-select>
             <v-checkbox v-model="item.archimed" :label="`Connectée Archimed`"></v-checkbox>
            <v-checkbox v-model="item.esb" :label="`Connectée ESB`"></v-checkbox>
            <v-row>
            <v-button @click="addDate(index, item)" name="addDate" ><img src="https://img.icons8.com/color/48/000000/calendar-plus.png"/></v-button>
            <v-button @click="deleteDate(index, item)" name="deleteDate"><img src="https://img.icons8.com/color/48/000000/calendar-minus.png"/></v-button>
            </v-row>
            <div v-for="(dateInput, dateIndex) in item.dates" v-bind:key="dateIndex">
              <v-row>
                <v-col cols="6">
                  <p class="text-muted">
                    Date debut :
                    <span>
                      <Date :key="dateIndex" :dates.sync="item.dates[dateIndex].dateDebOrg"/>
                    </span>
                  </p>
                </v-col>
                <v-col cols="6">
                  <p class="text-muted">
                    Date fin :
                    <span>
                      <Date :key="dateIndex" :min="item.dates[dateIndex].dateDebOrg" :dates.sync="item.dates[dateIndex].dateFinOrg"/>
                    </span>
                  </p>
                </v-col>
           
              </v-row> 
            </div>
          </CMedia>
        </CCardBody>
      </CCollapse>
    </template>
  </CDataTable>
</template>

<script>
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

import Date from "./date";
export default {

  computed: {
    getDates(i) {
       return "dateDebOrg" + i;
    }
  },
  components: {
    Date
  },
  name: "tables",
  props: ["values"],
  data() {
    return {
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

    addDate(index, item) {
      console.log("iiii ",index)
    /*    this.dateDet.push({
        dateDebOrg: item.dateDebOrg,
        dateFinOrg: item.dateFinOrg
      })  */
      if (!item.dates){
          item.dates = []
      }  
      item.dates.push({
        dateDebOrg: item.dateDebOrg,
        dateFinOrg: item.dateFinOrg
      })
      //let data = this.values[index];
      //data["dateOrganisation"] = this.dateDet;
      //data["dateOrganisation"] = item.dates;
      console.log("item ", item)
      //this.values[index] = data
      
    },
    deleteDate(index,item){
      if(item.dates.length > 1){
      item.dates.pop()
      console.log(item)
      }
    },

    getDateDebOrg(dateDebOrg, i) {
      return "dateDebOrg" + i;
    },
    onChildDate(value) {
      this.values[this.details[0]]["dateDebOrg"] = value;
    },

    onChildDateFin(values) {
      this.values[this.details[0]]["dateFinOrg"] = values;
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