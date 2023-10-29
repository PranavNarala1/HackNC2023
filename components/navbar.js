import React from "react";
import { Flex, Box, Image, Text, Avatar, Link, Icon } from "@chakra-ui/react";
import { EditIcon, SpinnerIcon, StarIcon, Search2Icon } from "@chakra-ui/icons";
import { UserButton } from "@clerk/nextjs";

const Tab = ({ text, href, icon }) => (
  <Link href={href} textDecoration="none" _hover={{ textDecoration: "none" }}>
    <Box
      color="#FFF5DD"
      fontSize="18px"
      p={2}
      cursor="pointer"
      _hover={{
        background: "#2B4468",
        color: "white",
        fontWeight: "bold",
        transition: "background 0.5s, color 0.5s"
      }}
      borderRadius="10px"
      display="flex"
      alignItems="center"
      mt={3}
      ml={4}
    >
      {icon && <Icon as={icon} color="#FFF5DD" mr={2} w={5} h={5} />}
      {text}
    </Box>
  </Link>
);

export const App = () => {
  return (
    <Flex flexDirection="column" minHeight="25vh" bg="#F0EBD8">
      <Flex
        justifyContent="space-between"
        p={4}
        bg="#1D2D44"
        pb={5}
        boxShadow="0px 20px 20px rgba(0, 0, 0, 0.1)"
        height="100px"
      >
        <Image
          src="/EasyEats_logo.png"
          alt="EasyEats_Logo"
          width="350px"
          height="70px"
        />
        <Flex justifyContent="space-around">
          <Tab text="Map" href="/map" icon={Search2Icon} />
          <Tab text="Make/View Request" href="/submitreq" icon={EditIcon} />
          <Tab text="Current Requests" href="/myreq" icon={SpinnerIcon} />
          <Tab text="Leaderboard" href="/leaderboard" icon={StarIcon} />
        </Flex>
        <Box
          bg="#2B4468"
          borderRadius="10px"
          ml={4}
          display="flex"
          alignItems="center"
          width="350px"
          height="70px"
        >
          <UserButton afterSignOutUrl="/">
            size="md"
            bg="gray.500"
            ml={3}
            color="#FFF5DD"
            pl = {2}
            </UserButton>
          <Box h="50px" w="1px" mx={4} bg="#FFF5DD" />
          <Box>
            <Text fontSize={16} color="#FFF5DD">
              Logged In!
            </Text>
            <Text fontSize={16} color="#FFF5DD">
              
            </Text>
          </Box>
        </Box>
      </Flex>
    </Flex>
  );
};

export default App;