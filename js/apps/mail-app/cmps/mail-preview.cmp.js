export default {
    props: [
        'mail'
    ],
    template: `
        <td>
            X
        </td>
        <td class="t-name" :class="{read:mail.isRead}">
            {{getName}}
        </td>
        <td class="t-subject" :class="{read:mail.isRead}">
            {{mail.subject}}
        </td>
        <td>
            {{getDate}}
        </td>
    `,
    data() {
        return {

        }
    },
    computed: {
        getName() {
            return this.mail.from.split('@')[0]
        },
        getDate() {
            const date = new Date(this.mail.sentAt)
            const day = date.getDay()
            const month = date.toLocaleString('default', { month: 'long' })

            return `${day} ${month.substring(3, 0)}`
        }
    }
}