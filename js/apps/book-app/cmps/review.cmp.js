export default{
    props:[
        'review'
    ],
    template:`
        <article class="review">
            <p>{{review.name}}</p>
            <p>{{review.txt}}</p>
            <span v-for="star in +this.review.rate">⭐</span>
        </article>
    `,
    data(){
        return {
            rate:[]
        }
    },
    methods:{

    },
    computed:{

    },
    created(){
    }
}