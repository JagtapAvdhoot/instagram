import { Avatar, Button, HStack, Text, VStack, useQuery } from "@chakra-ui/react";
import { memo } from "react";
import { useNavigate } from "react-router-dom";
import { signedUserSelector, useAuthStore } from "../../../app/store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { homeFeedKey, signedUserKey, userFollowKey } from "../../../react-query";
import { followUser } from "../../../services/user.service";


export const UserItemComponent = ({ user, showFollow = true }) => {
  const signedUser = useAuthStore(signedUserSelector);

  const queryClient = useQueryClient();
  const { mutate: followUserFunction, isLoading, isError, isSuccess } = useMutation({
    mutationKey: [userFollowKey],
    mutationFn: (userId) => followUser(userId),
    onSuccess: () => {
      queryClient.invalidateQueries([signedUserKey], [homeFeedKey])
    }
  })

  const navigate = useNavigate();

  const userHasFollowed = signedUser?.followingUsers.findIndex(
    (usr) => usr.user === user._id
  );

  const handleFollowUser = () => {
    followUserFunction(user._id);
  };

  return (
    <HStack minW="64" width="full" justifyContent="space-between" py="3">
      <HStack
        gap="4"
        cursor="pointer"
        onClick={() => navigate(`/username/${user?.username}`)}
      >
        <Avatar size="sm" src={user?.avatar} name={user?.username} />
        <VStack gap="1" alignItems="flex-start">
          <Text fontSize="small" fontWeight="medium">
            {user?.username}
          </Text>
          <Text
            fontWeight="thin"
            fontSize="x-small"
          >
            Followed by some bitch...
          </Text>
        </VStack>
      </HStack>

      {showFollow && (
        <Button
          variant="unstyled"
          _hover={
            !isSuccess && {
              bg: "none",
            }
          }
          color="follow"
          height="30px"
          onClick={handleFollowUser}
          isLoading={isLoading}
          isDisabled={isSuccess ? true : false}
        >
          <Text fontSize="small">
            {isSuccess
              ? "User is Followed"
              : userHasFollowed === -1
                ? "Follow"
                : "Unfollow"}
          </Text>
        </Button>
      )}
    </HStack>
  );
};

export default memo(UserItemComponent);
