export default {
  template: `
 <section class="top-filter">
    <input type="text" v-model="filterBy.str" @input="filter" placeholder="Search"/>
 </section>
`,
  data() {
    return {
      filterBy: {
        str: "",
      },
    };
  },
  methods: {
    filter() {
      this.$emit("getFilter", this.filterBy.str);
    },
  },
  computed: {
  },
};
