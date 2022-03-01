import { router } from './router.js'
import appHeader from './cmp/app-header.cmp.js'
import userMsg from './cmp/user-msg.cmp.js'
import appFooter from './cmp/app-footer.cmp.js'

const options = {
    template: `
        <section class="main-app-container">
            <app-header />
            <user-msg />
            <router-view/>
            <app-footer />
        </section>
    `,
    components: {
        appHeader,
        userMsg,
        appFooter,
    },
}
const app = Vue.createApp(options)

app.use(router)
app.mount('#app')
