import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const useSocket = () => {
	const [socketInstance, setSocketInstance] = useState(null);

	useEffect(() => {
		let socket;
		if (!socketInstance) {
			socket = io(import.meta.env.VITE_SERVER_URL);
			setSocketInstance(socket);
		}

		return () => {
			if (socketInstance) {
				socket.disconnect();
			}
		};
	}, []);

	return {
		socketInstance,
	};
};

export default useSocket;
