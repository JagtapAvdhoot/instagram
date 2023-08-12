import { createContext, useState } from "react";


export const PostContext = createContext();


const PostProvider = ({ post, children }) => {
	const [isPostOpen, setIsPostOpen] = useState(false);

	return (
		<PostContext.Provider value={{
			isPostOpen, setIsPostOpen,
			...post
		}}>
			{children}
		</PostContext.Provider>
	);
};

export default PostProvider;