import noteTxt from './dynamic-cmp/txt-cmp.js'
import noteImg from './dynamic-cmp/img-cmp.js'
import noteTodos from './dynamic-cmp/todos-cmp.js'
import noteVideo from './dynamic-cmp/video-cmp.js'
import editNote from './edit-note.js'
import { keepsService } from "../services/keep-service.js"

export default {
    props: ["notes"],
    template: `
    <section class="notes-list">
        <ul>
            <li class="note-card" v-for="note in notes">
                <component :is="note.type"  
                        :info="note.info"  :note="note"
                       >
                    </component>
                    <br>
                    <button @click="remove(note)">X</button>
                    <edit-note :note='note' @edit="saveChangesNote"></edit-note>
            </li>
        </ul>
      
        </section>
    `,
    components: {
        noteTxt,
        noteImg,
        noteTodos,
        noteVideo,
        editNote
    },

    data() {
        return {};
    },
    methods: {
        remove(note) {
            this.$emit('remove', note.id)
        },
        saveChangesNote(note, txt) {
            if (note.type === 'note-txt') note.info.txt = txt
            if (note.type === 'note-img') note.info.title = txt
            if (note.type === 'note-todos') {

                note.info.todos[0].txt = txt
            }


            keepsService.edit(note)
        }
    },
}
