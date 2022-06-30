

export default {
    props: ["note"],
    template: `
   <section>
       <button v-if="!editMode" @click="startEdit">Edit</button>
        <p v-if="editMode">this is edit mode</p>
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
        },
        save(note) {
            if (!this.txt) return console.log('box is empty')
            this.$emit('edit', note, this.txt)
            this.editMode = null
        }
    }
    ,
    computed: {
    },
};
