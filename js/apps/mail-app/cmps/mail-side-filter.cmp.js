import unreadCountBus from "./unread-count-bus.cmp.js"

export default {
    template: `
    <section class="mail-side-filter mail-main-container flex flex-column">
        <p @click="filter(null)" :class="{selected: selectedFilter === null}">All</p>
        <p @click="filter('received')" :class="{selected: selectedFilter === 'received'}">Inbox </p>
        <p @click="filter('unread')" :class="{selected: selectedFilter === 'unread'}">Unread <unread-count-bus /></p>
        <p @click="filter('sent')" :class="{selected: selectedFilter === 'sent'}">Sent</p>
        <p @click="filter('starred')" :class="{selected: selectedFilter === 'starred'}">Starred</p>
        <p @click="filter('archived')" :class="{selected: selectedFilter === 'archived'}">Archive</p>
        <p @click="filter('bin')" :class="{selected: selectedFilter === 'bin'}">Bin</p>
    </section>
    `,
    data() {
        return {
            selectedFilter: 'received'
        }
    },
    methods: {
        filter(type) {
            this.selectedFilter = type
            this.$emit("getFilter", type)
        }
    },
    components:{
        unreadCountBus
    }
}