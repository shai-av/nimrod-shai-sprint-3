export default {
    template: `
          <section>
         <p>img-note</p>
             <p>title:  {{type.title}}</p>
             <p>{{type.url}}</p>
             <img src="type.url" alt="">

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
