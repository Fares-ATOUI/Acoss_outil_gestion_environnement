<template>
<v-container fluid>

  <h1 ><strong>Formulaire de demande de création</strong></h1>
<!-------------------------------------------------INFO ACTEURS---------------------------------------------------->
<!-- <p v-if="errors.length">
    <b>Please correct the following error(s):</b>
    
     <ul>
      <li v-for="error in errors" v-bind:key="error">{{error}}</li>
    </ul>
  </p> -->

    <v-form
      ref="form"
      v-model="valid"
      :lazy-validation="lazy"
    >
  
<v-card >
  <v-row>
    <v-card-title v-on:click="isHidden = !isHidden">Informations Projets</v-card-title>
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
       name = "libelle"
      label="Libelle"
      required
      solo
    ></v-text-field>
      </v-col>
    </v-row>

  <!--       <v-row>
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
    </v-row> -->

<!--         <v-row>
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
    </v-row> -->

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

<!---------------INTERVENANT-------------------------->
<v-divider></v-divider>
  <v-card>
        <v-row>
      <v-card-title>Intervenant</v-card-title>
       <v-btn
        href=""
        target="_blank"
        text
        v-on:click="isHiddenIntervenant = !isHiddenIntervenant"
      >
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
  </v-row>
  <div v-if="!isHiddenIntervenant">
    <v-button @click="addIntervenant()" name="intervenant">
      
          <img src="https://img.icons8.com/ultraviolet/40/000000/plus.png"/>
        </v-button>
        <v-button @click="deleteIntervenant()" name="deleteIntervenant"><img src="https://img.icons8.com/ultraviolet/40/000000/minus.png"/></v-button>
         <div v-for="(intervenant, index) in intervenants" v-bind:key="index">
              <Intervenant :intervenant="intervenant" @update="intervenant=$event"/>
         </div>
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
       
       <Date @disabledToparent="deseble" :dates="dateChamps" v-on:childToParent="onChildClick" />
       <p v-if="errors.dateChamps" style="color:red;"> veuillez remplir ce champ </p>
      </v-col>
       


       
      <v-col cols="2">
        <v-subheader >Entrée en INTEGRATION</v-subheader>
      </v-col>
      <v-col cols="3">
        <Date :disabled="disabled" @disabledToparent="deseble2" :dates="dateIntegration" :min="dateChamps" v-on:childToParent="onChildDate"/>
   
        <p v-if="errors.dateIntegration" style="color:red;"> veuillez remplir ce champ </p>
      </v-col>
    </v-row>

         <v-row>
      <v-col cols="2">
        <v-subheader>Entrée en TRAIN</v-subheader>
      </v-col>
      <v-col cols="3">
       <Date :disabled="disabled2" :dates="dateTrain" :min="dateIntegration" v-on:childToParent="onChildDateMep"/>
       <p v-if="errors.dateTrain" style="color:red;"> veuillez remplir ce champ </p>
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
          <v-checkbox v-model="checkbox1" ></v-checkbox>
      </v-col>



      <v-col cols="2">
        <v-subheader>Besoin Validation</v-subheader>
      </v-col>
      <v-col cols="3">
          <v-checkbox v-model="checkbox2" ></v-checkbox>
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
    <p v-if="errors.valueTab" style="color:red;"> veuillez remplir ce champ </p>
          </v-col>
           <v-col cols="5">
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
           <v-checkbox v-model="checkbox3" ></v-checkbox>
      </v-col>
    </v-row>

    <div v-if="checkbox3 == true">
     
<!--       <v-col cols="3">
              <v-select
            v-model="code_organisation"
            :items="codeOrg"
            attach
            chips
            :label="labelCodeOrg"
            multiple
            solo
          ></v-select>
      </v-col> -->
<!--         <v-col cols="3">

<v-text-field
      v-if="code_organisation.length"
      v-model="justification"
      :rules="nameRules"
      label="Justificaiton"
      required
      solo
    ></v-text-field>

      </v-col> -->
    

    <v-row>
      <v-col cols="2">
        <v-subheader>Conteneur V2</v-subheader>
      </v-col>
      <v-col cols="3">
           <v-checkbox v-model="checkbox5" ></v-checkbox>
      </v-col>

  

      <v-col cols="2">
        <v-subheader>Batch V2</v-subheader>
      </v-col>
      <v-col cols="3">
           <v-checkbox v-model="checkbox6" ></v-checkbox>
      </v-col>
    </v-row>

     <v-row>
      <v-col cols="2">
        <v-subheader>Transaction</v-subheader>
      </v-col>
      <v-col cols="3">
           <v-checkbox v-model="checkbox7" ></v-checkbox>
      </v-col>

 
      <v-col cols="2">
        <v-subheader>Web Service</v-subheader>
      </v-col>
      <v-col cols="3">
           <v-checkbox v-model="checkbox8" ></v-checkbox>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="2">
        <v-subheader>Installation de lot fréquente</v-subheader>
      </v-col>
      <v-col cols="3">
           <v-checkbox v-model="checkbox20" ></v-checkbox>
      </v-col>

 
      <v-col cols="2">
        <v-subheader>Lancement sessions batch fréquentes</v-subheader>
      </v-col>
      <v-col cols="3">
           <v-checkbox v-model="checkbox21" ></v-checkbox>
      </v-col>
    </v-row>

 <v-row>
      <v-col cols="2">
        <v-subheader>Restauration de donnée fréquente</v-subheader>
      </v-col>
      <v-col cols="3">
           <v-checkbox v-model="checkbox22" ></v-checkbox>
      </v-col>

 
      <v-col cols="2">
        <v-subheader>Editique</v-subheader>
      </v-col>
      <v-col cols="3">
           <v-checkbox v-model="checkbox23" ></v-checkbox>
      </v-col>
    </v-row>

<v-row>
      <v-col cols="2">
        <v-subheader>Code Organisation</v-subheader>
      </v-col>
      <v-row>
      <v-col cols="5">
    <multiselect
      v-model="valueOrg"
      :options="codeOrg"
      :multiple="true"
      group-values="libs"
      group-label="couloir"
      :group-select="true"
      placeholder="Rechercher vos applications"
      track-by="name"
      label="name"

    >
      <span slot="noResult">Oops! Aucun élément trouvé. Pensez à modifier la requête de recherche.</span>
    </multiselect>
    <p v-if="errors.valueTab" style="color:red;"> veuillez remplir ce champ </p>
          </v-col>
     <v-col cols="5">
      
      <tableauCodeOrganisme v-if="valueOrg.length" :values="valueOrg" @update="valueOrg = $event"></tableauCodeOrganisme>
    </v-col>
      </v-row>
    </v-row>
    
    </div>
</v-card>
</div>
  </v-card>
<!-------------------------------------------------Données Techniques ---------------------------------------------------->
<v-divider></v-divider>
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
      <v-col cols="3">
        <v-subheader>Besoin VM Windows de test</v-subheader>
      </v-col>
      <v-col cols="3">
           <v-checkbox v-model="checkbox4"></v-checkbox>
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

    </v-row>
    <v-row>
      <v-col cols="3">
        <v-subheader>Besoin logiciel specifique</v-subheader>
      </v-col>
      <v-col cols="3">
      <v-checkbox v-model="checkbox24"></v-checkbox>
      </v-col>
      <v-col cols="3">
        <v-text-field
      v-if="checkbox24 == true"
      v-model="logicel"
      :rules="nameRules"
      label="Logiciel"
      
      solo
    ></v-text-field> 
    <p class="show"> Liste logiciels déja installés </p>
      <v-card class="list-categories">
      <v-list
        :disabled="disabled"
      >
        <v-subheader>Liste logiciels déja installés</v-subheader>
        <v-list-item-group color="primary">
          <v-list-item
            v-for="(item, i) in logiciel_vm_item"
            :key="i"
          >
            <v-list-item-content>
              <v-list-item-title v-html="item"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>

      </v-card>
      </v-col>
    </v-row>
  <!---------------------------------------------Accés------------------------------------------->
    </div>
    <v-row>
        <v-col cols="2">
        <v-subheader>ACCES</v-subheader>
      </v-col>
  <v-col cols="2">
    <v-button @click="addAcce()" name="acce"> <img src="https://img.icons8.com/ultraviolet/40/000000/plus.png"/> </v-button>
    <v-button @click="deleteAcce()" name="deleteAcce"><img src="https://img.icons8.com/ultraviolet/40/000000/minus.png"/></v-button>
  </v-col>
    </v-row> 
        <div v-for="(acce, index) in valueAccesTab" v-bind:key="index">
          <acce :acce="acce" @update="acce = $event;" v-bind:values="intervenants.map(el => el.nom_intervenant + '- ' + el.fonction)"/>
          </div>
      

</v-card>
  </div>
    <!-----------------------------------------------------TEST---------------------------------------->
    <v-divider></v-divider>
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
          
          value=""
          prefix=""
          solo
        ></v-text-field>
      </v-col>
    </v-row>
   
   <!---------------------------------------- Démo : Présentation ------------------------------------->
   <v-row>
        <v-col cols="2">
        <v-subheader>Demo</v-subheader>
      </v-col>
      <v-col cols="2">
        <v-button @click="addDemo()"  name="add">
          <img src="https://img.icons8.com/ultraviolet/40/000000/plus.png" />
        </v-button>
        <v-button @click="deleteDemo()" name="delete">
          <img src="https://img.icons8.com/ultraviolet/40/000000/minus.png" />
        </v-button>
      </v-col>
    </v-row>
    <div v-for="(demo_date, index) in valueDateDemo" v-bind:key="index">
          <DemoRow :demo_date="demo_date" @update="demo_date = $event;"  v-bind:values="valueTab.map(el => el.name)" />
          </div>
  </div>
 
   <!--    <v-row>
      <v-col cols="2">
        <v-subheader>Démo / Présentation</v-subheader>
      </v-col>
      <v-col cols="3">
           <v-checkbox v-model="checkbox9" ></v-checkbox>
      </v-col>
    </v-row>
<div v-if="checkbox9 == true">
<DemoRow  v-bind:values="valueTab.map(el => el.name)" />
   
</div>
 </div> -->
 <v-divider></v-divider>
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
           <v-checkbox v-model="checkbox10" ></v-checkbox>
      </v-col>


      <v-col cols="2">
        <v-subheader>Harmony RCP</v-subheader>
      </v-col>
      <v-col cols="3">
           <v-checkbox v-model="checkbox11" ></v-checkbox>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="2">
        <v-subheader>Harmony Web</v-subheader>
      </v-col>
      <v-col cols="3">
           <v-checkbox v-model="checkbox12" ></v-checkbox>
      </v-col>


      <v-col cols="2">
        <v-subheader>Urssaf.fr</v-subheader>
      </v-col>
      <v-col cols="3">
           <v-checkbox v-model="checkbox13" ></v-checkbox>
      </v-col>
    </v-row>
  </div>
    </v-card>
  <!---------------------------------------------------------AUTRES------------------------------------------------------------>
  <v-divider></v-divider> 
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
           <v-checkbox v-model="checkbox14" ></v-checkbox>
      </v-col>


      <v-col cols="2">
        <v-subheader>Nouvelle application Anais</v-subheader>
      </v-col>
      <v-col cols="3">
           <v-checkbox v-model="checkbox15" ></v-checkbox>
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
           <v-checkbox v-model="checkbox16" ></v-checkbox>
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
           <v-checkbox v-model="checkbox17" ></v-checkbox>
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

      <v-btn class="mr-4" large color="success" dark @click="validate" >Valider</v-btn>

  </v-card>
    </v-form>
 </v-container>

</template>

<script>
import Date from './date';
import Multiselect from "vue-multiselect";
import tableauCodeOrganisme from "./tableauCodeOrganisme"
//import tableauAcces from "./tableauAcces"
import BulletChart from "./timeline/bulletChart"
import Vue from 'vue'    
import Intervenant from "./intervenant"
import acce from "./acce"
import DemoRow from './demo_row';
var moment = require("moment");
Vue.prototype.$event = new Vue()

  export default {

  components: {
    DemoRow,
    acce,
    Intervenant,
    Date,
    tableauCodeOrganisme,
    Multiselect,
    BulletChart
  },
    data: () => ({
      disabled:true,
      disabled2:true,
      isUpdate: false,
      errors:[],
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
      isHiddenIntervenant:false,
      isHiddenAcce:false,
      
      valueOrg:[],
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

      connecteeArchimed:false,
      connecteeEsb:false,

      intervenants:[],
      
      erreurs:{},


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
      logiciel_vm:[],
      logiciel_vm_item:[],
     /*  logiciel_vm_item: [
        "Winscp",
        "Putty",
        "Alm",
        "PgAdminIII",
        "SOAPUi",
        "Winmerge",
        "Acrobate Reader",
        "SoapUI",
        "GhostScript",
        "Access Database Engine 2007",
        "Captura",
        "Harmonie C1",
        "Harmonie C2", 
        "Harmonie CLEA1", 
        "CFE multi-couloirs", 
        "CFE multi-organismes",
        "Mosaic C1",
        "Mosaic C2",
        "Portail Partenaires C1",
        "Portail Partenaires C2",
        "Pseudo portail ISU C1",
        "Pseudo portail ISU C2",
        "Pseudo Portail DCL C1", 
        "Pseudo Portail DCL C2"
      ], */

   codeOrg: 
   [
    {
            couloir: "C1",
            libs: [
            {
                name: "UR117 sx531int117x.cer31.recouv",
                code_org: "UR117",
                add_serveur: "sx531int117x.cer31.recouv",
                couloir: "C1",
                dates:[{}],
            },
            {
                name: "UR172 sx531int172x.cer31.recouv",
                code_org: "UR172",
                add_serveur: "sx531int172x.cer31.recouv",
                couloir: "C1",
                dates:[{}],
            },
            {
                name: "UR219 sx531int219x.cer31.recouv",
                code_org: "UR219",
                add_serveur: "sx531int219x.cer31.recouv",
                couloir: "C1",
                dates:[{}],
            },
            {
                name: "UR529 sx531int529x.cer31.recouv",
                code_org: "UR529",
                add_serveur: "sx531int529x.cer31.recouv",
                couloir: "C1",
                dates:[{}],
            },
            {
                name: "UR547 sx531int547x.cer31.recouv",
                code_org: "UR547",
                add_serveur: "sx531int547x.cer31.recouv",
                couloir: "C1",
                dates:[{}],
            },
            {
                name: "UR727 sx531int727x.cer31.recouv",
                code_org: "UR727",
                add_serveur: "sx531int727x.cer31.recouv",
                couloir: "C1",
                dates:[{}],
            },
            {
                name: "UR747 sx531int747x.cer31.recouv",
                code_org: "UR747",
                add_serveur: "sx531int747x.cer31.recouv",
                couloir: "C1",
                dates:[{}],
            },
            {
                name: "UR748 sx531int748x.cer31.recouv",
                code_org: "UR748",
                add_serveur: "sx531int748x.cer31.recouv",
                couloir: "C1",
                dates:[{}],
            },
            {
                name: "UR754 sx531int754x.cer31.recouv",
                code_org: "UR754",
                add_serveur: "sx531int754x.cer31.recouv",
                couloir: "C1",
                dates:[{}],
            },
            {
                name: "UR827 sx531int827x.cer31.recouv",
                code_org: "UR827",
                add_serveur: "sx531int827x.cer31.recouv",
                couloir: "C1",
                dates:[{}],
            },
            {
                name: "UR837 sx531int837x.cer31.recouv",
                code_org: "UR837",
                add_serveur: "sx531int837x.cer31.recouv",
                couloir: "C1",
                dates:[{}],
            },
            {
                name: "UR917 sx531int917x.cer31.recouv",
                code_org: "UR917",
                add_serveur: "sx531int917x.cer31.recouv",
                couloir: "C1",
                dates:[{}],
            },
            {
                name: "UR937 sx531int937x.cer31.recouv",
                code_org: "UR937",
                add_serveur: "sx531int937x.cer31.recouv",
                couloir: "C1",
                dates:[{}],
            },
            {
                name: "UR974 sx531int974x.cer31.recouv",
                code_org: "UR974",
                add_serveur: "sx531int974x.cer31.recouv",
                couloir: "C1",
                dates:[{}],
            },
            {
                name: "UR976 sx531int976x.cer31.recouv",
                code_org: "UR976",
                add_serveur: "sx531int976x.cer31.recouv",
                couloir: "C1",
                dates:[{}],
            },
        ]
    },
    {
            couloir: "C2",
                        libs: [
            {
                name: "UR117 sx531int117x.cer31.recouv",
                code_org: "UR117",
                add_serveur: "sx531int117x.cer31.recouv",
                couloir: "C2",
                dates:[{}],
            },
            {
                name: "UR172 sx531int172x.cer31.recouv",
                code_org: "UR172",
                add_serveur: "sx531int172x.cer31.recouv",
                couloir: "C2",
                dates:[{}],
            },
            {
                name: "UR219 sx531int219x.cer31.recouv",
                code_org: "UR219",
                add_serveur: "sx531int219x.cer31.recouv",
                couloir: "C2",
                dates:[{}],
            },
            {
                name: "UR529 sx531int529x.cer31.recouv",
                code_org: "UR529",
                add_serveur: "sx531int529x.cer31.recouv",
                couloir: "C2",
                dates:[{}],
            },
            {
                name: "UR547 sx531int547x.cer31.recouv",
                code_org: "UR547",
                add_serveur: "sx531int547x.cer31.recouv",
                couloir: "C2",
                dates:[{}],
            },
            {
                name: "UR727 sx531int727x.cer31.recouv",
                code_org: "UR727",
                add_serveur: "sx531int727x.cer31.recouv",
                couloir: "C2",
                dates:[{}],
            },
            {
                name: "UR747 sx531int747x.cer31.recouv",
                code_org: "UR747",
                add_serveur: "sx531int747x.cer31.recouv",
                couloir: "C2",
                dates:[{}],
            },
            {
                name: "UR748 sx531int748x.cer31.recouv",
                code_org: "UR748",
                add_serveur: "sx531int748x.cer31.recouv",
                couloir: "C2",
                dates:[{}],
            },
            {
                name: "UR754 sx531int754x.cer31.recouv",
                code_org: "UR754",
                add_serveur: "sx531int754x.cer31.recouv",
                couloir: "C2",
                dates:[{}],
            },
            {
                name: "UR827 sx531int827x.cer31.recouv",
                code_org: "UR827",
                add_serveur: "sx531int827x.cer31.recouv",
                couloir: "C2",
                dates:[{}],
            },
            {
                name: "UR837 sx531int837x.cer31.recouv",
                code_org: "UR837",
                add_serveur: "sx531int837x.cer31.recouv",
                couloir: "C2",
                dates:[{}],
            },
            {
                name: "UR917 sx531int917x.cer31.recouv",
                code_org: "UR917",
                add_serveur: "sx531int917x.cer31.recouv",
                couloir: "C2",
                dates:[{}],
            },
            {
                name: "UR937 sx531int937x.cer31.recouv",
                code_org: "UR937",
                add_serveur: "sx531int937x.cer31.recouv",
                couloir: "C2",
                dates:[{}],
            },
            {
                name: "UR974 sx531int974x.cer31.recouv",
                code_org: "UR974",
                add_serveur: "sx531int974x.cer31.recouv",
                couloir: "C2",
                dates:[{}],
            },
            {
                name: "UR976 sx531int976x.cer31.recouv",
                code_org: "UR976",
                add_serveur: "sx531int976x.cer31.recouv",
                couloir: "C2",
                dates:[{}],
            },
        ]
    },
    {
            couloir: "CLEA1",
                        libs: [
            {
                name: "UR116 sx531int116z.cer31.recouv",
                code_org: "UR116",
                add_serveur: "sx531int116z.cer31.recouv",
                couloir: "CLEA1",
                dates:[{}],
            },
            {
                name: "UR117 sx531int117z.cer31.recouv",
                code_org: "UR117",
                add_serveur: "sx531int117z.cer31.recouv",
                couloir: "CLEA1",
                dates:[{}],
            },
            {
                name: "UR172 sx531int172z.cer31.recouv",
                code_org: "UR172",
                add_serveur: "sx531int172z.cer31.recouv",
                couloir: "CLEA1",
                dates:[{}],
            },
            {
                name: "UR219 sx531int219z.cer31.recouv",
                code_org: "UR219",
                add_serveur: "sx531int219z.cer31.recouv",
                couloir: "CLEA1",
                dates:[{}],
            },
            {
                name: "UR257 sx531int257z.cer31.recouv",
                code_org: "UR257",
                add_serveur: "sx531int257z.cer31.recouv",
                couloir: "CLEA1",
                dates:[{}],
            },
            {
                name: "UR417 sx531int417z.cer31.recouv",
                code_org: "UR417",
                add_serveur: "sx531int417z.cer31.recouv",
                couloir: "CLEA1",
                dates:[{}],
            },
            {
                name: "UR427 sx531int427z.cer31.recouv",
                code_org: "UR427",
                add_serveur: "sx531int427z.cer31.recouv",
                couloir: "CLEA1",
                dates:[{}],
            },
            {
                name: "UR529 sx531int529z.cer31.recouv",
                code_org: "UR529",
                add_serveur: "sx531int529z.cer31.recouv",
                couloir: "CLEA1",
                dates:[{}],
            },
            {
                name: "UR537 sx531int537z.cer31.recouv",
                code_org: "UR537",
                add_serveur: "sx531int537z.cer31.recouv",
                couloir: "CLEA1",
                dates:[{}],
            },
            {
                name: "UR547 sx531int547z.cer31.recouv",
                code_org: "UR547",
                add_serveur: "sx531int547z.cer31.recouv",
                couloir: "CLEA1",
                dates:[{}],
            },
            {
                name: "UR727 sx531int729p.cer31.recouv",
                code_org: "UR727",
                add_serveur: "sx531int729p.cer31.recouv",
                couloir: "CLEA1",
                dates:[{}],
            },
            {
                name: "UR747 sx531int747z.cer31.recouv",
                code_org: "UR747",
                add_serveur: "sx531int747z.cer31.recouv",
                couloir: "CLEA1"
            },
            {
                name: "UR748 sx531int748z.cer31.recouv",
                code_org: "UR748",
                add_serveur: "sx531int748z.cer31.recouv",
                couloir: "CLEA1",
                dates:[{}],
            },
            {
                name: "UR754 sx531int754z.cer31.recouv",
                code_org: "UR754",
                add_serveur: "sx531int754z.cer31.recouv",
                couloir: "CLEA1",
                dates:[{}],
            },
            {
                name: "UR827 sx531int827a.cer31.recouv",
                code_org: "UR827",
                add_serveur: "sx531int827a.cer31.recouv",
                couloir: "CLEA1",
                dates:[{}],
            },
            {
                name: "UR837 sx531int839p.cer31.recouv",
                code_org: "UR837",
                add_serveur: "sx531int839p.cer31.recouv",
                couloir: "CLEA1",
                dates:[{}],
            },
            {
                name: "UR917 sx531int919p.cer31.recouv",
                code_org: "UR917",
                add_serveur: "sx531int919p.cer31.recouv",
                couloir: "CLEA1",
                dates:[{}],
            },
            {
                name: "UR937 sx531int939p.cer31.recouv",
                code_org: "UR937",
                add_serveur: "sx531int939p.cer31.recouv",
                couloir: "CLEA1",
                dates:[{}],
            },
            {
                name: "UR937 sx531int937w.cer31.recouv",
                code_org: "UR937",
                add_serveur: "sx531int937w.cer31.recouv",
                couloir: "CLEA1",
                dates:[{}],
            },
            {
                name: "UR937 sx531int939i.cer31.recouv",
                code_org: "UR937",
                add_serveur: "sx531int939i.cer31.recouv",
                couloir: "CLEA1",
                dates:[{}],
            },
            {
                name: "UR937 sx531int939j.cer31.recouv",
                code_org: "UR937",
                add_serveur: "sx531int939j.cer31.recouv",
                couloir: "CLEA1",
                dates:[{}],
            },
            {
                name: "UR974 sx531int974z.cer31.recouv",
                code_org: "UR974",
                add_serveur: "sx531int974z.cer31.recouv",
                couloir: "CLEA1",
                dates:[{}],
            },
            {
                name: "UR976 sx531int976z.cer31.recouv",
                code_org: "UR976",
                add_serveur: "sx531int976z.cer31.recouv",
                couloir: "CLEA1",
                dates:[{}],
            },
        ]
    },
   ],

      valueAccesTab:[],
      valueDateDemo:[],
      acces:[],
    /* acces: [
      {
        name:'Saturne Module SX5 ',
      },
       {
        name:'Saturne Autre Module',
      },
      {
        name:'SSH PFs Hawai',
      },
      {
        name:'SSH serveur v2',
      },
        {
        name:'Acces portail Harmonie',
      },
     {
        name:'Webmine',
      },
      {
        name:'BDD'
      },  
      ], */
      label:"veuillez selectionner les accés ",
      valid: true,
      lazy : false,


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
        checkbox20: false,
        checkbox21: false,
        checkbox22: false,
        checkbox23: false,
        checkbox24: false,
        checkbox25: false,
        checkbox26: false,
        checkbox27: false,
        checkbox28: false,
        checkbox29: false,
        checkbox30: false,
        checkbox31: false,
        checkbox32: false,

        auxx :[],
    }),

    mounted: function() {

      this.getLogiciel();
      

      this.$event.$on('parent', (data) => {
        this.valueAppTab = data
      })

     this.$event.$on('child', (data) => {
        this.valueDateFin.push(data)
        this.mergeApp(this.valueDateFin)
        
      })

       let id = this.$route.params.id
       
      if(id){
        this.isUpdate = true;
        this.recupeData(id)
      }
  },

    methods: {
    
    getLogiciel(){
      fetch("http://localhost:3000/logiciel")
        .then(rep => {
          return rep.json();
        })
        .then(logiciel => {

          logiciel.forEach(el => {
            this.logiciel_vm_item.push(el.name)
          })
          
        })
    },

    addDemo(){
      this.valueDateDemo.push({
        date_demo: [],
        checkbox: false,
        stabilite: ""
      })
    },
    deleteDemo(){
    if(this.valueDateDemo.length > 0){
      this.valueDateDemo.pop()
    }
  
    },
    addAcce() {
       //let intervenant = {}
      this.valueAccesTab.push({
        utilisateurs: [],
        plateforme: [],
        login: "",
        autre_module_saturne: "",
        data:[],
        bdd: "",
        acce_choix:"",
           
      })
    },

  deleteAcce(){
    if(this.valueAccesTab.length > 0){
      this.valueAccesTab.pop()
    }
  
    },

     addIntervenant() {
       //let intervenant = {}
      this.intervenants.push({
        nom_intervenant: "",
        prenom_intervenant: "",
        login_intervenant: "",
        entreprise_intervenant: ""
      })
    },
    deleteIntervenant(){
    if(this.intervenants.length > 1){
      this.intervenants.pop()
    }
  
    },

      deseble(x){
        this.disabled = x
      },
       deseble2(x){
        this.disabled2 = x
      },
  
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
         
       

      },

      validate () {
        this.$refs.form.validate()
        this.errors = {}
         if(!this.dateChamps) {
           Object.assign(this.errors, {'dateChamps': true })
        } 
         if(!this.dateIntegration) {
        Object.assign(this.errors, {'dateIntegration': true })
      }
          if(!this.dateTrain) {
           Object.assign(this.errors, {'dateTrain': true })
      }
        if(!this.valueTab.length) {
          Object.assign(this.errors, { 'valueTab': true })
      }
    
        if(this.$refs.form.validate() && !Object.keys(this.errors).length){ 
         console.log(this.errors)
        this.sendData()

        }else {
          console.log("no test", this.errors)
        }
      },
      reset () {
        this.$refs.form.reset()
      },
      resetValidation () {
        this.$refs.form.resetValidation()
      },

      resetFields () {
            Object.assign(this.$data, this.$options.data.call(this));
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
    },
    onChildDate (value) {
      this.dateIntegration = value
    },
    onChildDateMep(value) {
      this.dateTrain = value;
    },
    onChildDateDemo(value) {
      this.dateDemo = value;
    },

   /*  validForm:function() {
      this.errors = [];
    
      if(!this.NomProjet) {
        this.errors.push("Nom de projet requi.");
      } 
      else if(!this.NomProjet.length) {
        this.errors.push("Nom de projet requi.");        
      }

      if(!this.valueTab) {
        this.errors.push("application requise.");
      } else if(!this.valueTab.length) {
        this.errors.push("application requise.");        
      }

      if(!this.dateChamps) {
        this.errors.push("date entrée en incubation requise.");
      } else if (!this.dateChamps.length) {
        this.errors.push("date entrée en incubation requise.");        
      }
       if(!this.dateIntegration) {
        this.errors.push("date entrée en Intégration requise.");
      } else if (!this.dateIntegration.length) {
        this.errors.push("date entrée en Intégration requise.");        
      }
          if(!this.dateTrain) {
        this.errors.push("date MEP requise.");
      } else if (!this.dateTrain.length) {
        this.errors.push("date  MEP requise.");        
      }
      return this.errors.length;
    }, */




  async sendData()
  {
  //if (this.validForm()) return;

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

              intervenants:
              {
                intervenants: this.intervenants
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
                  installation_de_lot_frequente: this.checkbox20,
                  lancement_sessions_batch_frequentes: this.checkbox21,
                  restauration_de_donnee_frequente: this.checkbox22,
                  editique: this.checkbox23,
                  contenuer_v2:this.checkbox5,
                  batch_v2:this.checkbox6,
                  transaction: this.checkbox7,
                  web_service: this.checkbox8,
                  v2_details:this.valueOrg
              },

              vm: 
              {
                  vm:this.checkbox4,
                  nombre_vm: this.combien,
                  logicel_vm:this.logicel,
                  besoin_specefique: this.checkbox24
                  //logiciel_vm_tab:this.logiciel_vm
              },

              acces: 
              {
                  acces:this.valueAccesTab
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

              demo:{
                  demo:this.valueDateDemo,
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
        console.log(" send data : ",info_Acteur_Projet)
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

    this.resetFields()
    this.reset()

  },

async recupeData(id)
  {
        
        const response = await fetch(
        "http://localhost:3000/historique/details/" + id
      );
      let jsonResponse = await response.json();

          console.log("reponse : ",jsonResponse)
            let aux = jsonResponse.map(item => {
            let dataformat = moment(item.date_integration).format("YYYY-MM-DD");
            let dataformatmep = moment(item.date_mep).format("YYYY-MM-DD");
            let data_format_livraison = moment(item.date_livraison).format("YYYY-MM-DD");

            if(item.date_deb_demo){
            let date_format_deb_demo = moment(item.date_deb_demo).format("YYYY-MM-DD");
            item.date_deb_demo = date_format_deb_demo
            }
            if(item.date_fin_demo){    
            let date_format_fin_demo = moment(item.date_fin_demo).format("YYYY-MM-DD");
            item.date_fin_demo = date_format_fin_demo
            }
            
            if(item.date_demo){
            let data_format_demo = moment(item.date_demo).format("YYYY-MM-DD");
            item.date_demo = data_format_demo
            }
            if(item.date_deb){
              let date_deb_app = moment(item.date_deb).format("YYYY-MM-DD");
              item.date_deb = date_deb_app
            }
            if(item.date_fin){
              let date_fin_app = moment(item.date_fin).format("YYYY-MM-DD");
              item.date_fin = date_fin_app
            }
            item.date_integration = dataformat;
            item.date_mep = dataformatmep
            item.date_livraison = data_format_livraison;
            
            

            return item;
          });
          jsonResponse = aux;
 
      console.log("aprés parsing des dates : json Resposne : ", jsonResponse)
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

      this.justification = jsonResponse[0].justification_code_org
      this.checkbox5 = jsonResponse[0].conteneur_v2
      this.checkbox6 = jsonResponse[0].batch_v2
      this.checkbox7 = jsonResponse[0].transaction
      this.checkbox8 = jsonResponse[0].web_service
      this.checkbox20 = jsonResponse[0].instal_lot_freq
      this.checkbox21 = jsonResponse[0].lancement_session_batch_freq
      this.checkbox22 = jsonResponse[0].restauration_donnee_freq
      this.checkbox23 = jsonResponse[0].editique

      this.checkbox4 = jsonResponse[0].besoin_vm
      this.combien = jsonResponse[0].combien_vm
      this.logicel = jsonResponse[0].logiciel
      this.checkbox24 = jsonResponse[0].besoin_specefique
    

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


      let tab_app = [];
      let tab_intervenant = [];
      let tab_v2 = [];
      let tab_acce=[];
      let tab_demo=[];


      jsonResponse.forEach((el) => {

        if (tab_app.length == 0) tab_app.push(el);
    
        else { 
          let x = false;
          let i = el.nom_app;
          tab_app.forEach((ele) => {
          if (ele.nom_app == i) {
            x = true;
          }
        });
        if (!x) {
          tab_app.push(el);
        }
        }

        if (tab_v2.length == 0)  tab_v2.push(el);
  
        else { 
          let y = false;
          let i = el.add_server;
          tab_v2.forEach((elements) => {
          if (elements.add_server == i) {
            y = true;
          }
        });
        if (!y) {
          tab_v2.push(el);
        }
        }

      if (tab_intervenant.length == 0) tab_intervenant.push(el);
    
        else { 
          let x = false;
          let i = el.nom_intervenant;
          tab_intervenant.forEach((ele) => {
          if (ele.nom_intervenant == i) {
            x = true;
          }
        });
        if (!x) {
          tab_intervenant.push(el);
        }
        }

      if (tab_acce.length == 0) tab_acce.push(el);
    
        else { 
          let x = false;
          let i = el.choix;
          tab_acce.forEach((ele) => {
          if (ele.choix == i) {
            x = true;
          }
        });
        if (!x) {
          tab_acce.push(el);
        }
        }

     


      if(tab_demo.length == 0) tab_demo.push(el);
        else{
          let x = false;
          let i = el.date_deb_demo
          tab_demo.forEach(elements =>{
            if(elements.date_deb_demo == i){
              x=true;
            }
          })
          if(!x){
            tab_demo.push(el)
          }
        }
 })
   



      tab_app.forEach(element => {
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



     tab_v2.forEach(element => {
        let code_org = element.code_org
        let add_server = element.add_server
        let couloir = element.couloir
        let justification_v2 = element.justification
        let connectee_archimed = element.connectee_archimed
        let esb = element.connectee_esb
        let name = element.code_org + " " + element.add_server
        let opp = null;
  
              if( element.dates && (element.dates.includes("dateDebOrg") || element.dates.includes("dateFinOrg"))){
              let y = element.dates.replace(/\\/g,'')

              let o = y.replace(/{"{/g,'{{')
              let g =o.replace(/"}"/g,'"}')
              let j =g.replace(/"{"/g,'{"')
              let i = j.replace(/{{/,'[{')
              let k = i.replace(/}}/,'}]')


              opp = JSON.parse(k)

              }

            if(opp){
            this.valueOrg.push({
              name : name,
              code_org : code_org,
              add_serveur : add_server,
              couloir: couloir, 
              justification: justification_v2,
              archimed: connectee_archimed,
              esb : esb,
              dates: opp
            
              })
            }
            else { 
              this.valueOrg.push({
              name : name,
              code_org : code_org,
              add_serveur : add_server,
              couloir: couloir, 
              justification: justification_v2,
              archimed: connectee_archimed,
              esb : esb,
              dates:[{}]
            
              })
       
              }

      });  

     

    tab_intervenant.forEach(element => {
        let nom_intervenant = element.nom_intervenant
        let prenom_intervenant = element.prenom_intervenant
        let login_intervenant = element.login_intervenant
        let entreprise_intervenant = element.entreprise_intervenant
        let fonction_intervenant = element.fonction_intervenant
        
  
          this.intervenants.push({
            nom_intervenant : nom_intervenant,
            prenom_intervenant: prenom_intervenant, 
            login_intervenant: login_intervenant,
            entreprise_intervenant: entreprise_intervenant,
            fonction : fonction_intervenant

            })
      });



      let bdd = [];
      let plateforme = []
      let utilisateurs = []
      tab_acce.forEach(element => {
      
      if(element.bdd){
      let c = element.bdd.replace('{','')
      
      let q = c.replace('}', '')
      let w = q.replace(/"/g, '')
       if(w.includes(',')){
      let m = w.split(',')
       bdd = m
      }
      else{
         bdd.push(w)
      }  
      }
      if(element.plateforme){
      let i = element.plateforme.replace('{','')
      let j = i.replace('}', '')
      let k = j.replace(/"/g, '')
       if(k.includes(',')){
      let t = k.split(',')
       plateforme = t
 
      }
      else{
         plateforme.push(k)

      }
      } 

      if(element.utilisateur){
 
      let u = element.utilisateur.replace('{','')
      let e = u.replace('}', '')
      let h = e.replace(/"/g, '')
 
       if(h.includes(',')){
       let s = h.split(',')
       utilisateurs = s
      }
      else{
       
         utilisateurs.push(h)

      }
      } 

        let choix = element.choix
        let login = element.login
        let autre_module_saturne = element.autre_module_saturne
  
        
  
        this.valueAccesTab.push({
        utilisateurs: utilisateurs,
        plateforme: plateforme,
        login: login,
        autre_module_saturne: autre_module_saturne,
        data:bdd,
        choix:choix

          })
    });

    
      
      tab_demo.forEach(element => {
        let date_demo = []
        let stabilite = []
        //let stabilite = element.stabilite_demande
        let stabilite_demande = element.stabilite_demande
        let date_deb_demo = element.date_deb_demo
        let date_fin_demo = element.date_fin_demo
        date_demo.push(date_deb_demo)
        date_demo.push(date_fin_demo)

        
          if(element.stabilite){      
          let c = element.stabilite.replace('{','')
          let q = c.replace('}', '')
          let w = q.replace(/"/g, '')

          if(w.includes(',')){
          let m = w.split(',')
          stabilite = m

          }
          else{
     
            if(!stabilite.includes(w)){
            stabilite.push(w)
            }
          }  
          }

      
        this.valueDateDemo.push({
          checkbox: stabilite_demande, 
          date_demo:date_demo,
          stabilite: stabilite

          })
  
          
        }); 

        
    
      
 },
       
    }
   
    }
</script>
<style scoped>
.show:hover ~ .list-categories{
  max-height: inherit;
  opacity: 1;
  z-index: 2;
}

.list-categories{
  position: absolute;
  list-style-type: none;
  padding: 0px;
  margin: 0px;
  max-height: 0px;
  opacity: 0;
  overflow: hidden;
  transition: opacity 300ms ease;
}
</style>