<template slot-scope="props" >
  <v-container class="px-0 nomApp" fluid >
    <span
      v-if="TableauProps.column.field == 'name'"
      class="span"
    >{{TableauProps.formattedRow[TableauProps.column.field]}}
    </span>

    <div v-else-if="TableauProps.column.field == 'checkboxx'" >
      <v-row>
        <v-checkbox v-model="checkbox" ></v-checkbox>
        <Date class="dateeee" v-if="checkbox" :dates="dateRow" v-on:childToParent="onChildDate" />
      </v-row>
    </div>
    <div v-else-if="TableauProps.column.field == 'dateDelivery'">
      <Date class="dateeee" :dates="dataFin" v-on:childToParent="onChildDateFin" />
    </div>
    
  </v-container>
</template>

<script>
import Date from "./date";
export default {
  name: "childComponent",
  props: ["TableauProps"],
  components: {
    Date
  },
  data() {
    return {
      checkbox: false,
      dateRow: "",
      dataFin: "",
  
    };
  },
  methods: {

    onChildDate(value) {
      this.dateRow = value;
      let x;
      x = {
        date: value,
        check: this.checkbox,
        name: this.TableauProps.formattedRow.name
      };
      this.sendMessageToParent(x);
    },

    onChildDateFin(value) {
      let y = {
        dateFin: value
      };
      this.sendDateFinToParent(y);
    },

    sendMessageToParent(values) {
      this.$emit("MessageChildToParent", values);
    },
    sendDateFinToParent(values) {
      this.$emit("MessageChildToParentt", values);
    }
  }
};
</script>

<style scoped>
.nomApp {
  text-align: left;
  padding-top: 2px;
}
.dateeee {
  text-align: center;
}
</style>