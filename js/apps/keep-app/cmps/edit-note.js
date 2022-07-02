

export default {
    props: ["note"],
    template: `
   <section>
       <button v-if="!editMode && note.type !== 'note-todos'" @click="startEdit">Edit</button>
        <textarea v-if="editMode" v-model="txt" placeholder="type here"></textarea>
        <button v-if="editMode" @click="save(note)">Save</button>
   </section>
  `,
    data() {
        return {
            editMode: null,
            txt: ''
        }
    },

    methods: {
        startEdit() {
            this.editMode = 1
            console.log('note.type', this.note.type);
            this.$emit('startEdit', this.editMode)
        },
        save(note) {
            if (!this.txt) return console.log('box is empty')
            this.editMode = null
            this.$emit('edit', note, this.txt)
        }
    }
    ,
    computed: {
    },
};
