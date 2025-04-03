import { createApp } from "vue";
import App from "./App.vue";
import AppleLogin from "./plugin";

const app = createApp(App);

app.use(AppleLogin, {
	clientId: "com.example.web",
	scope: "name email",
	redirectURI: "https://example.com/redirect",
	usePopup: true,
});

app.mount("#app");
