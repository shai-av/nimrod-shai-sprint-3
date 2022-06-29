export default {
    template: `
          <section>
            <p>todos-note</p>
             <p>{{type.label}}</p>
             <p>{{type.todos.txt}}</p>
             <p>{{type.todos[0].txt}}</p>

          </section>
          `,
    props: ["type"],
    data() {
    },
    methods: {
    },
    computed: {
    }
}
