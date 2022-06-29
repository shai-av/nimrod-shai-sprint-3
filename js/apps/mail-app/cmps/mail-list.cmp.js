import mailPreview from "./mail-preview.cmp.js";

export default {
  props: ["mails"],
  template: `
    <section class="mail-list"  v-if="mails.length>0">
        <table>
            <thead></thead>

            <tbody>
                <tr v-for="mail in mails">
                    <mail-preview :mail="mail" />
                </tr>
            </tbody>
            
        </table>
    </section>
    <section v-else class="no-mails-msg">
      No mails to show..
    </section>
`,
  components: {
    mailPreview,
  },

  data() {
    return {};
  },
  methods: {
    select(book) {
      this.$emit("selected", book);
    },
  },
  computed: {},
  mounted(){
    console.log(this.mails);
  }
};
