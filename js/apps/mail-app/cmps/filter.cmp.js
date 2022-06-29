export default {
  template: `
 <section class="filter">
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
      this.$emit("getFilter", this.filterBy);
    },
  },
  computed: {
  },
};
