import { keepsService } from "../services/keep-service.js"

export default {
    template: `
   <section >
       <input v-if="isTodoNote" v-model="newTodoNote.info.label" type="text" placeholder="healine">
        <input v-if="isTodoNote" v-model="newTodoNote.info.todos[0].txt" type="text" placeholder="add todo">
        <textarea v-if="!isTodoNote" v-model="newTxtNote.info.txt" placeholder="add text note"></textarea>
        <button @click="todoFormat">Todo/Text</button>
        <button @click="addNote" type="submit">SAVE</button>
        <!-- <pre>
            {{newTodoNote}}
        </pre> -->
   </section>
  `,
    data() {
        return {
            newTxtNote: keepsService.getEmptyTxtNote(),
            newTodoNote: keepsService.getEmptyTodoNote(),
            isTodoNote: false
        }
    },

    methods: {
        addNote() {
            if (!this.newTxtNote.info.txt && !this.newTodoNote.info.label
                && !this.newTodoNote.info.todos[0].txt) return console.log('box is empty')
            if (this.isTodoNote) {
                keepsService.add(this.newTodoNote)
                    .then((note) => {
                        this.newTxtNote = keepsService.getEmptyTxtNote()
                        this.$emit("saved", note)
                    })
            } else {
                keepsService.add(this.newTxtNote)
                    .then((note) => {
                        this.newTxtNote = keepsService.getEmptyTxtNote()
                        this.$emit("saved", note)
                    })
            }
        },
        todoFormat() {
            this.isTodoNote = !this.isTodoNote
        }
    }
    ,
    computed: {
    },
};
