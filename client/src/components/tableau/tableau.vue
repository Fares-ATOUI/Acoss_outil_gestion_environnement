<template>
  <div data-v-079a3553 class="card-body">
    <div data-v-079a3553 class="row">
      <div class="col-sm">
        <CDataTable
          :items="items"
          :fields="fields"
          column-filter
          table-filter
          items-per-page-select
          hover
          sorter
          pagination
        >
          <template #status="{item}">
            <td>
              <CBadge :color="getBadge(item.status)">{{item.status}}</CBadge>
            </td>
          </template>
          <template #show_details="{item, index}">
            <td class="py-2">
              <CButton
                color="primary"
                variant="outline"
                square
                size="sm"
                @click="toggleDetails(index), click2()"
              >{{details.includes(index) ? 'Masquer' : 'Afficher'}}</CButton>
            </td>
          </template>
          <template #details="{item, index}">
            <CCollapse :show="details.includes(index)">
              <CCardBody>
                <CMedia :aside-image-props="{ height: 102 }">
                  <div v-if="!isHidden">
                    <h4>{{item.code_projet}}</h4>
                    <p class="text-muted"> Entrée incubation : {{item.date_livraison | moment("YYYY-MM-DD")}}</p>
                    <p class="text-muted"> Entrée integration : {{item.date_integration | moment("YYYY-MM-DD")}}</p>
                    <p class="text-muted"> Mise en produciton: {{item.date_mep | moment("YYYY-MM-DD")}}</p>
                    <CButton
                      size="sm"
                      color="info"
                      class
                      @click="click(), tableauDetails(item.id_projet)"
                      
                    >details</CButton>
                    <CButton size="sm" color="danger" class="ml-1">Supprimer</CButton>
                  </div>
                
                  <TableauDetails v-if="isHidden" :items="itemsDetails" :key="index"/>
                </CMedia>
              </CCardBody>
            </CCollapse>
          </template>
        </CDataTable>
      </div>
      <div class="col-sm">
        <TablePrevision />
      </div>
    </div>
  </div>
</template>

<script>
const fields = [
  { key: "code_projet", _style: "width:40%" },
  { key: "libelle", _style: "width:40%;" },
  { key: "nbr_app", _style: "width:20%;" },
  {
    key: "show_details",
    label: "",
    _style: "width:1%",
    sorter: false,
    filter: false
  }
];

import TableauDetails from "./tableauDetails.vue";
import TablePrevision from "./prevision";
var moment = require("moment");
export default {
  components: {
    TableauDetails,
    TablePrevision
  },

  name: "tables",
  data() {
    return {
      fields,
      details: [],
      items: [],
      isHidden: false,
      itemsDetails: []
    };
  },
  mounted: function() {
    fetch("http://localhost:3000/projet_en_incubation")
      .then(rep => {
        return rep.json();
      })
      .then(e => {
        let aux = e.map(item => {
          let dataformat = moment(item.date_livraison).format("YYYY-MM-DD");
          let dateformat = moment(item.date_integration).format("YYYY-MM-DD");
          item.date_livraison = dataformat;
          item.date_integration = dateformat;
          return item;
        });
        this.items = aux;
      });
  },

  methods: {
    async tableauDetails(id_projet) {
      const response = await fetch(
        "http://localhost:3000/tableau/details/" + id_projet
      );
      const jsonResponse = await response.json();

      console.log("details data ", jsonResponse);

      this.itemsDetails = jsonResponse;
    },
    click() {
      this.isHidden = true;
      console.log("hello ", this.isHidden);
    },
    click2() {
      this.isHidden = false;
      console.log("hello ", this.isHidden);
    },
    getBadge(status) {
      return status === "Active"
        ? "success"
        : status === "Inactive"
        ? "secondary"
        : status === "Pending"
        ? "warning"
        : status === "Banned"
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