export default {
    template: `
          <section>
         <p>video-note</p>
             <p>title:  {{type.title}}</p>
             <p>{{type.url}}</p>

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