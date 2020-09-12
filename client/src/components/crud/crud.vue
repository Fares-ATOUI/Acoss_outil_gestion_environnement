<template>
<div id="chart" class="CRUD">
          <v-select
          v-model="selectedItems"
          :items="values"
          label="veuillez choisir une échéance "
          solo
          @change="sendOption(selectedItems)"
        ></v-select>

  <v-data-table v-if="selectedItems.length" :headers="headers" :items="data" sort-by="name" class="elevation-1">
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>{{selectedItems}}</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">Nouvelle element</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.name" label="Nom"></v-text-field>
                  </v-col>
                   <v-col cols="12" sm="6" md="4">
                    <v-text-field v-if="!isHidden" v-model="editedItem.domaine" label="Domaine"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-if="!isHidden" v-model="editedItem.codeOrg" label="Code Organisme"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-if="!isHidden" v-model="editedItem.AdresseServeur" label="Adresse Serveur"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-if="!isHidden" v-model="editedItem.Couloir" label="Couloir"></v-text-field>
                  </v-col>  
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="insertItem(selectedItems, editedItem)">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
      
    </template>
    <template v-slot:item.actions="{ item }">
      <!-- <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon> -->
      <v-icon small @click="deleteItem(selectedItems,item)">mdi-delete</v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">Reset</v-btn>
    </template>
  </v-data-table>
  </div>
</template>

<script>

export default {

  data: () => ({
    values:["plateform","logiciel","bdd","fonction","v2","acces","application"],
    selectedItems:"",
    dialog: false,
    headers: [
      {
        text: "Nom",
        align: "start",
        sortable: false,
        value: "name"
      },
      { text: "  ", value: "" },
      { text: "  ", value: "" },
      { text: "  ", value: "" },
      { text: "  ", value: "" }, 
      { text: "Actions", value: "actions", sortable: false }
    ],
    isHidden:false,
    desserts: [],
    data:[],
    editedIndex: -1,
    editedItem: {
      name: "",
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0
    },
    defaultItem: {
      name: "",
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0
    }
  }),

/*    mounted: function() {
      this.getdata()
  }, */

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Nouvelle element" : "Edit Item";
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  created() {
    this.initialize();
  },

  methods: {

    sendOption(opt) {

      if(opt =='v2'){
         fetch("http://localhost:3000/v2" )
        .then(rep => {
          return rep.json();
        })
        .then(e => {
          this.data = []
          console.log("eee v2", e)
           e.forEach(el => {
            this.data.push({
              name: el.name,
              })
        });
        });
       }else {
   
      fetch("http://localhost:3000/crud/" + opt)
        .then(rep => {
          return rep.json();
        })
        .then(e => {

           this.data = []
        e.forEach(el => {
            this.data.push({
              name: el.name})
        });
        });

       }

    },


    initialize() {
      this.desserts = [
        {
          name: "Frozen Yogurt",
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0
        },
        {
          name: "Ice cream sandwich",
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3
        },
        {
          name: "Eclair",
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0
        },
        {
          name: "Cupcake",
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3
        },
        {
          name: "Gingerbread",
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9
        },
        {
          name: "Jelly bean",
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0
        },
        {
          name: "Lollipop",
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0
        },
        {
          name: "Honeycomb",
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5
        },
        {
          name: "Donut",
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9
        },
        {
          name: "KitKat",
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7
        }
      ];
    },

  /*   editItem(item) {
      this.editedIndex = this.data.indexOf(item);
      console.log("item : ", item)
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
      
    }, */

    deleteItem(selectedItems, item) {
      console.log("ddddd ", selectedItems)
      const index = this.data.indexOf(item);
      confirm("Are you sure you want to delete this item?") && this.deleteData(selectedItems, this.data[index].name) && this.data.splice(index, 1);
    },



    async deleteData( selectedItems, name) {
      
      let option = null;
      let response = null;
      console.log("entrée deleteData ")
        option = {
         method: 'DELETE',
         headers: {
          'Content-Type': 'application/json'
        },
         body: JSON.stringify({ "selectedItem":selectedItems, "name": name })
       }
       
       response = await fetch('http://localhost:3000/delete' , option)
       const jsonResponse = await response.json()
       console.log(jsonResponse)
      
    },

     
    
    async insertItem(selectedItems, item){
      if(item.name.length){
      let option = null;
        let response = null;
      
        option = {
         method: 'POST',
         headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "selectedItem":selectedItems, "name": item })
       }
       
       response = await fetch('http://localhost:3000/insertCrud' , option)
       const jsonResponse = await response.json()
       console.log(jsonResponse)
       this.data.push(this.editedItem);
       this.close()

   
      
      }else{
        confirm("veuillez remplir le champ ")
      }

    },
    



    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.data[this.editedIndex], this.editedItem);
      } else {
        this.data.push(this.editedItem);

      }
      this.close();
    }
  }
};
</script>