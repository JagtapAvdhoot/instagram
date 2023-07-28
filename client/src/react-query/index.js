import { QueryClient } from "@tanstack/react-query";

// TODO: custom error handler
const customErrorHandler = () => {

}


export const queryClient = new QueryClient({
    defaultOptions:{
        queries:{
            cacheTime:100 * 60 * 60 * 10,
            refetchOnWindowFocus:false,
            refetchOnMount:false,
            refetchOnReconnect:false,
        },
    },
})

// query constants
export const signedUserKey = 'SignedUser';
export const postFilterKey = 'PostFilters';
export const removeFileKey = 'RemoveFile';
export const createPostKey = 'CreatePost';
export const uploadFileKey = 'UploadFile';
export const removePostKey = 'RemovePost';
export const likePostKey = 'LikePost';
export const savePostKey = 'SavePost';
export const userFavoriteKey = 'UserFavorite';
export const userFollowKey = 'UserFollow';
export const signInKey = 'SignIn';
export const signUpKey = 'SignUp';
export const homeFeedKey = 'HomeFeed';
export const exploreFeedKey = 'ExploreFeed';
export const userPageKey = 'UserPage';