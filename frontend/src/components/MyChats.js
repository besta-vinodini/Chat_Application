import { useEffect, useState } from "react";
import {
  Box,
  Stack,
  Text,
  Button,
  useToast,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import axios from "axios";

import { ChatState } from "../Context/ChatProvider";
import ChatLoading from "./ChatLoading";
import GroupChatModal from "./miscellaneous/GroupChatModal";
import { getSender } from "../config/ChatLogics";

const MyChats = ({ fetchAgain }) => {
  const [loggedUser, setLoggedUser] = useState();

  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();
  const toast = useToast();

  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get("/api/chat", config);
      setChats(data);
    } catch (error) {
      toast({
        title: "Error Occurred!",
        description: "Failed to load the chats",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("userInfo"));
    setLoggedUser(storedUser);
    fetchChats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchAgain]);

  return (
    <Box
      display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDir="column"
      alignItems="center"
      p={3}
      bg="white"
      width={{ base: "100%", md: "100%" }}
      maxWidth="350px"
      borderRadius="lg"
      borderWidth="1px"
      boxShadow="lg"
      bgGradient="linear(to-b, white, blue.50)"
    >
      {/* Header */}
      <Box
        pb={3}
        px={3}
        fontSize={{ base: "22px", md: "24px" }}
        fontWeight="semibold"
        fontFamily="Work sans"
        display="flex"
        w="100%"
        justifyContent="space-between"
        alignItems="center"
        borderBottom="1px solid #CBD5E0"
      >
        My Chats
        <GroupChatModal>
          <Button
            size="sm"
            rightIcon={<AddIcon />}
            bg="gray.100"
            _hover={{ bg: "gray.200" }}
            fontSize="sm"
          >
            New Group Chat
          </Button>
        </GroupChatModal>
      </Box>

      {/* Chat List */}
      <Box
        display="flex"
        flexDir="column"
        mt={2}
        gap={2}
        bg="white"
        w="100%"
        height="calc(100vh - 190px)"
        borderRadius="md"
        overflowY="auto"
        paddingRight={2}
        paddingBottom={2}
      >
        {chats ? (
          <Stack spacing={2}>
            {chats.map((chat) => (
              <Box
                key={chat._id}
                onClick={() => setSelectedChat(chat)}
                cursor="pointer"
                bg={selectedChat === chat ? "teal.400" : "gray.100"}
                color={selectedChat === chat ? "white" : "gray.800"}
                px={4}
                py={2}
                borderRadius="md"
                boxShadow="sm"
                _hover={{ bg: selectedChat === chat ? "teal.500" : "gray.200" }}
                transition="all 0.2s"
              >
                <Text fontWeight="bold" fontSize="sm" isTruncated>
                  {!chat.isGroupChat ? getSender(loggedUser, chat.users) : chat.chatName}
                </Text>
                {chat.latestMessage && (
                  <Text
                    fontSize="xs"
                    mt={1}
                    color={selectedChat === chat ? "white" : "gray.600"}
                    noOfLines={1}
                  >
                    <b>{chat.latestMessage.sender.name}:</b>{" "}
                    {chat.latestMessage.content}
                  </Text>
                )}
              </Box>
            ))}
          </Stack>
        ) : (
          <ChatLoading />
        )}
      </Box>
    </Box>

  );
};

export default MyChats;