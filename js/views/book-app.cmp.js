import { utilService } from '../services/utilService.js'
import { bookService } from '../services/bookService.js'
import bookFilter from '../cmp/book-filter.cmp.js'
import bookList from '../cmp/book-list.cmp.js'

export default {
	template: `
		<section class="main-layout app-main">
			<book-filter @filtered="setFilter"></book-filter>
        	<book-list :books="booksToShow" @bookAdded="getBooks"></book-list>
        	<book-details @back="onBack"></book-details>    
		</section>
    `,
	components: {
		bookFilter,
		bookList,
	},
	data() {
		return {
			books: null,
			filterBy: null,
		}
	},
	created() {
		this.getBooks()
	},
	methods: {
		getBooks() {
			bookService.query()
				.then(books => this.books = books)
		},
		setFilter(filterBy) {
			this.filterBy = filterBy
		},
		onBack() {
			// this.selectedBook = null
		},
	},
	computed: {
		booksToShow() {
			if (!this.filterBy) return this.books
			const regex = new RegExp(this.filterBy.title, 'i')
			return this.books.filter(book => {
				return (
					regex.test(book.title) &&
					book.listPrice.amount >= this.filterBy.priceStart &&
					book.listPrice.amount <= this.filterBy.priceEnd
				)
			})
		},
	},
}
