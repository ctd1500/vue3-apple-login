import { useScript } from "./utils";

const signIn = (authOptions, onSuccess, onError) => {
	useScript()
		.then(() => {
			if (!window.AppleID) {
				throw "Apple ID not loaded";
			}

			window.AppleID.auth.init(authOptions);

			return window.AppleID.auth
				.signIn()
				.then((response) => {
					if (onSuccess) {
						onSuccess(response);
					}

					return response;
				})
				.catch((err) => {
					if (onError) {
						onError(err);
					} else {
						console.error(err);
					}
					return null;
				});
		})
		.catch((err) => {
			if (onError) {
				onError(err);
			} else {
				console.error(err);
			}
		});
};

export default { signIn };
