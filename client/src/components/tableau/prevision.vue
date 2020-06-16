<template>
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
    <template #diff="{item}">
      <td v-if="item.diff > 0">
        <CBadge :color="getBadge(item.diff) ">  {{item.diff + getStatus(item.diff)}}</CBadge>
      </td>
      <td v-if="item.diff <= 0">
        <CBadge :color="getBadge(item.diff) ">  {{item.date_integration | moment("YYYY-MM-DD")}} {{getStatus(item.diff)}}</CBadge>
      </td>
    </template>
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
            <div>
              <h4>{{item.code_projet}}</h4>
              <p class="text-muted">Date MEP: {{item.date_mep | moment("YYYY-MM-DD") }}</p>
              <p class="text-muted">Date Integration: {{item.date_integration | moment("YYYY-MM-DD") }}</p>
              <CButton size="sm" color="info" class>details</CButton>
              <CButton size="sm" color="danger" class="ml-1">Supprimer</CButton>
            </div>
          </CMedia>
        </CCardBody>
      </CCollapse>
    </template>
  </CDataTable>
</template>



<script>
var moment = require("moment");

const fields = [
  { key: "code_projet", _style: "width:40%" },
  { key: "date_livraison", _style: "width:40%;" },
  { key: "diff", _style: "width:20%;" },
  {
    key: "show_details",
    label: "",
    _style: "width:1%",
    sorter: false,
    filter: false
  }
];

export default {
  name: "tables",
  data() {
    return {
      fields,
      details: [],
      items: [],
      isHidden: false
    };
  },

  mounted: function() {
    fetch("http://localhost:3000/projet_en_incubation_prevision ")
      .then(rep => {
        return rep.json();
      })
      .then(e => {
        console.log("e : ", e);
        let aux = e.map(item => {
          let dataformat = moment(item.date_livraison).format("YYYY-MM-DD");
          let dateformat = moment(item.date).format("YYYY-MM-DD");
          item.date_livraison = dataformat;
          item.date = dateformat;
          return item;
        });
        this.items = aux;
      });
  },

  methods: {
    getStatus(val) {
      return  val > 0
        ? " jours avant Incubation"
         : val == 0
        ? " En Incubation " 
        : val < 0
        ? " En Incubation"
        : " ";
    },

    getBadge(status) {
      return status > 0 && status <= 30
        ? "success"
        : status === "Inactive"
        ? "secondary"
        : status > 30
        ? "warning"
        : status < 0
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