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
            <p class="text-muted">
              Date Insertion :
              <span>{{ item.date_insertion | moment("YYYY-MM-DD") }}</span>
            </p>
            <p class="text-muted">
              Heure Insertion :
              <span>{{ item.heure_insertion | moment("h:mm") }}</span>
            </p>
            <CButton size="sm" color="info" class @click="RechargerData(item.id_projet)">Modifier</CButton>
            <CButton
              size="sm"
              color="danger"
              class="ml-1"
              @click="deleteData(item.id_projet)"
            >Supprimer</CButton>
          </CMedia>
        </CCardBody>
      </CCollapse>
    </template>
  </CDataTable>
</template>

<script>
const fields = [
  { key: "id_projet", _style: "width:10%;" },
  { key: "code_projet", _style: "width:40%" },
  { key: "date_insertion", _style: "width:40%;" },
  { key: "heure_insertion", _style: "width:10%;" },

  {
    key: "show_details",
    label: "",
    _style: "width:1%",
    sorter: false,
    filter: false
  }
];
var moment = require("moment");
export default {
  /* props: ["items"], */

  /* computed: {
    getItems() {
      return this.items;
    }
  }, */
  name: "tables",
  data() {
    return {
      items: [],
      fields,
      details: [],
      dataInsert: [], 
      date_train : "",
    };
  },

  created() {
    this.getdata();
  },

  mounted: function() {
    this.getdata();
  },

  methods: {
    async deleteData(id_projet) {
      const response = await fetch(
        "http://localhost:3000/historique/details/delete/" + id_projet,
        {
          method: "DELETE"
        }
      );
      const jsonResponse = await response.json();
      console.log(jsonResponse);
      //this.$router.push({ name: "historique" });
      //this.$forceUpdate();
    },

    async getdata() {
      fetch("http://localhost:3000/historique")
        .then(rep => {
          return rep.json();
        })
        .then(e => {
          console.log("fetch result: ", e);
          let aux = e.map(item => {
            let dataformat = moment(item.date_insertion).format("YYYY-MM-DD");
            let heureformat = moment(item.heure_insertion, "hh:mm:ss").format( "kk:mm");
            item.date_insertion = dataformat;
            item.heure_insertion = heureformat;

            return item;
          });
          this.items = aux;
        });
    },

    async RechargerData(id_projet) {
      // redirection ver FormVue avec le id en paramètre
      this.$router.push({ name: "form", params: { id: id_projet } });

      const response = await fetch(
        "http://localhost:3000/historique/details/" + id_projet
      );
   
      const jsonResponse = await response.json();
      console.log("historique: ", jsonResponse);
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