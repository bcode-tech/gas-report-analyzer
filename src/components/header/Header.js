import { Box, Container, Heading, Center } from "@chakra-ui/react";

export const Header = ({ title }) => (
  <Box h={100} w="100%" bg="brand.800">
    <Container maxW="6xl" h="100%">
      <Center h="100%">
        <Heading color="brand.900">{title}</Heading>
      </Center>
    </Container>
  </Box>
);
