export default {
    template:`
    <section class="mail-side-filter flex flex-column">
        <p @click="filter(null)">All</p>
        <p @click="filter('received')">Inbox</p>
        <p @click="filter('sent')">Sent</p>
        <p @click="filter('starred')">Starred</p>
        <p @click="filter('bin')">Bin</p>
    </section>
    `,
    data(){
        return{
        }
    },
    methods:{
        filter(type){
            this.$emit("getFilter",type)
        }
    }
}