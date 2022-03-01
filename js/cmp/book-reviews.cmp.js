export default {
    props: ['reviews'],
    emits: ['removeReview', 'close-modal'],
    template: `
        <div @click="closeReviews" class="background click"></div>
        <section class="reviews modal">
            <article v-for="review in reviews">
                <button @click.stop="remove(review.id)" class="btn btn-del-review">X</button>
                <span class="name">Name: {{review.name}}</span>
                <span class="rating">Rating: {{review.rating}}</span>
                <span class="reat-at">Read At: {{review.readAt}}</span>
                <button class="btn btn-free-text click">Read Their Thoughts</button>
            </article>
        </section>
    `,
    components: {

    },
    data() {
        return {

        }
    },
    created() {
        console.log(this.reviews)
    },
    unmounted() {

    },

    methods: {
        remove(id) {
            this.$emit('removeReview', id)
        },
        closeReviews() {
            this.$emit('close-modal')
        }
    },
    computed: {

    },
}