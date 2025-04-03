<template>
	<div class="app">
		<main>
			<AppleLogin :border-radius="50" class="ext-btn" />

			<AppleLogin :client-config="appleConfig" :border-radius="50" class="ext-btn">
				<button>Custom Sign in with Apple</button>
			</AppleLogin>
		</main>
	</div>
</template>

<script setup>
// import { AppleLogin } from "./plugin";

const appleConfig = {
	clientId: "YOUR_APPLE_CLIENT_ID",
	scope: "email",
	redirectURI: "/",
	state: "login",
	nonce: null,
	usePopup: false,
};
</script>

<style scoped>
.ext-btn {
	width: 190px;
	height: 36px;
	cursor: pointer;
	margin-bottom: 15px;
}
</style>
