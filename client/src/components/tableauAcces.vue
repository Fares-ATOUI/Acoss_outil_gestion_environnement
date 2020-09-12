<template>
  <CDataTable
    :items="values"
    :fields="fields"
    column-filter
    table-filter
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
            
            <!-- <v-checkbox v-model="item.cbatch" :key="index" :label="`Lancement sessions batch fréquente`"></v-checkbox> -->
            <v-select
              v-model="item.justification"
              :items="dataAcces"
              attach
              chips
              label="Justification"
              solo
            ></v-select>
 
             <v-checkbox v-model="item.archimed" :label="`Connectée Archimed`"></v-checkbox>
            <v-checkbox v-model="item.esb" :label="`Connectée ESB`"></v-checkbox>
            <!--<v-checkbox v-model="item.crestauration" :key="index" :label="`Editique`"></v-checkbox>-->
            <v-row>
            
            </v-row>
            <div v-for="(dateInput, dateIndex) in item.dates" v-bind:key="dateIndex">
              <v-row>

           
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
  { key: "name", _style: "width:40%" },

  {
    key: "show_details",
    label: "Adhérence",
    _style: "width:1%",
    sorter: false,
    filter: false
  }
];


export default {


  name: "tables",
  props: ["values", "valueAcces"],
  data() {
    return {
      disabled3: true,
      items: [],
      dataAcces:[],
      fields,
      details: [],
     acces: [
        'Saturne Module SX5 ',
        'Saturne Autre Module',
        'SSH PFs Hawai',
        'SSH serveur v2',
        'Acces portail Harmonie',
        'Webmine',
        'BDD'
      ],
    };
  },

    mounted: function() {
        
            let aux = this.valueAcces.map(item => {
                if(item.nom_intervenant && item.fonction){
            let nom_complet = item.nom_intervenant.concat(", ").concat(item.fonction)

            item.nom_intervenant_complet = nom_complet;
                }
            return item;
          });


          this.valueAcces = aux;

          this.valueAcces.forEach(element => {
              if(element.nom_intervenant_complet) this.dataAcces.push(element.nom_intervenant_complet)
          })
              
    },
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