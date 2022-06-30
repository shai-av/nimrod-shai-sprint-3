export default {
    template: `
    <section class="mail-side-filter mail-main-container flex flex-column">
        <p @click="filter(null)" :class="{selected: selectedFilter === null}">All</p>
        <p @click="filter('received')" :class="{selected: selectedFilter === 'received'}">Inbox <span class="unread-count">  2</span></p>
        <p @click="filter('sent')" :class="{selected: selectedFilter === 'sent'}">Sent</p>
        <p @click="filter('starred')" :class="{selected: selectedFilter === 'starred'}">Starred</p>
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
    }
}