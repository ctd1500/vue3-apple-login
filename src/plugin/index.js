import AppleLogin from "./AppleLogin.vue";
import AuthHelpers from "./signin";
import { setupState } from "./state";

export { AppleLogin, AuthHelpers };

export default {
	install: (app, options) => {
		setupState(options);
		app.component("AppleLogin", AppleLogin);
	},
};
