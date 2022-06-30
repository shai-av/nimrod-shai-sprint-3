export default {
    template: `
          <section>
         <p>video-note</p>
             <p>title:  {{info.title}}</p>
             <p>{{info.url}}</p>

          </section>
          `,
    props: ["info"],
    data() {
    },
    methods: {
    },
    computed: {
    }
}