export default {
    template: `
          <section>
         <p>img-note</p>
             <p>title:  {{type.title}}</p>
             <!-- <img v-if="type" :src="imgSrc" alt=""> -->
             <img class="" v-if="type" :src="imgSrc" alt=""/>
          </section>
          `,
    props: ["type"],
    data() {
        return {

        }
    },
    methods: {
    },
    computed: {
        imgSrc() {
            return this.type.url
        }
    }
}
