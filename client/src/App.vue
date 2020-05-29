<template>
  <v-app>
    <v-app-bar
      app
      color="blue"
      dark
      dense
    >
      <div class="d-flex align-center">

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://upload.wikimedia.org/wikipedia/commons/0/0a/Logo_acoss.png"
          width="100"
        />
        
      </div>

         <template v-slot:extension>
        <v-tabs d-flex align-center>
          <v-tab href="/form">Formulaire</v-tab>
          <v-tab href="/timeline" >Timeline</v-tab>
          <v-tab href="/timeline2">Timeline 2</v-tab>
          <v-tab href="/timeline3">Timeline 3</v-tab>
          <v-tab href="/Historique">Historique</v-tab>
          <v-tab href="/admin">Admin</v-tab>
        </v-tabs>
      </template>
      
   

      <v-spacer></v-spacer>
      

      <v-btn
        href=""
        target="_blank"
        text
      >
        <span class="mr-2">Acoss</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
        
    </v-app-bar>
     <v-content>
      <!-- <FormVue/> -->
     
       <div class="main">
      <router-view></router-view>
    </div>
    </v-content>
  </v-app>
</template>

<script>

//import FormVue from './components/FormVue';
//import SideBar from './components/barline/Sidebar'
export default {
  name: 'App',
  

  components: {
  //  SideBar
  },

  data: () => ({
    //
  }),
};
</script>
