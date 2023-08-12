import axios from "axios";

const backendUrl =
  import.meta.env.VITE_SERVER_URL + import.meta.env.VITE_SERVER_PREFIX;

const cancelToken = axios.CancelToken.source();

const requestServer = axios.create({
	baseURL: backendUrl,
	withCredentials: true,
	cancelToken: cancelToken.token,
});

export default requestServer;
