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
            <li :style="cardStyle"  class="note-card" v-for="note in notes">
            <!-- <li :style="cardStyle"   v-for="note in notes"> -->
                <!-- style="background-color:note.style.backroundColor" -->

                <component :is="note.type" class="dynamic-content "  
                        :info="note.info"  :note="note"
                       >
                    </component>
                    <br>
                    <div class="tools-section flex justify-center align-center">
                        <button v-if="!editMode" @click="remove(note)">X</button>
                        <edit-note :note='note'  @edit="saveChangesNote" @startEdit="hideComponents"></edit-note>
                
                        <button v-if="!editMode" @click="startDuplicate(note)">duplicate note</button>
                            <input v-if="!editMode" type="color"  name="txt-color" value="#ff9190" @input="setNoteColor">
                    </div>
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
        return {
            cardColor: 'rgb(253, 227, 226)',
            editMode: null
        };
    },
    methods: {
        hideComponents(flag) {
            console.log('flag', flag);
            this.editMode = 1
        },
        remove(note) {
            this.$emit('remove', note.id)
        },
        saveChangesNote(note, txt) {

            if (note.type === 'note-txt') note.info.txt = txt
            if (note.type === 'note-img') note.info.title = txt
            if (note.type === 'note-todos') note.info.todos[0].txt = txt
            if (note.type === 'note-video') note.info.title = txt

            keepsService.edit(note)
            this.editMode = 0
        },
        startDuplicate(note) {
            keepsService.add(note)
            this.$emit("added", note)
        },
        setNoteColor(ev) {
            console.log(ev.target.value)
            this.cardColor = ev.target.value
            // console.log(this.notes);

        }
    },
    computed: {
        cardStyle() {
            return {
                backgroundColor: this.cardColor,
            }
        }
    },
}
