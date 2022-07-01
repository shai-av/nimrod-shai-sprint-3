
export default {
  template: `
 <header class="app-header">
 <div class="main-header main-layout flex align-center space-between">
            <span class="logo-helper">Appsus</span>
            <nav class="main-nav">
                <ul class="nav-list">
                    <li><router-link to="/">Home</router-link></li>
                    <li><router-link to="/book">Books</router-link></li>
                    <li><router-link to="/keep">Keep</router-link></li>
                    <li><router-link to="/mail">Mail</router-link></li>
                </ul>
            </nav>
        </div>
 </header>
`,
  data() {
    return {
    }
  },
  methods: {},
  computed: {}
}