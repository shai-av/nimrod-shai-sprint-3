export default {
  props: ["book"],
  template: `
  <article clas="book-card">
      <img :src="imgSrc"/>
  <p>{{book.title}}</p>
    <p>{{localePrice}}  <span v-if="book.listPrice.isOnSale">SALE</span></p>
  </article>
`,
  computed: {
    localePrice(){
      let price = this.book.listPrice.amount
       let curr = this.book.listPrice.currencyCode
       return price.toLocaleString("en", {style:"currency", currency:curr})
    },
    imgSrc(){
      return this.book.thumbnail
    }
  },
}
