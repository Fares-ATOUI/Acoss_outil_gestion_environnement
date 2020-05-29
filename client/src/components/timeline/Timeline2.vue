    <template>
  <div id="chart" class="TimelineV2">
    <apexchart type="rangeBar" height="450" :options="chartOptions" :series="series"></apexchart>
  </div>

</template>     
    <script>
import VueApexCharts from "vue-apexcharts";
export default {
  components: {
    apexchart: VueApexCharts
  },

  data() {
    return {
      series: [],
      chartOptions: {
        chart: {
          height: 450,
          type: "rangeBar"
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
      }
    };
  },

  mounted: function() {
    fetch("http://localhost:3000/timeline2").then(rep => {
      rep.json().then(value => {
        this.series = value
      });
    });
  }
};
</script>
    
<style scoped>
.TimelineV2 {
  width: 100%;
  height: 30%;
  margin-bottom: 0%;
  padding: 8px 8px;
  position: absolute;
  margin-left: 0%;
}
</style>