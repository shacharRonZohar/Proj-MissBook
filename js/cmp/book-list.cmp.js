import bookPreview from './book-preview.cmp.js'
import bookAdd from './book-add.cmp.js'

export default {
	props: ['books'],
	emits: ['selected'],
	template: `
        <section class="book-list">
			<book-add/>
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
		bookAdd
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
