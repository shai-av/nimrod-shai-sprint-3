import bookPreview from "../cmps/book-preview.cmp.js"

export default {
  props: ["books"],
  template: `
      <section class="book-list"  v-if="books.length>0">
          <ul class="clean-list grid-gallery">
              <li v-for="book in books" :key="book.id" class="book-preview-container">
                  <book-preview :book="book"/>
                  <div class="actions">
                      <router-link :to="'/book/details/'+book.id">Details</router-link>
                  </div>
              </li>
          </ul>
      </section>
      <section v-else class="no-books-msg">
          No books to show..
      </section>
`,
  methods: {
    select(book) {
      this.$emit("selected", book)
    },
  },
  components: {
    bookPreview,
  },
}
