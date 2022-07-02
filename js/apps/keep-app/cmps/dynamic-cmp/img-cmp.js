export default {
    template: `
          <section >
              <h2> {{info.title}}</h2>
             <!-- <img v-if="info" :src="imgSrc" alt=""> -->
             <img class="img" v-if="info" :src="info.url" alt=""/>
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
