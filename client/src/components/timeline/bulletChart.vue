<template>
  <CDataTable
    :items="values"
    :fields="fields"
    column-filter
    table-filter
    items-per-page-select
    hover
    sorter
    pagination
    @keyup="$emit('update',values);"
  >
    <template #show_details="{item, index}">
      <td class="py-2">
        <CButton
          color="primary"
          variant="outline"
          square
          size="sm"
          @click="toggleDetails(index)"
        >{{details.includes(index) ? 'Masquer' : 'Afficher'}}</CButton>
      </td>
    </template>

    <template #details="{item, index}">
      <CCollapse :show="details.includes(index)">
        <CCardBody>
          <CMedia :aside-image-props="{ height: 102 }">
            <v-checkbox v-model="item.checkbox" :key="index" :label="`Adhérence`"></v-checkbox>

            <div v-if="item.checkbox">
              <p class="text-muted">
                Date debut :
                <span>
                  <Date
                    class="dateeee"
                    :dates.sync="item.dateDeb"
                    :key="index"
                    
                  />
                </span>
              </p>
              <p class="text-muted">
                Date fin :
                <span>
                  <Date
                    class="dateeee"
                    :dates.sync="item.date"
                    :key="index"
                    :min="item.dateDeb"
                    
                  />
                </span>
              </p>
              <v-text-field v-model="item.commentaire_app" :key="index" label="Commentaire" solo></v-text-field>
            </div>
          </CMedia>
        </CCardBody>
      </CCollapse>
    </template>
  </CDataTable>
</template>

<script>
const fields = [
  { key: "domaine", _style: "width:40%" },
  { key: "name", _style: "width:40%;" },
  {
    key: "show_details",
    label: "Adhérence",
    _style: "width:1%",
    sorter: false,
    filter: false
  }
];

import Date from "../date";

export default {
  components: {
    Date
  },
  name: "tables",
  props: ["values"],
  data() {
    return {
      disabled3:true,
      items: [],
      fields,
      details: []

    };
  },

  methods: {
/*     deseble3(x){
      this.disabled3 = x
    }, */
    onChildDate(value) {
      this.values[this.details[0]]["dateDeb"] = value;
      console.log(this.values[this.details[0]].dateDeb);
    },

    onChildDateFin(values) {
      this.values[this.details[0]]["date"] = values;

      console.log("mamadpo ", this.values[this.details[0]].date);
    },

    getStatus(val) {
      return val == 1
        ? "En Incubation"
        : val == 0
        ? "Avant Incubation"
        : val == -1
        ? "Sorti d'Incubation"
        : " ";
    },

    getBadge(status) {
      console.log(status);
      return status == 1
        ? "success"
        : status == 0
        ? "warning"
        : status == -1
        ? "danger"
        : "primary";
    },
    toggleDetails(index) {
      const position = this.details.indexOf(index);
      position !== -1
        ? this.details.splice(position, 1)
        : this.details.push(index);
    }
  }
};
</script>

<style scoped>
.TableVue {
  width: 90%;
  height: 30%;
  margin-bottom: 10%;
  padding: 8px 8px;
  position: absolute;
  margin-left: 20%;
}
</style>