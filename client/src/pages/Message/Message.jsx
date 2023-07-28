import React, { useEffect } from "react";
import PageLayout from "../../Layout/PageLayout";
import { Button, Flex, Image, Text, VStack, useEditable } from "@chakra-ui/react";
import { setSidebarWidthSelector, themeSelector, useGlobalStore } from "../../app/store";
import { useTheme } from "@emotion/react";

const Message = () => {

  const setSidebarWidth = useGlobalStore(setSidebarWidthSelector);

  return <PageLayout>
    <Flex maxH='100vh' height='100vh'>
      <UserList />
      <MessageScreen />
    </Flex>
  </PageLayout>;
};

export default Message;

const MessageScreen = ({ activeChat }) => {

  const theme = useGlobalStore(themeSelector);
  return (
    <>

      {
        activeChat ? (
          <>
            <ActiveChat />
          </>
        ) : (
          <VStack justifyContent='center' color='secondary' alignItems='center' flex="1" gap='3' p='5'>
            <MessageIconCircle color={theme === 'light' ? "rgb(0, 0, 0)" : "rgb(245, 245, 245)"} />
            <Text>Send private photos and messages to friend or group.</Text>
            <Button _hover={{ opacity: 0.9 }} variant='solid' bg="follow" color="secondary">Send message</Button> {/* on click open modal */}
          </VStack>
        )
      }

    </>
  )
}

const UserList = () => {
  // TODO: query to fetch following users
  return (
    <>
      <VStack flex='1' flexDirection='column' justifyContent='flex-start' alignItems='center' borderRight='1px' borderRightColor='border' maxWidth="320px">
        <Text>Will be here in future.</Text>
      </VStack>
    </>
  )
}

const ActiveChat = ({ activeChat }) => {
  return (
    <>
      <h1>Active chat</h1>
    </>
  )
}

const MessageIconCircle = ({ color }) => {
  return (
    <svg aria-label="" fill={color} height="96" role="img" viewBox="0 0 96 96" width="96"><path d="M48 0C21.532 0 0 21.533 0 48s21.532 48 48 48 48-21.532 48-48S74.468 0 48 0Zm0 94C22.636 94 2 73.364 2 48S22.636 2 48 2s46 20.636 46 46-20.636 46-46 46Zm12.227-53.284-7.257 5.507c-.49.37-1.166.375-1.661.005l-5.373-4.031a3.453 3.453 0 0 0-4.989.921l-6.756 10.718c-.653 1.027.615 2.189 1.582 1.453l7.257-5.507a1.382 1.382 0 0 1 1.661-.005l5.373 4.031a3.453 3.453 0 0 0 4.989-.92l6.756-10.719c.653-1.027-.615-2.189-1.582-1.453ZM48 25c-12.958 0-23 9.492-23 22.31 0 6.706 2.749 12.5 7.224 16.503.375.338.602.806.62 1.31l.125 4.091a1.845 1.845 0 0 0 2.582 1.629l4.563-2.013a1.844 1.844 0 0 1 1.227-.093c2.096.579 4.331.884 6.659.884 12.958 0 23-9.491 23-22.31S60.958 25 48 25Zm0 42.621c-2.114 0-4.175-.273-6.133-.813a3.834 3.834 0 0 0-2.56.192l-4.346 1.917-.118-3.867a3.833 3.833 0 0 0-1.286-2.727C29.33 58.54 27 53.209 27 47.31 27 35.73 36.028 27 48 27s21 8.73 21 20.31-9.028 20.31-21 20.31Z"></path></svg>
  )
}

const NewMessage = () => {
  return (
    <>

      <Text>New message modal</Text>

    </>
  )
}