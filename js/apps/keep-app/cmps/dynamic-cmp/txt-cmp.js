export default {
  template: `
          <section class="txt-note ">
            <h2>{{info.title}}</h2>
            <!-- <span>{{info.txt}}</span> -->
             <p>{{info.txt}}</p>
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
