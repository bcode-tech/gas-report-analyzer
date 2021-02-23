import { ExternalLinkIcon } from "@chakra-ui/icons";
import { Box, Container, Text, Center, Link, Image } from "@chakra-ui/react";

const footerPoweredBy = process.env.REACT_APP_FOOTER_POWERED_BY;
const footerLink = process.env.REACT_APP_FOOTER_LINK;
const footerLogoURL = process.env.REACT_APP_FOOTER_LOGO;

export const Footer = () => (
  <Box h={50} w="100%" bg="brand.800">
    <Container maxW="6xl" h="100%">
      <Center h="100%">
        <Text color="brand.700">Powered by&nbsp;</Text>
        {footerLogoURL ? (
          <Image
            src={footerLogoURL}
            h={5}
            onClick={() => window.open(footerLink, "_blank")}
            cursor="pointer"
          />
        ) : (
          <Link
            href={footerLink}
            isExternal
            color="brand.900"
            fontFamily="Barlow"
          >
            {footerPoweredBy}
          </Link>
        )}
      </Center>
    </Container>
  </Box>
);
