import { utilService } from '../services/utilService.js'
export default {
	props: ['book'],
	template: `
        <section class="book-preview click">
			<div class="img-container">
				<img :src="book.thumbnail" alt="">
			</div>
            <p class="title">Title: {{book.title}}</p>
            <p class="price">Price: {{formattedPrice}}</p>
        </section>
    `,
	data() {
		return {}
	},
	computed: {
		formattedPrice() {
			const { listPrice } = this.book
			console.log(listPrice)
			return utilService.getNumAsCurrency(listPrice.amount, listPrice.currencyCode)
		},
	},
}
