import { bookService } from "../services/book-service.js"
import { eventBus } from "../../../services/eventBus-service.js"
import reviewPrev from "./review.cmp.js"

export default {
    template: `
        <section v-if="book" class="book-review app-main">
            <section class="add-book">
                <form @submit.prevent="addReview">
                    <p><span  class="key">Name </span><input type="text" ref="nameInput" v-model="userName"/></p>
                    <p><span  class="key">Review</span></p>
                    <p><textarea v-model="review" class="review-area"></textarea></p>
                    <button>Add review</button>
                    <span class="key rate-span">Rate </span><select v-model="rate" name="book-rate">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </form>
            </section>
            <ul class="review-list">
                <li v-if="book.reviews?.length===0">No reviews</li>
                <li v-else v-for="(review,idx) in book.reviews" :key="idx">
                   <review-prev :review="review"/>
                </li>
            </ul>
        </section>
    `,
    data() {
        return {
            userName: 'Books Reader',
            review: '',
            rate: '5',
            book: null
        }
    },
    components: {
        reviewPrev
    },
    methods: {
        addReview() {
            const review = { name: this.userName, txt: this.review, rate: this.rate }
            this.book.reviews.push(review)
            bookService.save(this.book)
            eventBus.emit('show-msg', { txt: `Book ${this.book.title} was successfully added`, type: 'success' })
            this.resetValues()
        },
        resetValues() {
            this.userName = 'Books Reader'
            this.review = ''
            this.rate = '5'
        }
    },
    computed: {

    },
    created() {
        const id = this.$route.params.bookId
        bookService.get(id).then(book => this.book = book).then(() => {
            if (!this.book.reviews) this.book.reviews = []
            this.$refs.nameInput.focus()
        })
    },
}
