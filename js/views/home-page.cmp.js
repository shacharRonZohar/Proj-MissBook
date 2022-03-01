export default {
    template: `
        <!-- For Saving an APISample -->
		<button @click="saveLocal">Save</button>
        <section class="home-page app-main main-layout">
            <div class="hero">
                <h3>Welcome to Book R Us!</h3>
            </div>
            <router-link to="/book" class="hero-action-container">
                <span>Find your next favourite book!</span>
            </router-link>
        </section>
    `,
    methods: {
        saveLocal() {
            fetch('https://www.googleapis.com/books/v1/volumes?printType=books&q=effective%20javascript')
                .then(ans => ans.json())
                .then(res => localStorage.setItem('apiSample', JSON.stringify(res)))

        },
    },
}