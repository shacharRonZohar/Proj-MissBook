export default {
	props: [''],
	emits: [''],
	template: `
		<header class="main-header main-layout">
			<router-link to="/">
				<div class="logo">Books R Us</div>
			</router-link>
			<nav class="main-nav">
				<router-link to="/">Home</router-link>
				<router-link to="/book">Books</router-link>
				<router-link to="/about">About</router-link>
			</nav>
			<div class="line"></div>
		</header>
    `,
	data() {
		return {}
	},
	created() { },
	unmounted() { },

	methods: {},
	computed: {},
}
