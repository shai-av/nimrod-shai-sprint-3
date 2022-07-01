export default {
    template: `
          <section>
         <p>img-note</p>
             <p>title:  {{info.title}}</p>
             <!-- <img v-if="info" :src="imgSrc" alt=""> -->
             <img class="" v-if="info" :src="info.url" alt=""/>
          </section>
          `,
    props: ["info"],
    data() {
        return {

        }
    },
    methods: {
    },
    computed: {
        imgSrc() {
            return this.info.url
        }
    }
}
