import { keepsService } from "../services/keep-service.js"
import { eventBus } from "../../../services/eventBus-service.js"
import notesList from "../cmps/list.cmp.js"
import addNote from "../cmps/add-note.js"
import notesFilter from "../cmps/filter.cmp.js"

export default {
    template: `
 <section class=" main-container main-app-container">
     <h3 class="welcome">keep app - welcome</h3>

        <div class="filter-add-note">
            <notes-filter @filtered="setFilter"></notes-filter>
            <add-note @saved="addNoteToDisplay"></add-note>
        </div>
   <!-- <notes-list :notes='this.notes' @remove="removeNote" ></notes-list> -->
   <notes-list :notes="notesToShow" @added="addNoteToDisplay" @remove="removeNote" ></notes-list>

 </section>
`,
    components: {
        notesList,
        addNote,
        notesFilter,
    },
    data() {
        return {
            notes: null,
            filterBy: null,
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
                eventBus.emit('show-msg', { txt: 'Note deleted successfully', type: 'success' });
            }).catch(err => {
                console.log(err)
                // eventBus.emit('show-msg', { txt: 'Error - try again later', type: 'error' });
            })
        },
        setFilter(filter) {
            this.filterBy = filter
            console.log(this.filterBy);
            console.log(this.notes);
        }
    },

    computed: {
        notesToShow() {
            if (!this.filterBy) return this.notes
            const regex = new RegExp(this.filterBy.title, "i");
            return this.notes.filter((note) => regex.test(note.info.title)
                && (note.type === this.filterBy.type || 'all' === this.filterBy.type))
        }
    },

    unmounted() { },
};