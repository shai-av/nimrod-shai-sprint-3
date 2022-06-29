import { keepsService } from "../services/keep-service.js"

export default {
    template: `
   <section class="filter">

        <textarea v-model="newNote.info.txt" placeholder="type here"></textarea>
        <button @click="addNote" type="submit">SAVE</button>
        <pre>
            {{newNote}}
        </pre>
   </section>
  `,
    data() {
        return {
            newNote: keepsService.getEmptyNote()
        }
    },

    methods: {
        addNote() {
            if (!this.newNote.info.txt) return console.log('box is empty')
            keepsService.add(this.newNote)
                .then((note) => {
                    this.newNote = keepsService.getEmptyNote()
                    this.$emit("saved", note)
                })

            // this.newNote = keepsService.getEmptyNote()
        }
    }
    ,
    computed: {
    },
};
