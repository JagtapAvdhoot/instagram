import requestServer from "../util/axios";

export const getHomeFeed = ({
	offset = 0,
	limit = 10,
	type = "home",
	select = "-__v -postComments",
}) =>
	requestServer
		.get(
			`/post/feed?off=${offset}&lmt=${limit}&type=${type}$select=${select}`,
			{ headers: { Authorization: localStorage.getItem("ig_token") } }
		)
		.then((res) => res.data.data).catch(error => error);

export const getExploreFeed = ({
	offset = 0,
	limit = 20,
	type = "home",
	select = "media",
}) =>
	requestServer
		.get(
			`/post/explore?off=${offset}&lmt=${limit}&type=${type}$select=${select}`,
			{ headers: { Authorization: localStorage.getItem("ig_token") } }
		)
		.then((res) => res.data.data).catch(error => error);

export const getFilter = () =>
	requestServer
		.get("/post/filter", { headers: { Authorization: localStorage.getItem("ig_token") } })
		.then((res) => res.data.data).catch(error => error);

export const removePost = (postId) =>
	requestServer
		.delete(`/post/remove?pid=${postId}`, {
			headers: { Authorization: localStorage.getItem("ig_token") },
		})
		.then((res) => res.data.data).catch(error => error);

export const removeFile = (media) =>
	requestServer
		.post("/post/remove-file", media, { headers: { Authorization: localStorage.getItem("ig_token") } })
		.then((res) => res.data.data).catch(error => error);

export const pinPost = (postId) =>
	requestServer
		.get(`/post/pin?pid=${postId}`, { headers: { Authorization: localStorage.getItem("ig_token") } })
		.then((res) => res.data.data).catch(error => error);

export const savePost = (postId) =>
	requestServer
		.get(`/post/save?pid=${postId}`, { headers: { Authorization: localStorage.getItem("ig_token") } })
		.then((res) => res.data.data).catch(error => error);

export const likePost = (postId) =>
	requestServer
		.get(`/post/like?pid=${postId}`, { headers: { Authorization: localStorage.getItem("ig_token") } })
		.then((res) => res.data.data).catch(error => error);

export const uploadFile = (media) =>
	requestServer
		.post("/post/upload-file", media, { headers: { Authorization: localStorage.getItem("ig_token") } })
		.then((res) => res.data.data).catch(error => error);

export const reportPost = (report) =>
	requestServer
		.put("/post/report", report, { headers: { Authorization: localStorage.getItem("ig_token") } })
		.then((res) => res.data.data).catch(error => error);

export const createPost = (body) =>
	requestServer
		.post("/post/create", body, { headers: { Authorization: localStorage.getItem("ig_token") } })
		.then((res) => res.data.data).catch(error => error);

export const updatePost = (body) =>
	requestServer
		.put("/post/update", body, { headers: { Authorization: localStorage.getItem("ig_token") } })
		.then((res) => res.data.data).catch(error => error);

// comment

export const addComment = (body) =>
	requestServer
		.post("/comment/add", body, { headers: { Authorization: localStorage.getItem("ig_token") } })
		.then((res) => res.data.data).catch(error => error);

export const updateComment = (body) =>
	requestServer
		.post("/comment/update", body, { headers: { Authorization: localStorage.getItem("ig_token") } })
		.then((res) => res.data.data).catch(error => error);

export const likeComment = (body) =>
	requestServer
		.get("/comment/like", body, { headers: { Authorization: localStorage.getItem("ig_token") } })
		.then((res) => res.data.data).catch(error => error);

export const deleteReply = (body) =>
	requestServer
		.delete("/comment/delete/reply", body, { headers: { Authorization: localStorage.getItem("ig_token") } })
		.then((res) => res.data.data).catch(error => error);

export const deleteComment = (body) =>
	requestServer
		.delete("/comment/delete", body, { headers: { Authorization: localStorage.getItem("ig_token") } })
		.then((res) => res.data.data).catch(error => error);

export const likeReply = (body) =>
	requestServer
		.get("/comment/like/reply", body, { headers: { Authorization: localStorage.getItem("ig_token") } })
		.then((res) => res.data.data).catch(error => error);

export const addReply = (body) =>
	requestServer
		.post("/comment/add/reply", body, { headers: { Authorization: localStorage.getItem("ig_token") } })
		.then((res) => res.data.data).catch(error => error);
