<template>
  <vue-good-table
    :columns="getColumns()"
    :rows="getRows()"
    :groupOptions="{
                enabled: true,
                headerPosition: 'top'
            }"
    theme="black-rhino"
   
  >
    <template slot="table-column" slot-scope="props" >
      <span v-if="props.column.label =='Nom de l\'application'" >{{props.column.label}}</span>
      <span v-else >{{props.column.label}}</span>
    </template>
    <template slot="table-row" slot-scope="props" >
      <Row
        :TableauProps="props"
        v-on:MessageChildToParent="onChildRow"
        v-on:MessageChildToParentt="onChildRowx"
        
      />
      <!-- <v-checkbox  v-model="isHidden" label="adhérence" v-if="props.column.field == 'checkboxx'"></v-checkbox> 
            <Checkbox :v-model="isHidden"  v-if="props.column.field == 'checkboxx'"/> 
            <span v-else-if="props.column.field == 'name'" class="span">{{props.formattedRow[props.column.field]}}</span>
            <div v-else-if="isHidden && props.column.field == 'dateDelivery'">
              <Date />
      </div>-->
    </template>
  </vue-good-table>
</template>

<script>
import "vue-good-table/dist/vue-good-table.css";
import { VueGoodTable } from "vue-good-table";
import Row from "./Row";

export default {
  name: "parentChild",
  components: {
    VueGoodTable,
    Row
  },
  props: ["values"],
  data() {
    return {
      data: [],
      adherences: [],
      isHidden: Boolean,
      tab: [],
      date_fin: []
    };
  },
  methods: {
    onRowClick(params) {
      console.log("chcked : ", params.selected);
      let tmpArr = this.adherences;
      if (params.selected) {
        tmpArr.push(params.row.name);
        this.isHidden = true;
      } else {
        tmpArr.splice(tmpArr.indexOf(params.row.name), 1);
      }

      this.adherences = tmpArr;
    },

    getColumns() {
      return [
        {
          label: "Nom de l'application",
          field: "name"
        },
        {
          label: "Adherence",
          field: "checkboxx"
        },
        {
          label: "Date",
          field: "dateDelivery"
        }
      ];
    },

    getRows() {
      var domaineHashMap = groupBy(this.values, value => value.domaine);

      let rows = [];

      new Map(domaineHashMap).forEach((value, key, hashMap) => {
        let children = [];
        hashMap.get(key).forEach(element => {
          children.push({
            name: element.name,
            dateDelivery: "",
            checkbox: ""
          });
        });
        rows.push({
          mode: "span",
          label: key,
          children: children
        });
      });
      return rows;
    },

    onChildRow(value) {
      this.tab.push(value);
    },

    onChildRowx(values) {
      this.date_fin.push(values);

      let objs = this.tab.concat(this.date_fin)

      let obj = objs.reduce(function(acc, val) {
        return Object.assign(acc, val);
      }, {});
     
      this.$event.$emit("child", obj)
    },

  }
};

function groupBy(list, keyGetter) {
  const map = new Map();
  list.forEach(item => {
    const key = keyGetter(item);
    const collection = map.get(key);
    if (!collection) {
      map.set(key, [item]);
    } else {
      collection.push(item);
    }
  });
  return map;
}
</script>