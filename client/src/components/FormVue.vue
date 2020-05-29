<template>
<v-container fluid>

  <h1 ><strong>Formulaire de demande de création</strong></h1>
<!-------------------------------------------------INFO ACTEURS---------------------------------------------------->
<v-card >
  <v-row>
    <v-card-title v-on:click="isHidden = !isHidden">Information Acteurs Projets</v-card-title>
    <v-btn
        href=""
        target="_blank"
        text
        v-on:click="isHidden = !isHidden"
      >
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
      
  </v-row>

<div v-if="!isHidden">
    <v-row>
      <v-col cols="2">
        <v-subheader>Nom du PROJET</v-subheader>
      </v-col>
      <v-col cols="3">
        <v-text-field
      v-model="NomProjet"
      :rules="nameRules"
      label="Nom Projet"
      required
      solo
    ></v-text-field>
      </v-col>



      <v-col cols="2">
        <v-subheader>Libelle</v-subheader>
      </v-col>
      <v-col cols="3">
    <v-text-field
      v-model="libelle"
      :rules="nameRules"
      label="Libelle"
      required
      solo
    ></v-text-field>
      </v-col>
    </v-row>

        <v-row>
      <v-col cols="2">
        <v-subheader>CP Technique </v-subheader>
      </v-col>
      <v-col cols="3">
<v-text-field
      v-model="CpTechnique"
      :rules="nameRules"
      label="Chef de Projet Technique"
      required
      solo
    ></v-text-field>
      </v-col>

      <v-col cols="2">
        <v-subheader>CP Fonctionnel</v-subheader>
      </v-col>
      <v-col cols="3">
<v-text-field
      v-model="CpFonctionnel"
      :rules="nameRules"
      label="Chef de Projet Fonctionnel"
      required
      solo
    ></v-text-field>
      </v-col>
    </v-row>

        <v-row>
      <v-col cols="2">
        <v-subheader>Email</v-subheader>
      </v-col>
      <v-col cols="3">
        <v-text-field
        v-model="email"
      :rules="emailRules"
          label="Email address"
          value=""
          suffix="@acoss.fr"
          solo
        ></v-text-field>
      </v-col>
    </v-row>

  <v-row>
      <v-col cols="2">
        <v-subheader>JH Conception</v-subheader>
      </v-col>
      <v-col cols="3">
        <v-text-field
          v-model="JHConception"
          label="Jours Hommes Conception"
          value=""
          type="number"
          suffix="JH"
          min="1"
          solo
        ></v-text-field>
      </v-col>



      <v-col cols="2">
        <v-subheader>JH Developpement</v-subheader>
      </v-col>
      <v-col cols="3">
        <v-text-field
          v-model="JHDev"
          label="Jours Hommes de Développement"
          value=""
          type="number"
          suffix="JH"
          min="1"
          solo
        ></v-text-field>
      </v-col>
    </v-row>

          <v-row>
      <v-col cols="2">
        <v-subheader>JH Integration</v-subheader>
      </v-col>
      <v-col cols="3">
        <v-text-field
          v-model="JHIntegration"
          label="JH Integration"
          value=""
          type="number"
          suffix="JH"
          min="1"
          solo
        ></v-text-field>
      </v-col>



      <v-col cols="2">
        <v-subheader>JH Recette</v-subheader>
      </v-col>
      <v-col cols="3">
        <v-text-field
         v-model="JHR7"
          label="JH Recette"
          value=""
          type="number"
          suffix="JH"
          min="1"
          solo
        ></v-text-field>
      </v-col>
    </v-row>

          <v-row>
      <v-col cols="2">
        <v-subheader>Total JH</v-subheader>
      </v-col>
      <v-col cols="3">
        <v-text-field
        v-model="TotalJH"
          label="Total JH"
          :value="getTotalTaxes()"
          type="number"
          suffix="JH"
          readonly=""
          min="1"
          solo
        ></v-text-field>
      </v-col>
    </v-row>
    </div>
</v-card>

<!-------------------------------------------------____DATES___---------------------------------------------------->
<v-divider></v-divider>

  <v-card>
    <v-row>
      <v-card-title>Dates</v-card-title>
       <v-btn
        href=""
        target="_blank"
        text
        v-on:click="isHiddenDate = !isHiddenDate"
      >
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
  </v-row>

<div v-if="!isHiddenDate">
  
        <v-row>
      <v-col cols="2">
        <v-subheader>Entrée en INCUBATION</v-subheader>
      </v-col>
      <v-col cols="3">
       
       <Date :dates="dateChamps" v-on:childToParent="onChildClick"/>
      </v-col>

       
      <v-col cols="2">
        <v-subheader>Entrée en INTEGRATION</v-subheader>
      </v-col>
      <v-col cols="3">
        <Date :dates="dateIntegration" v-on:childToParent="onChildDate"/>
      </v-col>
    </v-row>

         <v-row>
      <v-col cols="2">
        <v-subheader>Entrée en TRAIN</v-subheader>
      </v-col>
      <v-col cols="3">
       <Date :dates="dateTrain" v-on:childToParent="onChildDateMep"/>
      </v-col>
      
  
          
      <v-col cols="2">
        <v-subheader>Echéance</v-subheader>
      </v-col>
      <v-col cols="3">
          <v-select
          v-model="selectedItems"
          :items="items"
          label="veuillez choisir une échéance "
          solo
        ></v-select>
      </v-col>
    </v-row>
</div>
  </v-card>

  <v-divider></v-divider>

<!-------------------------------------------------BASCULE : VALIDATION ---------------------------------------------------->
  <v-card>

<v-row>
      <v-card-title>Besoin Bascule - Validation</v-card-title>
       <v-btn
        href=""
        target="_blank"
        text
        v-on:click="isHiddenBascule = !isHiddenBascule"
      >
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
  </v-row>
<div v-if="!isHiddenBascule">
     <v-row>
      <v-col cols="2">
        <v-subheader>Besoin Bascule</v-subheader>
      </v-col>
      <v-col cols="3">
          <v-checkbox v-model="checkbox1" :label="`Oui / Non `"></v-checkbox>
      </v-col>



      <v-col cols="2">
        <v-subheader>Besoin Validation</v-subheader>
      </v-col>
      <v-col cols="3">
          <v-checkbox v-model="checkbox2" :label="`Oui / Non `"></v-checkbox>
      </v-col>
    </v-row>
</div>
  </v-card>

  <!-------------------------------------------------Dépendances : Adhérences ------------------------------------------------->
 <v-divider></v-divider>
<v-card>
 
  <v-row>
<v-card-title>Dépendances / Adhérences</v-card-title>

<v-btn
        href=""
        target="_blank"
        text
        v-on:click="isHiddenDependances = !isHiddenDependances"
      >
        <v-icon>mdi-arrow-up-bold-box-outline</v-icon>
      </v-btn>
    
  </v-row>
<div v-if="!isHiddenDependances">

<v-card>

     <!--<v-row>
    <v-col cols="2">
        <v-subheader>Technique / Fonctionnel</v-subheader>
      </v-col>
     <v-row>
      <v-col cols="5">
           <v-autocomplete
          v-model="valueApp"
          :items="itemsDependance"
          item-text="name"
          v-bind:item-value="valueee"
          dense
          chips
          small-chips
          label="Ajouter une dépendance/adhérence"
          multiple
          solo
        ></v-autocomplete>
      </v-col>
       <v-col cols="5">
        <Tableau v-if="valueApp.length" :values="valueApp"></Tableau>
      </v-col>
     </v-row>
       </v-row>
-->
            <v-row>
    <v-col cols="2">
        <v-subheader>Technique / Fonctionnel</v-subheader>
      </v-col>
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
           <v-col cols="5">
      <!-- <Tableau2 v-if="valueTab.length" :values="valueTab"></Tableau2> -->
      <BulletChart v-if="valueTab.length" :values="valueTab" @update="valueTab = $event"></BulletChart>
    </v-col>

      </v-row>
       </v-row>
       
     <!-- <SelecterAuto :items="itemsDependance" ></SelecterAuto> -->
     
</v-card>
<!------------------------------------------------------------ V2 ----------------------------------------------------------->

<v-card>
  <v-row>
      <v-col cols="2">
        <v-subheader>V2</v-subheader>
      </v-col>
      <v-col cols="3">
           <v-checkbox v-model="checkbox3" :label="`Oui / Non `"></v-checkbox>
      </v-col>
    </v-row>

    <div v-if="checkbox3 == true">
     <v-row>
      <v-col cols="2">
        <v-subheader>Code Organisation</v-subheader>
      </v-col>
      <v-col cols="3">
              <v-select
            v-model="code_organisation"
            :items="codeOrg"
            attach
            chips
            :label="labelCodeOrg"
            multiple
            solo
          ></v-select>
      </v-col>
        <v-col cols="3">

<v-text-field
      v-if="code_organisation.length"
      v-model="justification"
      :rules="nameRules"
      label="Justificaiton"
      required
      solo
    ></v-text-field>

      </v-col>
    </v-row>
    <v-row>
      <v-col cols="2">
        <v-subheader>Conteneur V2</v-subheader>
      </v-col>
      <v-col cols="3">
           <v-checkbox v-model="checkbox5" :label="`Oui / Non :`"></v-checkbox>
      </v-col>

  

      <v-col cols="2">
        <v-subheader>Batch V2</v-subheader>
      </v-col>
      <v-col cols="3">
           <v-checkbox v-model="checkbox6" :label="`Oui / Non `"></v-checkbox>
      </v-col>
    </v-row>

     <v-row>
      <v-col cols="2">
        <v-subheader>Transaction</v-subheader>
      </v-col>
      <v-col cols="3">
           <v-checkbox v-model="checkbox7" :label="`Oui / Non `"></v-checkbox>
      </v-col>

 

      <v-col cols="2">
        <v-subheader>Web Service</v-subheader>
      </v-col>
      <v-col cols="3">
           <v-checkbox v-model="checkbox8" :label="`Oui / Non `"></v-checkbox>
      </v-col>
    </v-row>
    </div>
</v-card>
</div>
  </v-card>
<!-------------------------------------------------Données Techniques ---------------------------------------------------->
  <v-card>

<v-row>
    <v-card-title v-on:click="isHiddenDonnéesTechnique = !isHiddenDonnéesTechnique">Données Techniques</v-card-title>
    <v-btn
        href=""
        target="_blank"
        text
        v-on:click="isHiddenDonnéesTechnique = !isHiddenDonnéesTechnique"
      >
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
  </v-row>
  <!---------------------------------------VM--------------------------------------------->
  <div v-if="!isHiddenDonnéesTechnique">
<v-card>
  <v-row>
      <v-col cols="2">
        <v-subheader>VM</v-subheader>
      </v-col>
      <v-col cols="3">
           <v-checkbox v-model="checkbox4" :label="`Oui / Non `"></v-checkbox>
      </v-col>
    </v-row>
    <div v-if="checkbox4 == true">
     <v-row>
      <v-col cols="2">
        <v-subheader>Combien</v-subheader>
      </v-col>
      <v-col cols="3">
        <v-text-field
        
        v-model="combien"
          label="Total "
          value=""
          type="number"
          suffix=""
          min="1"
          solo
        ></v-text-field>
      </v-col>
        <v-col cols="3">
      <v-text-field
      v-if="combien.length"
      v-model="logicel"
      :rules="nameRules"
      label="Logiciel"
      solo
    ></v-text-field>
      </v-col>

    </v-row>
  <!---------------------------------------------Accés------------------------------------------->
    </div>
         <v-row>
     <v-col cols="2">
        <v-subheader>Accés</v-subheader>
      </v-col>
      <v-col cols="3">
          <v-select
            v-model="valueAcces"
            :items="acces"
            attach
            chips
            :label="label"
            multiple
            solo
          ></v-select>
       
      </v-col>
       </v-row>
     
</v-card>
  </div>
    <!-----------------------------------------------------TEST---------------------------------------->
<v-row>
    <v-card-title v-on:click="isHiddenTest = !isHiddenTest">Test</v-card-title>
    <v-btn
        href=""
        target="_blank"
        text
        v-on:click="isHiddenTest = !isHiddenTest"
      >
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
  </v-row>
  <div v-if="!isHiddenTest">
<v-row>
      <v-col cols="2">
        <v-subheader>Nom MOE</v-subheader>
      </v-col>
      <v-col cols="3">
        <v-text-field
         v-model="moe"
          label="Nom MOE"
          :rules="nameRules"
          value=""
          prefix=""
          solo
        ></v-text-field>
      </v-col>



      <v-col cols="2">
        <v-subheader>Nom MOA</v-subheader>
      </v-col>
      <v-col cols="3">
        <v-text-field
         v-model="moa"
          label="Nom MOA"
          :rules="nameRules"
          value=""
          prefix=""
          solo
        ></v-text-field>
      </v-col>
    </v-row>

<v-row>
      <v-col cols="2">
        <v-subheader>Nom MUE</v-subheader>
      </v-col>
      <v-col cols="3">
        <v-text-field
         v-model="mue"
          label="Nom MUE"
          :rules="nameRules"
          value=""
          prefix=""
          solo
        ></v-text-field>
      </v-col>



      <v-col cols="2">
        <v-subheader>Support SDIT</v-subheader>
      </v-col>
      <v-col cols="3">
        <v-text-field
         v-model="supportSDIT"
          label="Nom responsable SDIT"
          :rules="nameRules"
          value=""
          prefix=""
          solo
        ></v-text-field>
      </v-col>
    </v-row>
   <!---------------------------------------- Démo : Présentation ------------------------------------->
      <v-row>
      <v-col cols="2">
        <v-subheader>Démo / Présentation</v-subheader>
      </v-col>
      <v-col cols="3">
           <v-checkbox v-model="checkbox9" :label="`Oui / Non `"></v-checkbox>
      </v-col>
    </v-row>
    <div v-if="checkbox9 == true">
   <v-row>
      <v-col cols="2">
        <v-subheader>Date Démo</v-subheader>
      </v-col>
    
       <v-col cols="8" > 
         <Date v-if="checkbox9 == true" :dates="dateDemo"  v-on:childToParent="onChildDateDemo"/>
      </v-col>
        
    </v-row>
</div>
 </div>

 <!-----------Portail concernés ---------->
<v-card>
  <v-row>
    <v-card-title v-on:click="isHiddenPortail = !isHiddenPortail">Portail Concernés</v-card-title>
    <v-btn
        href=""
        target="_blank"
        text
        v-on:click="isHiddenPortail = !isHiddenPortail"
      >
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
  </v-row>
  <div v-if="!isHiddenPortail">

 <v-row>
      <v-col cols="2">
        <v-subheader>Pora</v-subheader>
      </v-col>
      <v-col cols="3">
           <v-checkbox v-model="checkbox10" :label="`Oui / Non `"></v-checkbox>
      </v-col>


      <v-col cols="2">
        <v-subheader>Harmony RCP</v-subheader>
      </v-col>
      <v-col cols="3">
           <v-checkbox v-model="checkbox11" :label="`Oui / Non `"></v-checkbox>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="2">
        <v-subheader>Harmony Web</v-subheader>
      </v-col>
      <v-col cols="3">
           <v-checkbox v-model="checkbox12" :label="`Oui / Non `"></v-checkbox>
      </v-col>


      <v-col cols="2">
        <v-subheader>Urssaf.fr</v-subheader>
      </v-col>
      <v-col cols="3">
           <v-checkbox v-model="checkbox13" :label="`Oui / Non `"></v-checkbox>
      </v-col>
    </v-row>
  </div>
    </v-card>
  <!---------------------------------------------------------AUTRES------------------------------------------------------------>
    <v-card>
      <v-row>
    <v-card-title v-on:click="isHiddenAutre = !isHiddenAutre">Autres</v-card-title>
    <v-btn
        href=""
        target="_blank"
        text
        v-on:click="isHiddenAutre = !isHiddenAutre"
      >
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
  </v-row>
  <div v-if="!isHiddenAutre">



  

<v-row>
      <v-col cols="2">
        <v-subheader>Accrochage Avec partenaire</v-subheader>
      </v-col>
      <v-col cols="3">
           <v-checkbox v-model="checkbox14" :label="`Oui / Non  `"></v-checkbox>
      </v-col>


      <v-col cols="2">
        <v-subheader>Nouvelle application Anais</v-subheader>
      </v-col>
      <v-col cols="3">
           <v-checkbox v-model="checkbox15" :label="`Oui / Non `"></v-checkbox>
      </v-col>

    <div v-if="checkbox15 == true">
 <v-col cols="12">
      <v-text-field
      v-model="nomApplcationAnais"
      :rules="nameRules"
      label="Nom application"
      solo
    ></v-text-field>
      </v-col>
    </div>
 </v-row>

     <v-row>
      <v-col cols="2">
        <v-subheader>Nouvelle gris de droit</v-subheader>
      </v-col>
      <v-col cols="3">
           <v-checkbox v-model="checkbox16" :label="`Oui / Non `"></v-checkbox>
      </v-col>
   
    <div v-if="checkbox16 == true">
  
    <v-col cols="10">
      <v-text-field
        v-model="grisDeDroit"
        :rules="nameRules"
        label="Nom application"
        solo
      ></v-text-field>
      </v-col>
    
    </div>



      <v-col cols="2">
        <v-subheader>Jeux de données spécifique</v-subheader>
      </v-col>
      <v-col cols="3">
           <v-checkbox v-model="checkbox17" :label="`Flux Entrant / Flux Sortant `"></v-checkbox>
      </v-col>
   
    <div v-if="checkbox17 == true">
  
       <v-col cols="10">
         <v-text-field
      v-model="commentaire"
      :rules="nameRules"
      label="Commentaire"
      solo
    ></v-text-field>
      </v-col>
</div>
 </v-row>
 </div>
    </v-card>

      <v-btn large color="success" dark @click="sendData" >Valider</v-btn>

  </v-card>
 </v-container>

</template>

<script>
import Date from './date';
import Multiselect from "vue-multiselect";
//import Tableau2 from "./Tableau2"
import BulletChart from "./timeline/bulletChart"
import Vue from 'vue'    
var moment = require("moment");
Vue.prototype.$event = new Vue()

  export default {

  components: {
    Date,
    //Tableau2,
    Multiselect,
    BulletChart
  },
    data: () => ({
      isUpdate: false,

      valueApp: [],
      valueee: null,
      valueAppTab: [],
      valueDateFin:[],

      isHidden: false,
      isHiddenDate: false,
      isHiddenBascule: false,
      isHiddenDependances: false,
      isHiddenTest:false,
      isHiddenDonnéesTechnique:false,
      isHiddenPortail:false,
      isHiddenAutre:false,

      name: '',
      libelle:"",
      CpTechnique:'',
      CpFonctionnel:'',
      NomProjet:'',
      JHConception: 0,
      JHIntegration:0,
      JHDev: 0,
      JHR7:0,
      TotalJH:0,
      combien:0,
      logicel:"",
      justification:"",
      mue:"",
      moa:"",
      moe:"",
      supportSDIT:"",
      commentaire:"",
      nomApplcationAnais:"",
      grisDeDroit:"",
      aux : [],
      dates:"",
      values:"",
      dateChamps:"",
      dateIntegration:"",
      dateTrain:"",
      dateDemo:"",
      code_organisation:[],
      valueAcces:[],
      selectedItems:[],
      valuesDepAdh:[],
      dataAdherence:"",

      nameRules: [
        v => !!v || 'veillez remplir le champ',
        v => (v && v.length <= 50) || 'champ doit etre inferieur a 50 caract',
      ],
      email: '',
      emailRules: [
        v => !!v || 'veillez remplir votre email',
        v => /.+@.+\..+/.test(v) || 'E-mail doit etre valide',
      ],
      select: null,

      items: [
        'Court terme',
        'Moyen terme',
        'Long terme',
      ],

      codeOrg: [
        'UT837',
        'UR837',
        'UR838'
      ],
      labelCodeOrg:"veuillez selectionner un code org",
      acces: [
        'Saturne',
        'Webmine',
        'SQL/Postgresql',
        'Base'
      ],
      label:"veuillez selectionner les accés ",

      itemsDependance:  [
          
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
            },
            {
              name: "ANCRE",
              domaine: "Référentiel"
            },
            {
              name: "RPA",
              domaine: "Référentiel"
            },
            {
              name: "ADELAIDE",
              domaine: "Editique"
            },
            {
              name: "PRODOCS",
              domaine: "Editique"
            },
            {
              name: "CESU",
              domaine: "CESU/PAJE"
            },
            {
              name: "PAJE",
              domaine: "CESU/PAJE"
            },
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
            },
            {
              name: "TELEDEP",
              domaine: "TELEDEP"
            },
            {
              name: "IMAGE (et client CIME)",
              domaine: "IMAGE"
            },
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
            },
            {
              name: "OPC",
              domaine: "CONTROLE"
            },
            {
              name: "ORC",
              domaine: "CONTROLE"
            },
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
      ],
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
        valueTab: [],

      lableTechnique:"Veuillez selectionner les applications Techniques",

        hide:true,
        checkbox: false,
       checkbox1: false,
        checkbox2: false,
        checkbox3:false,
        checkbox4: false,
        checkbox5: false,
        checkbox6: false,
        checkbox7: false,
        checkbox8: false,
        checkbox9: false,
        checkbox10: false,
        checkbox11: false,
        checkbox12: false,
        checkbox13: false,
        checkbox14: false,
        checkbox15: false,
        checkbox16: false,
        checkbox17: false,
        checkbox18: false,
        checkbox19: false,
    }),

    mounted: function() {
      console.log("this.values",this.values)
      this.$event.$on('parent', (data) => {
        this.valueAppTab = data
      })

     this.$event.$on('child', (data) => {
        this.valueDateFin.push(data)
        console.log("child ",this.valueDateFin)
        console.log("valueTab ", this.valueTab)
        this.mergeApp(this.valueDateFin)
        
      })



       //console.log('route', this.$route.params);
       let id = this.$route.params.id
       
      if(id){
        this.isUpdate = true;
        this.recupeData(id)
      }
  },




    methods: {
      mergeApp(valueAppMerge){

         let datamerge = []
           valueAppMerge.forEach(item => {
             this.valueTab.forEach(el => {
               
               if(el.name == item.name && item.check == true){
                 const data1 = {
                   ...el, 
                   ...item
                 }
                datamerge.push(data1)
               }
                 
            }) 
          });
          console.log( datamerge,"ok")
          
          //this.items = aux;
       

      },


      validate () {
        this.$refs.form.validate()
      },
      reset () {
        this.$refs.form.reset()
      },
      resetValidation () {
        this.$refs.form.resetValidation()
      },

      getTotalTaxes() {
            let calTaxTotal =
                parseInt(this.JHConception) +
                parseInt(this.JHIntegration) +
                parseInt(this.JHDev) +
                parseInt(this.JHR7);

            this.TotalJH = calTaxTotal;

            return calTaxTotal;
        },

    onChildClick (value) {
      this.dateChamps = value
      console.log("dateCHamps ",value)
    },
    onChildDate (value) {
      this.dateIntegration = value
      console.log("dateIntegration ",value)
    },
    /* onChildSelecterClick (value) {
      this.code_organisation = value;
    }, */
    onChildDateMep(value) {
      this.dateTrain = value;
      console.log("dateTrain ",value)
    },
    onChildDateDemo(value) {
      this.dateDemo = value;
    },


async sendData()
 {
   
  console.log("valuesTab", this.valueTab)

     let  info_Acteur_Projet = 

        [
          { 
            info :
              {

                  nom_Projet : this.NomProjet,
                  libel: this.libelle,
                  chef_projet_tech: this.CpTechnique,
                  chef_projet_fonctionnel: this.CpFonctionnel,
                  email: this.email,
                  jour_homme_conception: this.JHConception,
                  jour_homme_developpement: this.JHDev,
                  jour_homme_integration: this.JHIntegration,
                  jour_homme_recette: this.JHR7,
                  jour_homme_total: this.TotalJH,
              },

               dates :
              {
                  date_incubation : this.dateChamps,
                  date_integration: this.dateIntegration,
                  date_mep: this.dateTrain,
                  echeances: this.selectedItems,
              },
          

          
              bascule_validation :
              {
                  besoin_bascule : this.checkbox1,
                  besoin_validation: this.checkbox2,
        
              },

              dependance_adherence:
              {
                  technique:this.valueTab,
              },

              v2 :
              {
                  v2 : this.checkbox3,
                  code_organisation: this.code_organisation,
                  justificaiton: this.justification,
                  contenuer_v2:this.checkbox5,
                  batch_v2:this.checkbox6,
                  transaction: this.checkbox7,
                  web_service: this.checkbox8,
              },

              vm: 
              {
                  vm:this.checkbox4,
                  nombre_vm: this.combien,
                  logicel_vm:this.logicel
              },

              acces: 
              {
                  acces:this.valueAcces
              },

              test:
              {
                  nom_moa: this.moa,
                  nom_moe:this.moe,
                  nom_mue:this.mue,
                  support_sdit:this.supportSDIT,
                  demo_presentation: this.checkbox9,
                  date_demo:this.dateDemo
              },

              portail:
              {
                  pora:this.checkbox10,
                  harmony_rcp:this.checkbox11,
                  harmony_web:this.checkbox12,
                  urssaf_fr:this.checkbox13,
             },
              autres:
              {
                  accrochage_avec_partenaire:this.checkbox14,
                  nouvelle_application_anais:this.checkbox15,
                  application_anais:this.nomApplcationAnais,
                  nouvelle_gris_de_droit:this.checkbox16,
                  application_gris_droit:this.grisDeDroit,
                  flux_entrant_sortant: this.checkbox17,
                  commentaire_flux:this.commentaire
              }
          }
        ]
        let option = null;
        let response = null;
        if(!this.isUpdate){
          
        option = {
         method: 'POST',
         headers: {
          'Content-Type': 'application/json'
        },
         body: JSON.stringify(info_Acteur_Projet)
       }
       response = await fetch('http://localhost:3000/data' ,option)
        }
        else {
          
          option = {
         method: 'PUT',
         headers: {
          'Content-Type': 'application/json'
        },
         body: JSON.stringify(info_Acteur_Projet)
       }
       
       response = await fetch('http://localhost:3000/data?id=' + this.$route.params.id ,option)
        }

      const jsonResponse = await response.json()
      console.log(jsonResponse)

      this.NomProjet = ""
      this.libelle = ""
      this.CpTechnique = ""
      this.CpFonctionnel  = ""
      this.email = ""
      this.JHConception = 0
      this.JHDev = 0
      this.JHIntegration = 0
      this.JHR7 = 0
      this.TotalJH = 0

      this.dateChamps = ""
      this.dateIntegration = ""
      this.dateTrain = ""
      this.selectedItems = []

      this.checkbox1 = false
      this.checkbox2 = false

      this.checkbox10 = false
      this.checkbox11 = false
      this.checkbox12 = false
      this.checkbox13 = false

      this.checkbox3 = false
      this.code_organisation = []
      this.justification = ""
      this.checkbox5 = false
      this.checkbox6 = false
      this.checkbox7 = false
      this.checkbox8 = false

      this.checkbox4 = false
      this.combien = 0
      this.logicel = ""

      this.valueAcces = []

      this.moa = ""
      this.moe = ""
      this.mue = ""
      this.supportSDIT = ""
      this.checkbox9 = false
      this.dateDemo = ""

      this.checkbox14 = false
      this.checkbox15 = false
      this.nomApplcationAnais = ""
      this.checkbox16 = false
      this.grisDeDroit = ""
      this.checkbox17 = false
      this.commentaire = ""

      this.valueTab = []



  },

async recupeData(id)
  {
        const response = await fetch(
        "http://localhost:3000/historique/details/" + id
      );
      let jsonResponse = await response.json();


            let aux = jsonResponse.map(item => {
            let dataformat = moment(item.date_integration).format("YYYY-MM-DD");
            let dataformatmep = moment(item.date_mep).format("YYYY-MM-DD");
            let data_format_livraison = moment(item.date_livraison).format("YYYY-MM-DD");
            let data_format_demo = moment(item.date_demo).format("YYYY-MM-DD");
            let date_deb_app = moment(item.date_deb).format("YYYY-MM-DD");
            let date_fin_app = moment(item.date_fin).format("YYYY-MM-DD");
            
            item.date_integration = dataformat;
            item.date_mep = dataformatmep
            item.date_livraison = data_format_livraison;
            item.date_demo = data_format_demo
            item.date_deb = date_deb_app
            item.date_fin = date_fin_app
           

            return item;
          });
          jsonResponse = aux;
 

      this.NomProjet = jsonResponse[0].code_projet
      this.libelle = jsonResponse[0].libelle
      this.CpTechnique = jsonResponse[0].cp_technique
      this.CpFonctionnel  = jsonResponse[0].cp_fonctionnel
      this.email = jsonResponse[0].email
      this.JHConception = jsonResponse[0].jh_concept
      this.JHDev = jsonResponse[0].jh_dev
      this.JHIntegration = jsonResponse[0].jh_integration
      this.JHR7 = jsonResponse[0].jh_recette
      this.TotalJH = jsonResponse[0].jh_total
      this.selectedItems = jsonResponse[0].echeance

      this.checkbox1 = jsonResponse[0].besoin_bascule
      this.checkbox2 = jsonResponse[0].besoin_validation

      this.checkbox10 = jsonResponse[0].portail_pora
      this.checkbox11 = jsonResponse[0].portail_harmony_rcp
      this.checkbox12 = jsonResponse[0].portail_harmony_web
      this.checkbox13 = jsonResponse[0].portail_urssaf

      this.checkbox3 = jsonResponse[0].v2
      //code_org
      let y = jsonResponse[0].code_organisation.replace('{','')
      let x = y.replace('}', '')
      let n = x.replace(/"/g, '')

      if(n.includes(',')){
      let t = n.split(',')
      this.code_organisation = t
      }else{
        this.code_organisation = n
      }
      
      
      this.justification = jsonResponse[0].justification_code_org
      this.checkbox5 = jsonResponse[0].conteneur_v2
      this.checkbox6 = jsonResponse[0].batch_v2
      this.checkbox7 = jsonResponse[0].transaction
      this.checkbox8 = jsonResponse[0].web_service

      this.checkbox4 = jsonResponse[0].besoin_vm
      this.combien = jsonResponse[0].combien_vm
      this.logicel = jsonResponse[0].logiciel

      //acces
      let z = jsonResponse[0].acces.replace('{','')
      let a = z.replace('}', '')
      let b = a.replace(/"/g, '')

      if(b.includes(',')){
      let p = b.split(',')

      this.valueAcces = p
    
      }else{
        this.valueAcces = b
      }

      this.moa = jsonResponse[0].test_nom_moa
      this.moe = jsonResponse[0].test_nom_moe
      this.mue = jsonResponse[0].test_nom_mue
      this.supportSDIT = jsonResponse[0].test_responsable_sdit
      this.checkbox9 = jsonResponse[0].besoin_demo_presentation
      this.dateDemo = jsonResponse[0].date_demo

      this.dateChamps = jsonResponse[0].date_livraison
      this.dateIntegration = jsonResponse[0].date_integration
      this.dateTrain = jsonResponse[0].date_mep

      this.checkbox14 = jsonResponse[0].accrochage_partenaire
      this.checkbox15 = jsonResponse[0].nouvelle_application_anais
      this.nomApplcationAnais = jsonResponse[0].nom_applicaiton_anais
      this.checkbox16 = jsonResponse[0].nouvelle_gris_droit
      this.grisDeDroit = jsonResponse[0].nom_application_gris
      this.checkbox17 = jsonResponse[0].jeux_de_donnes
      this.commentaire = jsonResponse[0].commentaire

      jsonResponse.forEach(element => {
        let nom = element.nom_app
        let domaine1 = element.domaine
        let commentaire_app = element.commentaire_app
        let date_deb = element.date_deb
        let date_fin = element.date_fin
        let adherence = element.adherence
        
  
      this.valueTab.push({
        name : nom,
        domaine: domaine1, 
        commentaire_app: commentaire_app,
        dateDeb: date_deb,
        date : date_fin,
        checkbox : adherence

        })
      });
    
      
 },
       
    }
   
    }
</script>
