import { utilService } from '../services/utilService.js'
import { bookService } from '../services/bookService.js'
import { eventBus } from '../services/eventBus-service.js'
import longText from '../cmp/long-text.cmp.js'
import addReview from '../cmp/add-review.cmp.js'
import bookReviews from '../cmp/book-reviews.cmp.js'

export default {
	props: [],
	emits: ['back'],
	template: `
        <section v-if="book" class="book-details main-layout app-main">
			<add-review v-if="isForm" @closeModal="toggleForm" @reviewAdded="reviewAdded" :bookId="book.id"></add-review>
			<button v-else @click="toggleForm" class="btn btn-add-review">Add Review</button>
			<button v-if="!isReviewsOpen" @click="showReviews" class="btn btn-showReviews">Show Reviews</button>
			<book-reviews v-else @closeModal="hideReviews" @removeReview="removeReview" v-if="book.reviews" :reviews="book.reviews"/>
			<span v-if="book.listPrice.isOnSale" class="sale-label">SALE</span>
			<p v-if="!longTxtOpen" class="description">
				Description:
				<br> 
				{{bookDescription}}{{bookDescSuffix}}
				<br>
				<button v-if="book.description.length > 100" @click="toggleLongTxt">Show More</button>
			</p>
			<long-text v-else @showLess="toggleLongTxt" :txt="book.description" />
			<h2>Title: {{book.title}}</h2>
			<div class="img-container">
				<img :src="book.thumbnail" alt="book.title">
			</div>
			<small>Subtitle: {{book.subtitle}}</small>
			<span>{{authorLabel}}: {{formattedAuthors}}</span>
			<span>
				Published at: {{book.publishedDate}}
				<span>{{bookAge}}</span>
			</span>
			<span>
				No. of Pages: {{book.pageCount}}
				<span>{{readingType}}</span>
			</span>
			<span>{{categoryLabel}}: {{formattedCategories}}</span>
			<span>Language: {{book.language}}</span>
			<span :class="priceColor">Price: {{formattedPrice}}</span>
			<router-link :to="'/book/'+book.prevBookId">Prev Book</router-link> | 
            <router-link :to="'/book/'+book.nextBookId">Next Book</router-link> | 
            <router-link to="/book">Back to the list</router-link>
		</section>
    `,
	components: {
		longText,
		addReview,
		bookReviews
	},
	data() {
		return {
			longTxtOpen: null,
			book: null,
			isForm: false,
			isReviewsOpen: false
		}
	},
	mounted() {
		this.loadBook()
	},
	watch: {
		'$route.params.bookId': {
			handler() {
				this.loadBook()
			},
			immediate: true,
		}
	},
	methods: {
		loadBook() {
			const id = this.$route.params.bookId
			if (id) {
				bookService.get(id)
					.then(book => this.book = book)
			}
		},
		toggleLongTxt() {
			this.longTxtOpen = !this.longTxtOpen
		},
		reviewAdded(bookId) {
			this.toggleForm()
			bookService.get(bookId)
				.then(book => this.book = book)
				.then(() => eventBus.emit('show-msg', { txt: 'Review Added Succesfully!', type: 'success' }))
				.catch(() => eventBus.emit('show-msg'), {
					text: 'Unfourtunatly we couldn\'t add your review, please try again later!}', type: 'failure'
				})
		},
		toggleForm() {
			this.isForm = !this.isForm
		},
		removeReview(reviewId) {
			bookService.removeReview(this.book.id, reviewId)
				.then(book => this.book = book)
		},
		showReviews() {
			this.isReviewsOpen = true
		},
		hideReviews() {
			this.isReviewsOpen = false
		}
	},
	computed: {
		authorLabel() {
			if (this.book.authors.length === 1) return 'Author'
			return 'Authors'
		},
		categoryLabel() {
			if (this.book.categories.length === 1) return 'Category'
			return 'Categories'
		},
		formattedAuthors() {
			return this.book.authors.formatAsString()
		},
		formattedCategories() {
			return this.book.categories.formatAsString()
		},
		formattedPrice() {
			return utilService.getNumAsCurrency(
				this.book.listPrice.amount,
				this.book.listPrice.currencyCode
			)
		},
		readingType() {
			if (this.book.pageCount > 500) return 'Long Reading'
			else if (this.book.pageCount > 200) return 'Decent Reading'
			else if (this.book.pageCount < 100) return 'Light Reading'
			return ''
		},
		bookAge() {
			const age = new Date().getFullYear() - this.book.publishedDate
			if (age > 10) return 'OG Book'
			else if (age > 1) return 'New!'
			return ''
		},
		priceColor() {
			return {
				red: this.book.listPrice.amount >= 150,
				green: this.book.listPrice.amount <= 20,
			}
		},
		bookDescription() {
			return this.book.description.substring(0, 100)
		},
		bookDescSuffix() {
			if (this.book.description.length > 100) return '...'
			return ''
		},
	},
}
