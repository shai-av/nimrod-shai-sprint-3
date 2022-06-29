import { keepsService } from "../services/keep-service.js"
import notesList from "../cmps/list.cmp.js"

export default {
    template: `
 <section class=" main-container ">
   <h3>keep app - welcome</h3>
   <notes-list :notes='this.notes'></notes-list>
 </section>
`,
    components: {
        notesList
    },
    data() {
        return {
            notes: null
        };
    },

    created() {
        keepsService.query().then(notes => this.notes = notes)
    },

    methods: {},

    computed: {},

    unmounted() { },
};