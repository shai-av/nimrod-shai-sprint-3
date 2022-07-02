export default {
  template: `
   <section class="notes-filter">
      <input type="text" v-model="filterBy.title" @input="filter" placeholder="filter by title">
      <br>
      <label for="">Filter by type</label>
      <select class="pointer" @input="filter" v-model="filterBy.type">
            <option disabled value=""></option>
            <option>all</option>
            <option>note-txt</option>
            <option>note-todos</option>
            <option>note-img</option>
            <option>note-video</option>
        </select>
   </section>
  
  `,
  data() {
    return {
      filterBy: {
        title: "",
        type: ''
      },
    };
  },
  // created() {
  //   this.filterBy.price = 100
  // },
  methods: {
    filter() {
      this.$emit("filtered", this.filterBy);
    },
  },
}