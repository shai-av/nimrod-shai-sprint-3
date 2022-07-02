export default {
    template: `
 <section class="home-page main-container flex justify-center align-center">
    <div class="welcome-msg">
        <p>Appsus</p>
        

        <p><router-link to="/book">Books</router-link></p>
        <p><router-link to="/mail">Mail</router-link></p>
        <p><router-link to="/keep">Keep</router-link></p>
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