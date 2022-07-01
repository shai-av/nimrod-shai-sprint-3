export default {
    template: `
          <section>
         <p>video-note</p>
             <p>{{info.title}}</p>
             <!-- <p>{{info.url}}</p> -->
             <!-- <video :src="info.url"></video> -->
             <iframe width="160" height="115" :src="info.url" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
<!-- <iframe width="560" height="315" src="https://www.youtube.com/embed/cL4uhaQ58Rk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> -->
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