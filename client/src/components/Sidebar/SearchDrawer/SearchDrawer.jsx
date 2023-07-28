import { memo, useState } from "react";
import {
  Box,
  Divider,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

import { errorToast } from "../../../util/toast";

import UserItemComponent from "../../SuggestedUser/UserItemComponent/UserItemComponent";
import SidebarDrawer from '../Drawer/Drawer';
import { useQuery } from "@tanstack/react-query";
import { signedUserSelector, useAuthStore } from "../../../app/store";
import { getSearch } from "../../../services/user.service";

const SearchDrawer = ({ isOpen, onClose }) => {
  const [search, setSearch] = useState("");

  const navigate = useNavigate();
  const toast = useToast();
  const searchChangeHandler = (event) => {
    setSearch(event.target.value);
  };

  const signedUser = useAuthStore(signedUserSelector);

  const {
    isLoading,
    isError,
    isSuccess,
    data = { users: [] }
  } = useQuery({
    queryKey: ['Search',search],
    queryFn: () => getSearch(search),
    enabled: search.trim().length > 0,
    staleTime: 1000 * 60,
    onError: () => {
      toast.closeAll();
      toast({
        message: "Error while getting searched users...",
        ...errorToast,
      });
    }
  });

  const navigateToUserPage = (username) => {
    navigate(`/username/${username}`);
    onClose()
  }
  return (
    <>
      <SidebarDrawer onClose={onClose} isOpen={isOpen} name="Search">
        <InputGroup>
          {search.length === 0 && (
            <InputLeftElement color="secondaryText">
              <FiSearch />
            </InputLeftElement>
          )}
          <Input
            value={search}
            onChange={searchChangeHandler}
            name="search"
            placeholder="Search ..."
            variant="ghost"
            bg="hover"
          />
          {search.length > 0 && (
            <InputRightElement>
              <IconButton
                bg="transparent"
                onClick={() => setSearch("")}
                _hover={{ bg: "none" }}
                color="secondaryText"
                isLoading={isLoading}
              >
                <AiOutlineCloseCircle />
              </IconButton>
            </InputRightElement>
          )}
        </InputGroup>

        <Divider mt="10" color="secondaryText" />
        <HStack justifyContent="space-between" width="full">
          <Text>Recent</Text>
          <Box>{isLoading && <Spinner size="md" />}</Box>
        </HStack>
        {signedUser?.previousSearch.length > 0
          ? signedUser?.previousSearch.map((item, idx) => (
            <Box width="full" key={idx} onClick={() => navigateToUserPage(item.username)}>
              <UserItemComponent showFollow={false} user={item} />
            </Box>
          ))
          : null}
        {data?.users.length > 0 && search.length > 0
          ? isSuccess &&
          !isLoading &&
          data?.users.map((item, idx) => (
            <Box width="full" key={idx} onClick={() => navigateToUserPage(item.username)}>
              <UserItemComponent showFollow={false} user={item} />
            </Box>
          ))
          : null}
      </SidebarDrawer>
    </>
  );
};

export default memo(SearchDrawer);
