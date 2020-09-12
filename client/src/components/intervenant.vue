<template>
  <v-form>
    <v-container>
      <v-row>
        <v-col cols="12" sm="6" md="2">
          <v-text-field
            v-model="intervenant.nom_intervenant"
            @keyup="$emit('update',intervenant);"
            
            label="Nom"
            solo
          ></v-text-field>
        </v-col>

        <v-col cols="12" sm="6" md="2">
          <v-text-field
            v-model="intervenant.prenom_intervenant"
            @keyup="$emit('update',intervenant);"
         
            label="Prénom"
            solo
          ></v-text-field>
        </v-col>

        <v-col cols="12" sm="6" md="2">
          <v-text-field
            v-model="intervenant.login_intervenant"
            @keyup="$emit('update',intervenant);"
            label="Login"
            solo
          ></v-text-field>
        </v-col>

        <v-col cols="12" sm="6" md="2">
          <v-text-field
            label="Entreprise"
            v-model="intervenant.entreprise_intervenant"
            @keyup="$emit('update',intervenant);"
            solo
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="3">
        <v-select
            v-model="intervenant.fonction"
            :items="fonction"
            attach
            label="fonction"
            solo
          ></v-select>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
export default {
  name: "tables",
  props: ["intervenant"],
  data() {
    return {
      disabled3: true,
      items: [],
      details: [],
      fonction: []
    };
  },
   mounted: function() {

      this.getFonction();
      },
  methods: {

    getFonction(){
      fetch("http://localhost:3000/fonction")
        .then(rep => {
          return rep.json();
        })
        .then(fonction => {

          fonction.forEach(el => {
            this.fonction.push(el.name)
          })
          
        })
    },
    addIntervenant(intervenant) {
      if (!intervenant) {
        intervenant = [];
      }
      intervenant.push({
        nom_intervenant: intervenant.nom_intervenant
        /* prenom_intervenant: intervenant.prenom_intervenant,
        login_intervenant: intervenant.login_intervenant,
        entreprise_intervenant: intervenant.entreprise_intervenant */
      });
    },

    addDate(index, item) {
      if (!item.dates) {
        item.dates = [];
      }
      item.dates.push({
        dateDebOrg: item.dateDebOrg,
        dateFinOrg: item.dateFinOrg
      });
    },
    deleteDate(index, item) {
      item.dates.pop();
    },

    getDateDebOrg(dateDebOrg, i) {
      return "dateDebOrg" + i;
    },
    onChildDate(value) {
      this.values[this.details[0]]["dateDebOrg"] = value;
    },

    onChildDateFin(values) {
      this.values[this.details[0]]["dateFinOrg"] = values;
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

 