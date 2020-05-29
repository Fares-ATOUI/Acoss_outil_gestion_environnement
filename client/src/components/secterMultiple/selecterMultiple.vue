    <template>
    
  <div>
      <v-row>
          <v-col cols="5">
    <multiselect
      v-model="valueTab"
      :options="options"
      :multiple="true"
      group-values="libs"
      group-label="domaine"
      :group-select="true"
      placeholder="Rechercher vos applications"
      track-by="name"
      label="name"
    >
      <span slot="noResult">Oops! Aucun élément trouvé. Pensez à modifier la requête de recherche.</span>
    </multiselect>
          </v-col>
    <v-col cols="7">
      <Tableau v-if="valueTab.length" :values="valueTab"></Tableau>
    </v-col>
      </v-row>
    <!--  <pre class="language-json"><code>{{ valueTab  }}</code></pre>-->
  </div>
          
      

</template>   

<script>
import Multiselect from "vue-multiselect";
import Tableau from "../Tableau2.vue"
export default {
  components: {
    Multiselect,
    Tableau
  },
  data() {
    return {
      options: [
        {
          domaine: "Technique",
          libs: [
            {
              name: "ARCHIMED",
              domaine: "Technique"
            },
            {
              name: "KAFKA",
              domaine: "Technique"
            },
            {
              name: "SID",
              domaine: "Technique"
            },
            {
              name: "ESB",
              domaine: "Technique"
            },
            {
              name: "GNS",
              domaine: "Technique"
            },
            {
              name: "GNT",
              domaine: "Technique"
            }
          ]
        },
        {
          domaine: "Referentiel",
          libs: [
            {
              name: "ANCRE",
              domaine: "Référentiel"
            },
            {
              name: "RPA",
              domaine: "Référentiel"
            }
          ]
        },
        {
          domaine: "Poste de Travail",
          libs: [
            {
              name: "WATT",
              domaine: "Poste de Travail"
            },
            {
              name: "ODEA",
              domaine: "Poste de Travail"
            },
            {
              name: "IODA",
              domaine: "Poste de Travail"
            },
            {
              name: "OPUS",
              domaine: "Poste de Travail"
            },
            {
              name: "SCRIBE",
              domaine: "Poste de Travail"
            }
          ]
        },
        {
          domaine: "Editique",
          libs: [
            {
              name: "ADELAIDE",
              domaine: "Editique"
            },
            {
              name: "PRODOCS",
              domaine: "Editique"
            }
          ]
        },
        {
          domaine: "CESU/PAJE",
          libs: [
            {
              name: "CESU",
              domaine: "CESU/PAJE"
            },
            {
              name: "PAJE",
              domaine: "CESU/PAJE"
            }
          ]
        },
        {
          domaine: "TELEDEP",
          libs: [
            {
              name: "TELEDEP",
              domaine: "TELEDEP"
            }
          ]
        },
        {
          domaine: "IMAGE",
          libs: [
            {
              name: "IMAGE (et client CIME)",
              domaine: "IMAGE"
            }
          ]
        },
        {
          domaine: "RAF",
          libs: [
            {
              name: "RAF GRS",
              domaine: "RAF"
            },
            {
              name: "ODP",
              domaine: "RAF"
            },
            {
              name: "OPTIM DELAI",
              domaine: "RAF"
            }
          ]
        },
        {
          domaine: "CONTROLE",
          libs: [
            {
              name: "OPC",
              domaine: "CONTROLE"
            },
            {
              name: "ORC",
              domaine: "CONTROLE"
            }
          ]
        },
        {
          domaine: "COMPTABILITE",
          libs: [
            {
              name: "SPE",
              domaine: "COMPTABILITE"
            },
            {
              name: "SCOT",
              domaine: "COMPTABILITE"
            },
            {
              name: "PCN",
              domaine: "COMPTABILITE"
            }
          ]
        }
      ],
      valueTab: []
    };
  }
};
</script>