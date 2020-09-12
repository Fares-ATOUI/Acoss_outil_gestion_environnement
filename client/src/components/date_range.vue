<template>
  <v-container>
      
        <v-menu
          ref="menu1"
          v-model="menu1"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          max-width="290px"
          min-width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="dateRangeText"
              label="Date"
              hint="MM/DD/YYYY format"
              persistent-hint
              v-bind="attrs"
              v-on="on"
              solo
              @keyup="$emit('update:date_demo',dateRangeText)"
            ></v-text-field>
           
          </template>
          <v-date-picker  v-model="dates" range no-title >
            <v-btn text color="primary" @click="menu1 = false">Annuler</v-btn>
        <v-btn text color="primary" @click=" $refs.menu1.save(dates), $emit('update:inputData', dates)">Valider</v-btn>

          </v-date-picker>
        </v-menu>

  </v-container>

</template>
<script>
  export default {
    
    props: ["date_demo"],
    data: vm => ({
      date: new Date().toISOString().substr(0, 10),
      dateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
      menu1: false,
      menu2: false,
      dates: [],
    }),

     mounted: function() {
       this.dates = this.date_demo
      },

    computed: {
      dateRangeText () {
        return this.dates.join(' ~ ')
      },
      computedDateFormatted () {
        return this.formatDate(this.date)
      },
    },

    watch: {
      date () {
        this.dateFormatted = this.formatDate(this.date)
      },
    },

    methods: {

      emitToParent() {
        console.log(this.dates)
      let d = this.dates;
      this.$emit("childToParent", d);
    },
      formatDate (date) {
        if (!date) return null

        const [year, month, day] = date.split('-')
        return `${month}/${day}/${year}`
      },
      parseDate (date) {
        if (!date) return null

        const [month, day, year] = date.split('/')
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
      },
    },
  }
</script>
