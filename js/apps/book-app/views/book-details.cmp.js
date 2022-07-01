import { bookService } from "../services/book-service.js"
import bookReview from "../cmps/book-review.cmp.js"

export default {
    template: `
        <section v-if="book" class="book-details app-main flex align-center">
        <router-link :to="'/book/details/' + prevBookId">Prev Book</router-link>
            <article class="details-modal">
                <router-link class="X-modal" to="/book">X</router-link>
                <h1>{{book.title}}</h1>
                <h3>{{book.subtitle}}</h3>
               <p><span> book Id :</span> {{book.id}}</p>
               <p><span>authors :</span> {{book.authors.join(',')}}</p>
               <p><span>published Date:</span> {{getPublishedDate}}</p>
               <p><span>page count:</span> {{getPageCount}}</p>
               <p><span>categories:</span> {{book.categories.join(', ')}}</p>
               <p><span>language:</span> {{book.language}}</p>
               <p><span>price :</span><span :class="priceStyle">{{localePrice}}</span></p>
                
                <p>{{getDescription}}<span v-if="isReadMore" class="blue read-more" @click="userClkReadMore = true">read more...</span></p>
                <img :src="imgSrc"/>
            </article>
            <book-review/>
            <router-link :to="'/book/details/' + nextBookId">Next Book</router-link>
        </section>
    `,
    data() {
        return {
            userClkReadMore:false,
            book:null,
            nextBookId:null,
            prevBookId:null,
        }   
    },
    components:{
        bookReview,
    },
    methods: {
    },
    computed: {
        getPageCount() {
            let count = this.book.pageCount

            if (count > 500) return count + ' Long reading'
            else if (count > 200) return count + ' Decent reading'
            else if (count < 100) return count + ' Light reading'
            else return count
        },
        getPublishedDate() {
            const present = new Date().getFullYear()
            const published = this.book.publishedDate
            if (present - published > 10) return published + ' Veteran book'
            else if (present - published < 1) return published + ' New!'
        },
        priceStyle() {
            return { red: this.book.listPrice.amount > 150, green: this.book.listPrice.amount < 20 }
        },
        localePrice(){
            let price = this.book.listPrice.amount
             let curr = this.book.listPrice.currencyCode
             return price.toLocaleString("en", {style:"currency", currency:curr})
          },
          getDescription(){
            if(this.book.description.length>100 && !this.userClkReadMore) return this.book.description.substring(0,100) 
            else return this.book.description+'.'
          },
          isReadMore(){
            return !this.userClkReadMore && this.book.description.length>100
          },
          imgSrc(){
            return this.book.thumbnail
          }
    },
    created(){
    },
    watch:{
        '$route.params.bookId':{
            handler() {
                
                const id = this.$route.params.bookId
                if(!id) return 
                bookService.get(id).then(book => {
                    this.book = book
                     bookService.getPrevNextBookId(book.id)
                        .then(bookIds => {
                            this.nextBookId = bookIds.next
                            this.prevBookId = bookIds.prev
                        })
                })
            },
            immediate: true
        }
    }
    

}