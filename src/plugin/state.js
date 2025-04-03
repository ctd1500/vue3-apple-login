import { reactive } from "vue";

// https://developer.apple.com/documentation/sign_in_with_apple/clientconfigi
const state = reactive({
	clientId: null,
	scope: "name email",
	redirectURI: null,
	state: null,
	nonce: "",
	usePopup: true,
});

export default state;

export const setupState = (options) => {
	options.clientId && (state.clientId = options.clientId);
	options.scope && (state.scope = options.scope);
	options.redirectURI && (state.redirectURI = options.redirectURI);
	options.state && (state.state = options.state);
	options.nonce && (state.nonce = options.nonce);
	options.usePopup !== undefined && (state.usePopup = options.usePopup);
};
