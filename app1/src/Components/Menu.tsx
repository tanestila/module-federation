import { Flex, Link } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

export default function Menu() {
  return (
    <Flex direction={"column"}>
      <Link as={RouterLink} to="/home">
        Home
      </Link>
      <Link as={RouterLink} to="/app2">
        App2
      </Link>
    </Flex>
  );
}
