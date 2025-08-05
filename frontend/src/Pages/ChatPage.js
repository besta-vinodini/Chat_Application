import { Box, Flex, useMediaQuery } from "@chakra-ui/react";
import { useState } from "react";
import Chatbox from "../components/Chatbox";
import MyChats from "../components/MyChats";
import SideDrawer from "../components/miscellaneous/SideDrawer";
import { ChatState } from "../Context/ChatProvider";

const Chatpage = () => {
  const { user } = ChatState();
  const [fetchAgain, setFetchAgain] = useState(false);
  const [isSmallScreen] = useMediaQuery("(max-width: 768px)");

  return (
    <Box w="100%" h="100vh" bg="linear-gradient(to bottom right, #e3f2fd, #bbdefb)">
      {user && <SideDrawer />}

      <Flex
        justify="space-between"
        h="91.5vh"
        px={isSmallScreen ? "5px" : "20px"}
        py="10px"
        gap="10px"
      >
        {/* Left Sidebar - My Chats */}
        {user && (
          <Box
            display={{ base: "none", md: "flex" }}
            flexDir="column"
            bg="white"
            borderRadius="lg"
            borderWidth="1px"
            w={{ md: "30%", lg: "25%" }}
            p="10px"
            boxShadow="lg"
            minW="250px"
          >
            <MyChats fetchAgain={fetchAgain} />
          </Box>
        )}

        {/* Right Chat Box */}
        {user && (
          <Box
            flex="1"
            display="flex"
            flexDir="column"
            bg="white"
            borderRadius="lg"
            borderWidth="1px"
            p="10px"
            boxShadow="lg"
            overflow="hidden"
          >
            <Chatbox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
          </Box>
        )}
      </Flex>
    </Box>
  );
};

export default Chatpage;