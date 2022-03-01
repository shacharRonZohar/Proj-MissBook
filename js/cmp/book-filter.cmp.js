export default {
	template: `
        <section class="book-filter">
            <input type="text" v-model="filterBy.title" placeholder="Search...">
			<div class="slider-track"></div>
			{{filterBy.priceStart}}<input min="0" type="range" v-model="filterBy.priceStart" class="price-start">
			<input max="1000" type="range" v-model="filterBy.priceEnd" class="price-end"> {{filterBy.priceEnd}}
			<button @click.stop="$emit('filtered', filterBy)">Search</button>
		</section>
    `,
	data() {
		return {
			filterBy: {
				debounce: null,
				title: '',
				priceStart: 0,
				priceEnd: 1000,
			},
		}
	},
	methods: {},
}
