import noteTxt from './dynamic-cmp/txt-cmp.js'
import noteImg from './dynamic-cmp/img-cmp.js'
import noteTodos from './dynamic-cmp/todos-cmp.js'
import noteVideo from './dynamic-cmp/video-cmp.js'


export default {
    props: ["notes"],
    template: `
    <section class="notes-list">
        <p>this is notes list</p>

        <ul>
            <li class="note-card" v-for="note in notes">
                <component :is="note.type"  
                        :type="note.info" 
                       >
                    </component>
                    <br>
                    <button @click="remove(note)">X</button>

            </li>
        </ul>
      
        </section>
    `,
    components: {
        noteTxt,
        noteImg,
        noteTodos,
        noteVideo
    },

    data() {
        return {};
    },
    methods: {
        remove(note) {
            console.log('remove');
            this.$emit('remove', note.id);
        }
    },
}
