<template>
    <v-row>
                <v-col cols="5">
                  <p class="text-muted">
                    Date debut :
                    <span>
                      <Date :dates.sync="item.dateDebOrg" />
                    </span>
                  </p>
                </v-col>
                <v-col cols="5">
                  <p class="text-muted">
                    Date fin :
                    <span>
                      <Date
                        :dates.sync="item.dateFinOrg"
                        :min="item.dateDebOrg"
                      />
                    </span>
                  </p>
                </v-col>
                <v-col cols="2"></v-col>
           
              </v-row>
</template>

<script>
import Date from "./date";
export default {
    props:["item","i"],
    computed:{
        getMoundir(){
           const d =  "dateDebOrg"+ this.i
           return d
        }
    },
    
     components: {
        Date
    },
     data: () => ({
        dateDeb:"",
        dateFin:""
    })
    
}
</script>