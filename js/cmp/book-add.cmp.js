import { bookService } from "../services/bookService.js"

export default {
    props: [''],
    emits: ['bookAdded'],
    template: `
        <section class="bookAdd">
            <input v-model="searchTerm" type="text"/>
            <button @click="searchBooks">Search</button>
            <ul v-if="books" class="books-list">
                <span v-if="!books.length">No Books found :C</span>
                <li v-for="book in books">{{book.volumeInfo.title}} 
                    <button @click="addBook(book)">+</button></li>
            </ul>
        </section>
    `,
    components: {

    },
    data() {
        return {
            searchTerm: null,
            books: null
        }
    },
    created() {

    },
    unmounted() {

    },

    methods: {
        searchBooks() {
            bookService.getBooksFromGoogle(this.searchTerm)
                .then(res => this.books = JSON.parse(res).items)
        },
        addBook(book) {
            bookService.add(book)
                .then(() => this.$emit('bookAdded'))
        }
    },
    computed: {

    },
}