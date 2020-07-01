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
              @click="toggleDetails(index)"
            >{{details.includes(index) ? 'Masquer' : 'Afficher'}}</CButton>
          </td>
        </template>
        <template #details="{item, index}">
          <CCollapse :show="details.includes(index)">
            <CCardBody>
              <CMedia :aside-image-props="{ height: 102 }">
                <div >
                  <h4>{{item.req}}</h4>
                  <p class="text-muted">Date MEP: {{item.libelle}}</p>
                  <CButton
                    size="sm"
                    color="info"
                    class
                    @click="rechargerData(item.id_req)"
                  >Recharger</CButton>
                  <CButton size="sm" color="danger" class="ml-1" @click="deleteData(item.id_req)">Supprimer</CButton>
                </div>
              
              </CMedia>
            </CCardBody>
          </CCollapse>
        </template>
      </CDataTable>
</template>

<script>

const fields = [
  { key: "id_req", _style: "width:20%;" },
  { key: "libelle", _style: "width:40%" },
  { key: "req", _style: "width:40%" },
  
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
    
  },
  name: "table_requete",
  data() {
    return {
      items:[],
      fields,
      details: [],
      isHidden: false
    };
  },
  mounted: function() {
    fetch("http://localhost:3000/admin/requete")
      .then(rep => {
        return rep.json();
      })
      .then(e => {
        this.items = e;
      });
  },
  methods: {
    async deleteData(id) {
      console.log("id delete data ", id)
      const response = await fetch(
        "http://localhost:3000/admin/requete/delete/" + id,
        {
          method: "DELETE"
        }
      );
      const jsonResponse = await response.json();
      console.log("response : ",jsonResponse);
    },
     async rechargerData(id) {

      const response = await fetch(
        "http://localhost:3000/admin/details/" + id
      );
   
      const jsonResponse = await response.json();
      console.log("details requete : ", jsonResponse);

      this.$emit('messageFromChild',jsonResponse[0].libelle, jsonResponse[0].req)

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
