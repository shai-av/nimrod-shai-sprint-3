import { keepsService } from "../../services/keep-service.js"

export default {
  template: `
          <section>
             <ul>
               <h3>{{info.label}}</h3>
               <li class="todo" v-for="todo in info.todos">
                 <span  @click="todoDone">❏</span>
                   <span @click="editRow(todo)"> {{todo.txt}}</span>
                        <!-- <span @click="editRow">edit row</span> -->
                      </li>
                      <button v-if="editMode" @click="save()">save</button>
                      <input v-if="editMode" v-model="txtRow" type="text">
                      <input v-if="editRowMode" v-model="txtNewRow" type="text">
                      <button  @click="addTodo">add new todo</button>
                      <button v-if="!editMode && !editRowMode" @click="startAddTodo">type new todo</button>
             </ul>
                  <!-- {{info.todos.length}} -->
                  <!-- <pre>{{info}}</pre> -->
          </section>
          `,
  props: ["info", "note"],
  data() {
    return {
      txtRow: '',
      editMode: null,
      editRowMode: null,
      rowTodo: null,
      txtNewRow: '',
    }
  },

  methods: {
    todoDone() {
      console.log('doneee')
      this.todo = 1
    },
    editRow(todoRow) {
      this.rowTodo = todoRow

      this.editMode = 1
    },
    save() {
      if (!this.txtRow) return console.log('empty box');
      this.rowTodo.txt = this.txtRow
      keepsService.edit(this.note)

      this.txtRow = ''
      this.editMode = null
    },
    startAddTodo() {
      console.log('infp.todos', this.info.todos[0]);
      this.editRowMode = 1
    },
    addTodo() {
      // if(txtNewRow)
      var arr = this.info.todos
      var newTodo = {
        txt: this.txtNewRow,
        doneAt: null
      }
      arr.push(newTodo)
      console.log('arr', arr)
      this.note.info.todos = arr
      console.log('note', this.note)
      keepsService.edit(this.note)
    },
    computed: {
    }
  }
}