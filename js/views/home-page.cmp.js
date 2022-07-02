

export default {
    template: `
 <section class="home-page main-container flex justify-center align-center">
    <div class="welcome-msg">
        <p>Appsus</p>
        
        <div class="route-div"><router-link to="/book">Books</router-link></div>
        <div class="route-div"><router-link to="/mail">Mail</router-link></div>
        <div class="route-div"><router-link to="/keep">Keep</router-link></div>
    </div>
 </section>
`,
    data() {
        return {}
    },
    created() { },
    methods: {},
    computed: {},
    unmounted() { },
}