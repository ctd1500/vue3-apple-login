# vue3-apple-login

A Vue 3 plugin/component for implementing [Sign in with Apple](https://developer.apple.com/documentation/signinwithapplejs).

![normal black apple button](images/apple-bl.png)
![rectangular black apple button](images/apple-rect.png)
![normal white apple button](images/apple-w.png)

This component offers the following features

- Normal Sign in / Sign up / Continue with Apple button
- Apple login using a [custom button](#custom-button)

## Installation

```
npm install vue3-apple-login
```

## Usage

### Simple Global Plugin Usage

Initialize the plugin in main.js, this will register the `AppleLogin` component globally

```js
import { createApp } from "vue";
import App from "./App.vue";
import AppleLogin from "vue3-apple-login";

const app = createApp(App);

app.use(AppleLogin, {
  clientId: "YOUR_APPLE_CLIENT_ID",
});

app.mount("#app");
```

```vue
<AppleLogin height="36px" type="sign-in" :on-success="onSuccess" :on-failure="onFailure" />
```

### Component Usage

You can also use the component directly in your Vue SFC files. This is useful if you want to customize the component or use it in a specific part of your application.

```vue
<template>
  <AppleLogin
    class="apple-btn"
    :client-config="appleConfig"
    type="sign-up"
    :on-success="onSuccess"
    :on-failure="onFailure"
  />
</template>

<script setup>
import { AppleLogin } from "vue3-apple-login";

const appleConfig = {
  clientId: "YOUR_APPLE_CLIENT_ID",
  scope: "name email",
  redirectURI: "https://example.com/callback",
  state: "login",
  nonce: "RANDOM_STRING",
  usePopup: true,
};

function onSuccess(data) {
  // Handle successful login here
  // data will contain the user information returned from Apple
  console.log("Handle the response", data);
}

function onFailure(error) {
  console.error(error);
}
</script>

<style scoped>
.apple-btn {
  width: 190px;
  height: 36px;
  cursor: pointer;
}
</style>
```

### Custom Button

The component also provides a `slot` allowing you to create or use a custom Apple login button.
There are icon resources available on Apple's [Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/sign-in-with-apple#Creating-a-custom-Sign-in-with-Apple-button).

```vue
<template>
  <AppleLogin
    class="apple-btn"
    :client-config="appleConfig"
    :on-success="onSuccess"
    :on-failure="onFailure"
  >
    <button class="custom-apple-btn">Custom Apple Login button</button>
  </AppleLogin>
</template>
```

### Props

```vue
<AppleLogin
  class="apple-btn"
  :client-config="appleConfig"
  mode="center-align"
  type="sign-in"
  color="black"
  :border="true"
  border-radius="15"
  logo-size="medium"
  :logo-position="0"
  :label-position="0"
  width="100%"
  height="100%"
  :on-success="onSuccess"
  :on-failure="onFailure"
/>
```

Information about the styling props: [Apple documentation](https://developer.apple.com/documentation/sign_in_with_apple/displaying-sign-in-with-apple-buttons-on-the-web#Set-the-mode)

- `client-config`: The configuration object for the Apple login. [Configuration documentation](https://developer.apple.com/documentation/sign_in_with_apple/clientconfigi).

- `:on-success` defines a callback function to retrieve [Apple user data](https://developer.apple.com/documentation/sign_in_with_apple/configuring-your-webpage-for-sign-in-with-apple#Handle-the-Authorization-Response).
- `:on-failure` defines a callback if authentication fails.

The callbacks only work when the client-config `usePopup` is set to `true`.

`usePopup` set `false` will ignore the callbacks and redirect the user to the Apple login page and back to your `redirectURI` for server-side authentication.
