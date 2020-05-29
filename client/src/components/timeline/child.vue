<template slot-scope="props" >
  <v-container class="px-0 nomApp" fluid >
<v-checkbox v-model="checkbox" :label="`Adhérence: ${checkbox.toString()}`"></v-checkbox>
            
            <div  v-if="checkbox" >
  
              <p class="text-muted">
                Date debut : 
                <span>
                  <Date class="dateeee" :dates="item.dateRow" v-on:childToParent="onChildDate" />
                </span>
              </p>
              <p class="text-muted">
                Date fin :
                <span>
                  <Date class="dateeee" :dates="item.dataFin" v-on:childToParent="onChildDateFin" />
                </span>
              </p>
              <v-text-field v-model="commentaire" label="Commentaire" solo></v-text-field>
            </div>
    
  </v-container>
</template>

<script>
import Date from "./date";
export default {
  name: "childComponent",
  props: ["TableauProps"],
  components: {
    Date
  },
  data() {
    return {
      checkbox: false,
      dateRow: "",
      dataFin: "",
  
    };
  },
  methods: {

    sendMessageToParent(values) {
      this.$emit("MessageChildToParent", values);
    },

  }
};
</script>

<style scoped>
.nomApp {
  text-align: left;
  padding-top: 2px;
}
.dateeee {
  text-align: center;
}
</style>