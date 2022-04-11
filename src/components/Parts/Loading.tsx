import { Flex, Spinner } from "@chakra-ui/react";
import SearchBox from "./SearchBox";

export const Loading = () => {
  return (
    <Flex justifyContent="center">
      <Flex
        maxWidth="860px"
        width="100%"
        direction="column"
        p={{ base: "0.5", lg: "4" }}
      >
        <SearchBox />
        <Flex w="100%" h="50vh" justifyContent="center" alignItems="center">
          <Spinner size="xl" thickness="4px" speed="0.5s" label="loading" />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Loading;
