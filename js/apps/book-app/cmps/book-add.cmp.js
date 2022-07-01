import { bookService } from "../services/book-service.js"

export default {
    template:`
        <section class="book-add">
            <h3>Add book</h3>
            <input type="text" ref="bookNameInput" v-model="searchVal" name="book-name"/>
            <button @click="getBooks" class="api-search-btn">search</button>
            <section class="bood-add-list">
                <ul v-if="booksToShow" class="api-books-container">
                    <li v-for="book in booksToShow">
                        {{book.title}}
                        <button title="add book" @click="add(book)">+</button>
                    </li>
                </ul>
            </section>
        </section>    
    `,
    data(){
        return {
            searchVal:'',
            booksToShow:null
        }
    },
    methods:{
        getBooks(){
          bookService.getBooksFromApi(this.searchVal).then((books)=>this.booksToShow = books)
        },
        add(book){
        bookService.addBook(book).then((book)=>this.$emit('returnBook',book))
        }
    },
}