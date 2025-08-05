import { Avatar, Box, Text } from "@chakra-ui/react";
import React from "react";

const UserListItem = ({ user, handleFunction }) => {
  return (
    <Box
      onClick={handleFunction}
      cursor="pointer"
      bg="#E8E8E8"
      _hover={{
        background: "#38B2AC",
        color: "white",
      }}
      w="100%"
      display="flex"
      alignItems="center"
      px={3}
      py={2}
      mb={2}
      borderRadius="lg"
    >
      <Avatar
        mr={2}
        size="sm"
        name={user.name}
        src={user.pic}
      />
      <Box>
        <Text fontWeight="medium">{user.name}</Text>
        <Text fontSize="xs">
          <strong>Email:</strong> {user.email}
        </Text>
      </Box>
    </Box>
  );
};

export default UserListItem;
