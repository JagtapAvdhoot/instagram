import requestServer from "../util/axios";

// const token = localStorage.getItem("ig_v2_token");

export const signIn = (body) =>
	requestServer
		.post("/authentication/sign-in", body)
		.then((res) => res.data.data)
		.catch(error => error);

export const signUp = (body) =>
	requestServer
		.post("/authentication/sign-up", body)
		.then((res) => res.data.data).catch(error => error);

// export const forgetPassword = () => {}
// export const resetPassword = () => {}
