import requestServer from "../util/axios";

const token = localStorage.getItem("ig_token");

// export const getSignedUser = () =>
//   requestServer.get(`/user/signed-user`,
//     { headers: { Authorization: localStorage.getItem("ig_token") } }).then((res) => res.data.data).catch(error => error);

export const getSignedUser = async () => {
	try {
		const { data } = await requestServer.get("/user/signed-user", { headers: { Authorization: localStorage.getItem("ig_token") } });
		return data.data;
	} catch (error) {
		throw error;
	}
};

export const getUserProfile = (search) =>
	requestServer.get(`/user/profile?user=${search}`,
		{ headers: { Authorization: localStorage.getItem("ig_token") } }).then((res) => res.data.data).catch(error => error);

export const getSearch = (search) =>
	requestServer.get(`/user/search?search=${search}`,
		{ headers: { Authorization: localStorage.getItem("ig_token") } }).then((res) => res.data.data).catch(error => error);

export const getUserSuggestion = () =>
	requestServer.get("/user/suggestion",
		{ headers: { Authorization: localStorage.getItem("ig_token") } }).then((res) => res.data.data).catch(error => error);

export const followUser = (userId) =>
	requestServer.put(`/user/follow?uid=${userId}`, {},
		{ headers: { Authorization: localStorage.getItem("ig_token") } }).then((res) => res.data.data).catch(error => error);

export const favoriteUser = (userId) =>
	requestServer.put(`/user/favorite?uid=${userId}`, {},
		{ headers: { Authorization: localStorage.getItem("ig_token") } }).then((res) => res.data.data).catch(error => error);
