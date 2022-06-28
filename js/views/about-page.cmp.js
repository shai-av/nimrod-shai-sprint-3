
export default {
    template: `
 <section class="about-page main-container flex justify-center align-center">
    
    <div class="about-msg">
    <p>About us..</p>

    <p><h3>WHO WE ARE</h3>
</p>


<p><h3>MISSION</h3>
</p>

<p><h3>VALUES</h3>
</p>
    </div>
 </section>
`,
    data() {
        return {
            interval:null
        };
    },
    created() { },
    methods: {

    },
    computed: {},
    created() {
       this.interval = setInterval(() => console.log('int'),1000*5)
     },
     unmounted(){
        clearInterval(this.interval)
     }
};