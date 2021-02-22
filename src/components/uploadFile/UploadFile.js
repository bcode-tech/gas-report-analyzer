import { Box, Flex, Heading, Input, Text } from "@chakra-ui/react";

// export const UploadFile = () => (
//   <Box>
//     <Heading size="sm">Upload the generated gas report in txt format</Heading>
//     <br />
//     <Input type="file" onChange={handleChange} accept="txt" />
//   </Box>
// );

import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { UploadIcon } from "../../icons/uploadIcon/UploadIcon";

export const UploadFile = ({ onUpload }) => {
  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
    onUpload && onUpload(acceptedFiles);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <Flex
      {...getRootProps()}
      width="100%"
      height="100%"
      alignItems="center"
      justifyContent="center"
      cursor="pointer"
      bg={isDragActive ? "brand.700" : ""}
      transition="background-color 400ms ease-in"
    >
      <Input {...getInputProps()} />
      <Flex
        direction="column"
        height={200}
        alignItems="center"
        justifyContent="space-between"
      >
        {isDragActive ? (
          <>
            <UploadIcon animate />
            <Text p={5} color="brand.800">
              Drop it here ...
            </Text>
          </>
        ) : (
          <>
            <UploadIcon />
            <Text p={5} color="brand.800">
              Drag & Drop your gas report txt file here!
            </Text>
          </>
        )}
      </Flex>
    </Flex>
  );
};

// https://www.flaticon.com/authors/kiranshastry
