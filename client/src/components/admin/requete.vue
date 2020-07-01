<template>
  <v-card>
    <v-textarea v-model="bio" color="teal"></v-textarea>
    <v-row>
      <v-text-field v-model="libelle" label="Libelle de la requête" required solo></v-text-field>
      <v-btn class="mr-4" large color="success" dark v-on:click="sendData">Valider</v-btn>
      <v-btn class="mr-4" large color="warning" dark v-on:click="ajout">Ajout</v-btn>
    </v-row>
    <v-row>
      <v-col cols="5">
        <pre class="language-json"><code>{{ value  }}</code></pre>
      </v-col>
      <v-col cols="7">
        <TableReq @messageFromChild="childMessageReceived" />
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import TableReq from "./table_requete.vue";
export default {
  name:"requete",
  components: {
    TableReq
    //  TablePrevision
  },
  data: () => ({
    bio: "",
    value: [],
    libelle: "",
    items: []
  }),

  mounted: function() {
    this.childMessageReceived();
  },

  methods: {
    childMessageReceived(libelle1, req1) {
      console.log("message received******** ", libelle1, req1);
      this.libelle = libelle1;
      this.bio = req1;
    },
    async ajout() {
      let option = null;
      let response = null;
      if (this.bio && this.libelle) {
        this.items.push({
          libelle: this.libelle,
          req: this.bio,
          resultat: this.value
        });
        option = {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(this.items)
        };
        response = await fetch("http://localhost:3000/requete", option);
        const jsonResponse = await response.json();
        console.log(jsonResponse);
        this.resetFields();
        alert("champs ajoutés au tableau ");
      } else {
        alert("veuillez remplir les champs ");
      }
    },
    resetFields() {
      Object.assign(this.$data, this.$options.data.call(this));
    },
    async sendData() {
      if (this.bio) {
        const response = await fetch(
          "http://localhost:3000/requete/" + this.bio
        );
        const jsonResponse = await response.json();

        console.log("json", jsonResponse);
        if (jsonResponse.length) {
          this.value = jsonResponse;
        } else {
          alert("veuillez revoir votre requete / ou requete retour vide ");
        }
      }
    }
  }
};
</script>