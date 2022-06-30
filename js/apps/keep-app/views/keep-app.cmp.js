import { keepsService } from "../services/keep-service.js"
import notesList from "../cmps/list.cmp.js"
import addNote from "../cmps/add-note.js"

export default {
    template: `
 <section class=" main-container ">
   <h3>keep app - welcome</h3>
    <add-note @saved="addNoteToDisplay"></add-note>
   <notes-list :notes='this.notes' @remove="removeNote" ></notes-list>
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

    methods: {
        addNoteToDisplay(note) {
            console.log('note', note);
            this.notes.push(note)
        },
        removeNote(noteId) {
            keepsService.remove(noteId).then(() => {
                console.log('Deleted successfully')
                const idx = this.notes.findIndex((note) => note.id === noteId)
                this.notes.splice(idx, 1);
                eventBus.emit('show-msg', { txt: 'Deleted successfully', type: 'success' });
            }).catch(err => {
                console.log(err)
                // eventBus.emit('show-msg', { txt: 'Error - try again later', type: 'error' });
            })
        },
    },

    computed: {},

    unmounted() { },
};