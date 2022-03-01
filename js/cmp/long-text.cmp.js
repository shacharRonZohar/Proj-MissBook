export default {
	props: ['txt'],
	emits: ['showLess'],
	template: `
    <div class="long-description-container">
        <span>Description:</span>
        <p>{{txt}}</p>
        <button @click="$emit('showLess')">Show Less</button>
    </div>   
    `,
}
