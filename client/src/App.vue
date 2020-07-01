<template>
  <v-app>
    <!--
    <v-app-bar
      app
      color="blue"
      dark
      dense
    >
      <div class="d-flex align-center">

        <v-img alt="Vuetify Name" class="shrink mt-1 hidden-sm-and-down" contain  min-width="100" src="https://upload.wikimedia.org/wikipedia/commons/0/0a/Logo_acoss.png"
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
          <v-tab href="/chart">chart</v-tab>
           <v-tab href="/tableau">tableau</v-tab>
        </v-tabs>
      </template>   
    </v-app-bar>

    -->
    <v-content>
      <template>
        <b-navbar toggleable="md" type="dark" class="nav-background">
          <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

          <b-navbar-brand href="#">
            <img
              href="/Form"
              class="shrink mt-1 hidden-sm-and-down"
              contain
              min-width="100"
              src="https://upload.wikimedia.org/wikipedia/commons/0/0a/Logo_acoss.png"
              width="100"
              alt
            />
          </b-navbar-brand>

          <b-collapse is-nav id="nav_collapse">
            <b-navbar>
              <b-navbar-nav>
                <b-nav-item-dropdown text="Environnement" right>
                  <b-dropdown-item-button disabled>Supervision</b-dropdown-item-button>
                  <b-dropdown-item href="/Form">Formulaire</b-dropdown-item>
                  <b-dropdown-divider />
                  <b-dropdown-item-button disabled>Timelines</b-dropdown-item-button>
                  <b-dropdown-item href="/Timeline">vue projet</b-dropdown-item>
                  <b-dropdown-item href="/Timeline2">vue application</b-dropdown-item>
                  <b-dropdown-item href="/Timeline3">vue application 2</b-dropdown-item>
                </b-nav-item-dropdown>

                <b-nav-item-dropdown text="Mise en production" right>
                  <b-dropdown-item-button disabled>Information General</b-dropdown-item-button>
                  <b-dropdown-item href="/admin">Administration</b-dropdown-item>
                  <b-dropdown-item href="/historique">Historique</b-dropdown-item>
                </b-nav-item-dropdown>
              </b-navbar-nav>

              <b-navbar-nav>
                <b-nav-item-dropdown text="Administration" left>
                  <b-dropdown-item-button disabled>Projets en incubation</b-dropdown-item-button>
                  <b-dropdown-item href="/projet/couloir">Projets même couloir et même moment</b-dropdown-item>
                  <b-dropdown-item href="/projet/version">Projets Ensemble, versions differentes</b-dropdown-item>
                  <b-dropdown-item href="/projet/mep">Projets même date de mep</b-dropdown-item>
                  <b-dropdown-divider />
                  <b-dropdown-item-button disabled>Coordination</b-dropdown-item-button>
                  <b-dropdown-item href="/prevision">Prévision</b-dropdown-item>
                  <b-dropdown-item href="/tableau">Projets Incubation</b-dropdown-item>
                  <b-dropdown-divider />
                  <b-dropdown-item-button disabled>chart</b-dropdown-item-button>
                  <b-dropdown-item href="/chart">Projets en incubation par couloir</b-dropdown-item>
                </b-nav-item-dropdown>
                <!--         <b-nav-item  >Administration</b-nav-item>
        <b-nav-item  >statistique</b-nav-item>
                <b-nav-item  >Visual management</b-nav-item>-->
              </b-navbar-nav>
            </b-navbar>
          </b-collapse>
        </b-navbar>
      </template>

      <div class="main">
        <router-view></router-view>
      </div>
    </v-content>
  </v-app>
</template>


<script>
export default {
  name: "App",

  data: () => ({
    //
  })
};
</script>
<style scoped>
.nav-background {
  background: #2288ee;
}
</style>