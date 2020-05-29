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
    <template slot="table-row" slot-scope="props">

              <Row :TableauProps="props"/>
            <!-- <v-checkbox  v-model="isHidden" label="adhérence" v-if="props.column.field == 'checkbox'"></v-checkbox> 
            <Checkbox :v-model="isHidden"  v-if="props.column.field == 'checkbox'"/> 
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

import Row from './Row'

export default {
  components: {
    VueGoodTable,
    Row
  },
  props: ["values"],
  data() {
    return {
      data: [],
      adherences: [],
      isHidden: Boolean
    };
  },
  methods: {
      
    onRowClick(params) {
        console.log('chcked : ',params.selected)
        let tmpArr = this.adherences;
        if(params.selected) {
           
            tmpArr.push(params.row.name)
            this.isHidden = true
        }
        else {
            tmpArr.splice(tmpArr.indexOf(params.row.name), 1)
        }
      // params.row - row object oui att
      this.adherences = tmpArr;
      console.log('adhérences: ', this.adherences)
     // console.log('params',params.row.name)
     // console.log(params.selected)
      // params.pageIndex - index of this row on the current page.
      // params.selected - if selection is enabled this argument
      // indicates selected or not
      // params.event - click event
    },

    getColumns() {
      return [
        {
          label: "Adherence",
          field: "checkboxx"
        },
        {
          label: "Nom de l'application",
          field: "name",
          type: "number"
        },
        {
          label: "Date de livraison",
          field: "dateDelivery",
          type: "string",
          //dateInputFormat: "yyyy-MM-dd",
          //dateOutput: "dd-MM-yyyy"
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
    }
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
