import { keepsService } from "../services/keep-service.js"

export default {
    template: `
   <section >
    <!-- todo -->
       <input v-if="isTodoNote" v-model="newTodoNote.info.label" type="text" placeholder="healine">
        <input v-if="isTodoNote" v-model="newTodoNote.info.todos[0].txt" type="text" placeholder="add todo">
    <!-- txt -->
        <textarea v-if="isTxtNote" v-model="newTxtNote.info.txt" placeholder="add text note"></textarea>
    <!-- img -->
        <input v-if="isImgNote" v-model="newImgNote.info.title" type="text" placeholder="enter img title">
<!-- video -->
        <input v-if="isVideoNote" v-model="newVideoNote.info.title" type="text" placeholder="enter video title">

<!-- buttons -->
        <button @click="txtFormat">Text Note</button>

        <button @click="todoFormat">Todo Note</button>

        <button @click="imgFormat">add image note</button>

        <button @click="videoFormat">add video</button>

        <button @click="addNote" type="submit">SAVE</button>
        <!-- img upload -->
        <input type="file" @change="onFileSelected">
      
       
   </section>
  `,
    data() {
        return {
            newTxtNote: keepsService.getEmptyTxtNote(),
            newTodoNote: keepsService.getEmptyTodoNote(),
            newImgNote: keepsService.getEmptyImgNote(),
            newVideoNote: keepsService.getEmptyVideoNote(),
            isTxtNote: true,
            isTodoNote: false,
            isImgNote: false,
            isVideoNote: false,
            // urlImg: null
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
            this.isTodoNote = true
            this.isTxtNote = false
            this.isImgNote = false
            this.isVideoNote = false
        },
        txtFormat() {
            this.isTodoNote = false
            this.isTxtNote = true
            this.isImgNote = false
            this.isVideoNote = false
        },
        imgFormat() {
            this.isTodoNote = false
            this.isTxtNote = false
            this.isImgNote = true
            this.isVideoNote = false
        },
        videoFormat() {
            this.isTodoNote = false
            this.isTxtNote = false
            this.isImgNote = false
            this.isVideoNote = true
        },
        onFileSelected(event) {
            console.log(event)
            // this.event.target.files[0]

        },

    }
    ,
    computed: {
        // imgSrc(url) {
        //     console.log('url', url);
        //     return url
        // }
    },
};
