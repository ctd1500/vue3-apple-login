<template>
	<div @click="login">
		<slot>
			<span
				id="appleid-signin"
				:data-type="type"
				:data-mode="mode"
				:data-color="color"
				:data-border="border"
				:data-border-radius="borderRadius"
				:data-width="width"
				:data-height="height"
				:data-logo-size="logoSize"
				:data-logo-position="logoPosition"
				:data-label-position="labelPosition"
			></span>
		</slot>
	</div>
</template>

<script setup>
import { onMounted, onUnmounted, useSlots } from "vue";
import { decodeToken, useScript } from "./utils";
import state from "./state";
import AuthHelpers from "./signin";

const slots = useSlots();
const hasSlot = slots.default ? true : false;

const props = defineProps({
	clientConfig: {
		type: Object,
		default: () => state,
	},
	type: {
		type: String,
		default: "sign-in",
		validator(value) {
			return ["sign-in", "sign-up", "continue"].includes(value);
		},
	},
	mode: {
		type: String,
		default: "center-align",
		validator(value) {
			return ["center-align", "left-align", "logo-only"].includes(value);
		},
	},
	color: {
		type: String,
		default: "black",
		validator(value) {
			return ["black", "white"].includes(value);
		},
	},
	border: {
		type: Boolean,
		default: true,
	},
	borderRadius: {
		type: Number,
		default: 15,
		validator(value) {
			return value >= 0 && value <= 50;
		},
	},
	width: {
		type: String,
		default: "100%",
	},
	height: {
		type: String,
		default: "100%",
	},
	logoSize: {
		type: String,
		default: "medium",
		validator(value) {
			return ["small", "medium", "large"].includes(value);
		},
	},
	logoPosition: {
		type: Number,
		default: 0,
	},
	labelPosition: {
		type: Number,
		default: 0,
	},
	onSuccess: {
		type: Function,
		default: null,
	},
	onFailure: {
		type: Function,
		default: null,
	},
});

const config = { ...state, ...props.clientConfig };

function callOnSuccess(data) {
	if (props.onSuccess) {
		const userData = decodeToken(data.detail.authorization.id_token);
		props.onSuccess({
			detail: data.detail,
			authorization: data.detail.authorization,
			userData: userData,
		});
	}
}

function callOnFailure(error) {
	if (props.onFailure) {
		props.onFailure(error);
	}
}

async function login() {
	if (hasSlot) {
		AuthHelpers.signIn(config, callOnSuccess, callOnFailure);
	}
}

onMounted(() => {
	useScript()
		.then(() => {
			if (!hasSlot) {
				document.addEventListener("AppleIDSignInOnSuccess", callOnSuccess);
				document.addEventListener("AppleIDSignInOnFailure", callOnFailure);

				window.AppleID.auth.init(config);
			}
		})
		.catch((error) => {
			console.log(error);
		});
});

onUnmounted(() => {
	document.removeEventListener("AppleIDSignInOnSuccess", callOnSuccess);
	document.removeEventListener("AppleIDSignInOnFailure", callOnFailure);
});
</script>
