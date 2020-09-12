    <template>
  <div id="chart" class="TimelineV2">
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
      @close="sendData(valueTab)"
    >
      <span slot="noResult">Oops! Aucun élément trouvé. Pensez à modifier la requête de recherche.</span>
    </multiselect>
    <apexchart
      type="rangeBar"
      v-if="valueTab.length"
      height="450"
      :options="chartOptions"
      :series="series"
    ></apexchart>
  </div>
</template>     
    <script>
import VueApexCharts from "vue-apexcharts";
import Multiselect from "vue-multiselect";
export default {
  components: {
    apexchart: VueApexCharts,
    Multiselect
  },

  data() {
    return {
      series: [],
      chartOptions: {
        chart: {
          height: 450,
          type: "rangeBar",
          events: {
            mouseMove: function(event, chartContext, config) {
              console.log("config", config)
            }
          }
        },
        plotOptions: {
          bar: {
            horizontal: true,
            barHeight: "80%"
          }
        },
        xaxis: {
          type: "datetime",
          min: new Date("01 Jan 2020").getTime(),
          max: new Date("27 Feb 2022").getTime()
        },
        fill: {
          type: "gradient",
          gradient: {
            shade: "light",
            type: "vertical",
            shadeIntensity: 0.25,
            gradientToColors: undefined,
            inverseColors: true,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [50, 0, 100, 100]
          }
        },
        legend: {
          position: "top",
          horizontalAlign: "left"
        }
      },
    
      options: [],
      valueTab: [],
      aux: []
    };
  },

  mounted: function() {
    fetch("http://localhost:3000/options").then(rep => {
      rep.json().then(value => {
        //console.log("options : ", value);
        this.options = value;
      });
    });
  },

  methods: {
    async sendData(valueTab) {
      if (valueTab.length >= 0) {
        let valueTableau = "";
        let sep = ",";
        for (let i = 0; i < valueTab.length; i++) {
          if (i > 0) {
            valueTableau += sep + valueTab[i].name;
          } else {
            valueTableau += valueTab[i].name;
          }
        }
        console.log(valueTableau);

        const response = await fetch(
          "http://localhost:3000/timeline3/" + valueTableau
        );

        const jsonResponse = await response.json();

        console.log("json", jsonResponse);

        this.series = [];
        this.series = jsonResponse;
      }
    }
  }
};
</script>
    
<style scoped>
.TimelineV2 {
  width: 100%;
  height: 30%;
  margin-bottom: 0%;
  margin-top: 5%;
  padding: 8px 8px;
  position: absolute;
  margin-left: 0%;
}
</style>