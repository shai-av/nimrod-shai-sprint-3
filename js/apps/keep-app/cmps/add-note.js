import { keepsService } from "../services/keep-service.js"

export default {
    template: `
   <section class="add-note-section">
                <!-- input -->
    <div class="add-new-inputs">
    <!-- todo -->
            <input v-if="isTodoNote" v-model="newTodoNote.info.title" type="text" placeholder="healine">
            <input v-if="isTodoNote" v-model="newTodoNote.info.todos[0].txt" type="text" placeholder="add todo">
        <!-- txt -->
                <input v-if="isTxtNote" v-model="newTxtNote.info.title" type="text" placeholder="add title">
            <textarea v-if="isTxtNote" v-model="newTxtNote.info.txt" placeholder="add text note"></textarea>
        <!-- img -->
            <input v-if="isImgNote" v-model="newImgNote.info.title" type="text" placeholder="enter img title">
            <input v-if="isImgNote"  type="file" @change="onFileSelected">
    <!-- video -->
            <input v-if="isVideoNote" v-model="newVideoNote.info.title" type="text" placeholder="enter video title">
        <input v-if="isVideoNote" type="text" v-model="videoUrl" placeholder="insert youtube link">
    </div>
    <div class="add-new-btns">
            <!-- buttons -->
        <button @click="txtFormat">Text Note</button>

        <button @click="todoFormat">Todo Note</button>

        <button @click="imgFormat">Image note</button>

        <button @click="videoFormat">Video note</button>
    </div>

        <button @click="addNote" type="submit">SAVE</button>
        <!-- img upload -->
      
       
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
            urlImg: null,
            img: null,
            videoUrl: null,

        }
    },

    methods: {
        addNote() {
            if (!this.newTxtNote.info.txt && !this.newTodoNote.info.label
                && !this.newTodoNote.info.todos[0].txt && !this.newImgNote.info.title
                && !this.newVideoNote.info.title) return console.log('box is empty')

            if (this.isTodoNote) {
                keepsService.add(this.newTodoNote)
                    .then((note) => {
                        this.newTodoNote = keepsService.getEmptyTodoNote()
                        this.$emit("saved", note)
                    })
            } else if (this.isTxtNote) {
                keepsService.add(this.newTxtNote)
                    .then((note) => {
                        this.newTxtNote = keepsService.getEmptyTxtNote()
                        this.$emit("saved", note)
                    })
            } else if (this.isImgNote) {
                keepsService.add(this.newImgNote)
                    .then((note) => {
                        this.newImgNote = keepsService.getEmptyImgNote()
                        this.$emit("saved", note)
                    })
            } else if (this.isVideoNote) {
                var url = this.videoUrl
                var id = url.substring(url.indexOf('=') + 1, url.length)
                if (id.includes('=')) {
                    id = id.substring(0, id.indexOf('&'))
                }
                this.newVideoNote.info.url = id

                console.log('this.newVideoNote.info.url', this.newVideoNote.info.url)

                keepsService.add(this.newVideoNote)
                    .then((note) => {
                        this.newVideoNote = keepsService.getEmptyVideoNote()
                        this.videoUrl = null
                        this.$emit("saved", note)
                    })
            }
        },
        todoFormat() {
            this.isTodoNote = true
            this.isTxtNote = false
            this.isImgNote = false
            this.isVideoNote = false
            this.newTodoNote = keepsService.getEmptyTodoNote()
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
        // imginput
        onFileSelected(event) {
            keepsService.loadImageFromInput(event, this.addPicToNote)
        },
        addPicToNote({ src }) {
            console.log('item.src', src)
            this.urlImg = src
            this.newImgNote.info.url = src
        },
        onVideoSelected(ev) {
            console.log(ev)
        }
    }
    ,

}
