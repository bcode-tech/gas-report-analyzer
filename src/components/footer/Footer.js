import { ExternalLinkIcon } from "@chakra-ui/icons";
import { Box, Container, Text, Center, Link } from "@chakra-ui/react";

export const Footer = ({ title }) => (
  <Box h={50} w="100%" bg="brand.800">
    <Container maxW="6xl" h="100%">
      <Center h="100%">
        <Text color="brand.700">Powered by&nbsp;</Text>
        <Link
          href="https://bcode.cloud"
          isExternal
          color="brand.900"
          fontFamily="Barlow"
        >
          BCode
        </Link>
      </Center>
    </Container>
  </Box>
);
