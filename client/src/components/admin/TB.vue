
<template>
  <div id="app" class="TableauDeBord">
    <b-card>
      <b-card-body style="padding:0px;margin:0px;bottom: 30px; height: 70%;"></b-card-body>
    </b-card>
    <div class="card">
      <b-card-header style="margin-left:20px;margin-right:20px">
        <CButtonGroup>
          <CButton color="success" v-on:click=" showAppli()">Projets mêmes date de mep</CButton>
          <CButton color="info" v-on:click=" showVue()">projet même couloir même moment</CButton>
          <CButton color="primary" v-on:click="showVersion()">Projet Ensemble Version differente</CButton>
        </CButtonGroup>
      </b-card-header>
      <div data-v-079a3553 class="card-body">
        <div data-v-079a3553 class="row">
          <div class="col-sm">
            <Table :items="items" />
          </div>
          <div class="col-sm">
            <TableVue :items="items2" />
          </div>
          <div class="col-sm">
            <TableVersion :items="items3" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Table from "./Table";
import TableVue from "./TableVue";
import TableVersion from "./TableVersion";

export default {
  name: "TableauDeBord",
  components: {
    Table,
    TableVue,
    TableVersion
  },

  data() {
    return {
      partenaire: "",
      env: "",
      date: "",
      items: [],
      color: "border-shadow-primary",
      border: "primary",
      items2: [],
      items3: []
    };
  },


  methods: {
    showAppli() {
      fetch("http://localhost:3000/projet_mm_date_mep")
        .then(rep => {
          return rep.json();
        })
        .then(e => {
          this.items = e;
        });
    },

    showVue() {
      fetch("http://localhost:3000/projet_ensemble_mm_couloir_mm_moment")
        .then(reponse => {
          return reponse.json();
        })
        .then(e => {
          this.items2 = e;
        });
    },

    showVersion() {
      fetch(
        "http://localhost:3000/projet_ensemble_incubation_adherences_versions_differentes"
      )
        .then(reponse => {
          return reponse.json();
        })
        .then(e => {
          this.items3 = e;
        });
    }
  }
};
</script>

<style scoped>
.TableauDeBord {
  width: 100%;
  height: 30%;
  margin-bottom: 10%;
  padding: 8px 8px;
  position: absolute;
 
}
</style>