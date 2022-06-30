export default {
  template: `
 <section class="mail-top-filter">
  <span class="logo-helper">Mi⭐Mail</span>
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
