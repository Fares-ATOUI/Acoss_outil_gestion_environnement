    <template>
  <div id="chart" class="Timeline">
    <apexchart type="rangeBar" height="350" :options="chartOptions" :series="series"></apexchart>
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
          height: 350,
          type: "rangeBar"
        },
        plotOptions: {
          bar: {
            horizontal: true
          }
        },
        xaxis: {
          type: "datetime",

          min: new Date("01 Jan 2020").getTime(),
          max: new Date("27 Feb 2022").getTime()
        }
      }
    };
  },

  mounted: function() {
    fetch("http://localhost:3000/timeline").then(rep => {
      rep.json().then(value => {
        this.series = [
          {
            data: value
          }
        ];
      });
    });
  }
};
</script>
    
<style scoped>
.Timeline {
  width: 100%;
  height: 30%;
  margin-bottom: 10%;
  padding: 8px 8px;
  position: absolute;
 
}
</style>