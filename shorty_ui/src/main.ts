import App from './App.svelte';
import store from './stores/session'

const app = new App({
	target: document.body,
	props: {
	}
});

export default app;