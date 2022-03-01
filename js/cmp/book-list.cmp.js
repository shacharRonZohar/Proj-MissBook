import bookPreview from './book-preview.cmp.js'

export default {
	props: ['books'],
	emits: ['selected'],
	template: `
        <section class="book-list">
            <ul class="gallery">
                <li v-for="book in books" :key="book.id" class="book-preview-container">
					<router-link :to="'/book/'+book.id">
						<book-preview :book="book" @click="onSelected(book)"/>
					</router-link>
                </li>
            </ul>
        </section>
    `,
	components: {
		bookPreview,
	},
	data() {
		return {}
	},
	methods: {
		onSelected({ id }) {
			this.$emit('selected', id)
		},
	},
}
