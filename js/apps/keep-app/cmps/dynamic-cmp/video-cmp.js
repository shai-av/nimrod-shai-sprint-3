export default {
    template: `
          <section >
        
             <h2>{{info.title}}</h2>
      
             <!-- <iframe class="video2" width="420" height="315" src="https://www.youtube.com/embed/AEpZbvtiQFs">
            </iframe> -->

            <iframe class="video2" width="220" height="115" :src="'https://www.youtube.com/embed/'+info.url">
            </iframe>

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
    }
}