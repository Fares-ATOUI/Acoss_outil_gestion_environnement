<template>
  <v-form>
    <v-container>
      <v-row>
        <v-col cols="12" sm="6" md="3">
          <v-select
            v-model="acce.choix"
            @change="bdd(acce.choix)"
            :items="acces"
            attach
            label="acces"
            solo
          ></v-select>
        </v-col>

        <v-col cols="12" sm="6" md="3" v-if="hideSaturneAutremodule">
          <v-text-field
            
            v-model="acce.autre_module_saturne"
            @keyup="$emit('update',acce);"
            label="Autres Module saturne"
            solo
          ></v-text-field>
        </v-col>
        
        <v-col cols="12" sm="6" md="3" v-if="hideLogin">

          <v-text-field
            
            v-model="acce.login"
            @keyup="$emit('update',acce);"
            label="Login"
            solo
          ></v-text-field>
        </v-col>

        <v-col cols="12" sm="6" md="3" v-if="hide">

          <v-select
            v-model="acce.data"
            :items="data_bdd"
            attach
            :multiple="true"
            label="BDD"
            solo
          ></v-select>

        </v-col>

        <v-col cols="12" sm="6" md="3" v-if="hideSSHpfs">
        

          <v-select
            
            v-model="acce.plateforme"
            :items="plateforme"
            attach
            label="Plateformes"
            solo
            :multiple="true"
          ></v-select>
        </v-col>
        
        
          <v-col cols="12" sm="6" md="3" v-if="acce.choix">
            
            <v-select
              v-model="acce.utilisateurs"
              :items="values"
              attach
              label="Utilisateur"
              :multiple="true"
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
  props: ["acce", "values"],
  data() {
    return {
      disabled3: true,
      items: [],
      dataAcces: [],
      data: [],
      details: [],
      data_bdd: [],
      acces: [],
      plateforme: [
        "MEDSER",
        "POP",
        "PANCRE",
        "BANTES",
        "BANTESDMZ",
        "ATTESTATIONS",
        "RECOURS",
        "PBIPE",
        "SECHA",
        "CAP2",
        "PAREMP",
        "CFE2",
        "PREI",
        "GESAFF",
        "CONTACT",
        "CSCRIPT",
        "COTLI",
        "PISU",
        "PGTI",
        "DPAE",
        "DPAEBASE",
        "GESDSN",
        "DUEFAX-TNR",
        "ESB",
        "ESBI",
        "ESB-PARTENAIRES",
        "ESB-PNR",
        "TDDECL",
        "CPTGEN",
        "PGED",
        "GNS",
        "GNSCESU",
        "GNSPAJE",
        "GNTCESU",
        "GNTPAJE",
        "GNTv6",
        "GESIDOC",
        "RC",
        "DCL2",
        "GESTAG",
        "HARMONIE-RCP",
        "HERMES",
        "PINFO",
        "SECTECH",
        "PARTN",
        "RECHER",
        "METONA",
        "PMOSAIC",
        "PNGA",
        "NOVA2",
        "OCEAN",
        "MEDMES",
        "RAF",
        "CTRL",
        "PILOP",
        "ORGAN",
        "ORION-CLUSTER",
        "ORION-LOADER",
        "PAJE",
        "PFR",
        "PORTAG",
        "GEDOC",
        "PSID",
        "CODETA",
        "PRGCU",
        "PRGCU2",
        "GESPAR",
        "SCOT",
        "GRC",
        "KFK",
        "ENCAIS",
        "PLANIF",
        "TLDP",
        "DUEFAX-TNR",
        "V2DB",
        "PVICO",
        "PWATT",
        "PAE",
        "CNTX",
        "NET",
        "PAE2",
        "RAFRFT1",
        "RAFRFT2"
      ],
      hide: false,
      hideSaturneAutremodule: false,
      hideSSHpfs: false,
      hideWebmine: false,
      hideLogin: false
    };
  },

      mounted: function() {

      this.getAcces();
      this.getBdd();
      this.bdd(this.acce.choix)
      },
  methods: {

    getAcces(){
      fetch("http://localhost:3000/acces")
        .then(rep => {
          return rep.json();
        })
        .then(acces => {
           acces.forEach(el => {
             this.acces.push(el.name)
          })
        })
    },

     getBdd(){
      fetch("http://localhost:3000/bdd")
        .then(rep => {
          return rep.json();
        })
        .then(bdd => {
           bdd.forEach(el => {
             this.data_bdd.push(el.name)
          })
        })
    },
    bdd(val) {
      if (val == "BDD") {
        this.hide = true;
        this.hideSaturneAutremodule = false;
        this.hideSSHpfs = false;
        this.hideLogin = false;
      } else if (val == "Saturne Autre Module") {
        this.hideSaturneAutremodule = true;
        this.hideSSHpfs = false;
        this.hideLogin = false;
        this.hide = false;
      } else if (val == "Webmine" || val == "SSH PFs Hawai") {
        this.hideSSHpfs = true;
        this.hideLogin = false;
        this.hide = false;
        this.hideSaturneAutremodule = false;
      }
      else if (val == "Acces portail Harmonie") {
        this.hideLogin = true;
        this.hide = false;
        this.hideSaturneAutremodule = false;
        this.hideSSHpfs = false;
      }
     
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
  width: 100%;
  height: 30%;
  margin-bottom: 10%;
  padding: 8px 8px;
  position: absolute;
  margin-left: 0%;
}
</style>

 