import { bookService } from "../services/bookService.js"
import { eventBus } from "../services/eventBus-service.js"

export default {
    props: ['bookId'],
    emits: ['reviewAdded', 'close-modal'],
    template: `
        <section class="add-review">
            <div @click="closeForm" class="background click"></div>
            <form>
                <label for="full-name">Full Name:</label>
                <input ref="reviewName" v-model="newReview.name" type="text" name="full-name" id="full-name" placeholder="Full Name">
                <label for="rate">Rating:</label>
                <select v-model.number="newReview.rating" name="rate" id="rate">
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
                <label for="read-at">When did you read the book?</label>
                <input v-model="newReview.readAt" type="date" name="read-at" id="read-at">
                <label for="free-text">Enter your thoughts here:</label>
                <textarea v-model="newReview.freeText" name="free-text" id="free-text" cols="30" rows="10"></textarea>
                <button @click.prevent="submitReview" class="submit-review">Submit</button>
            </form>
        </section>
    `,
    components: {
    },
    data() {
        return {
            isForm: false,
            newReview: null
        }
    },
    created() {
        this.newReview = bookService.getEmptyReview()
    },
    mounted() {
        this.$refs.reviewName.focus()
    },
    methods: {
        submitReview() {
            if (!Object.values(this.newReview).every(field => field)) {
                return eventBus.emit('show-msg', { txt: 'Please fill in all of the required fields!', type: 'failure' })
            }
            this.isForm = false
            bookService.addReview(this.bookId, this.newReview)
                .then(() => this.$emit('reviewAdded', this.bookId))
        },
        closeForm() {
            this.$emit('close-modal')
        }
    },
}