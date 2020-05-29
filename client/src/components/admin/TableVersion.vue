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
    <template #flag_install="{item}">
      <td>
        <CBadge :color="getBadge(item.flag_install)">{{getStatus(item.flag_install)}}</CBadge>
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
            <h4>{{item.code_projet}}</h4>
            <p class="text-muted">Date MEP: {{item.date_mep}} 
              Date Debut incubation {{item.date_db_incub}} 
              Date Fin incubation {{item.date_fn_incub}} 
            </p>
            <CButton size="sm" color="info" class>User Settings</CButton>
            <CButton size="sm" color="danger" class="ml-1">Supprimer</CButton>
          </CMedia>
        </CCardBody>
      </CCollapse>
    </template>
  </CDataTable>
</template>

<script>
const fields = [
  { key: "id_projet_lot", _style: "width:10%;" },
  { key: "code_projet", _style: "width:40%" },
  { key: "nm_clr", _style: "width:40%;" },
  { key: "flag_install", _style: "width:10%;" },

  {
    key: "show_details",
    label: "",
    _style: "width:1%",
    sorter: false,
    filter: false
  }
];

export default {
  props: ["items"],

  computed: {
    getItems() {
      return this.items;
    }
  },
  name: "tables",
  data() {
    return {
      fields,
      details: []
    };
  },

  /*
  mounted: function() {
    fetch("http://localhost:3000/projet_couloir_appli")
      .then(rep => {
        return rep.json();
      })
      .then(e => {
        this.items = e;
      });
  },*/

  methods: {
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
      console.log(status)
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