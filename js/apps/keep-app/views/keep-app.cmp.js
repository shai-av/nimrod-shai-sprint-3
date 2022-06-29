import { keepsService } from "../services/keep-service.js"
import notesList from "../cmps/list.cmp.js"
import addNote from "../cmps/add-note.js"

export default {
    template: `
 <section class=" main-container ">
   <h3>keep app - welcome</h3>
    <add-note></add-note>
   <notes-list :notes='this.notes'></notes-list>
 </section>
`,
    components: {
        notesList,
        addNote
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