import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Heading,
  Tooltip,
  Flex,
  Button,
  useClipboard,
  useToast,
} from "@chakra-ui/react";
import useSWR from "swr";
import { useCallback, useEffect } from "react";

import { toEth, ethplorerFetcher } from "./utils";
import EthereumIcon from "./ethereumIcon";
import { CopyIcon } from "@chakra-ui/icons";

export default ({ rapid, fast, standard, slow, timestamp, reportData }) => {
  const { Methods, Deployments } = reportData;
  const toast = useToast();

  const {
    data,
    error,
  } = useSWR(
    `https://api.etherscan.io/api?module=stats&action=ethprice&apikey=${process.env.REACT_APP_ETHERSCAN_API_KEY}`,
    ethplorerFetcher,
    { refreshInterval: 120000 }
  );

  const ethusd = data?.ethusd || 0;

  const calcExchange = useCallback((eth) => eth * ethusd, [ethusd]);

  const { hasCopied, onCopy } = useClipboard(
    encodeURI(
      `${window.location.host}?data=${btoa(JSON.stringify(reportData))}`
    )
  );

  useEffect(() => {
    if (hasCopied) {
      toast({
        title: "Link copied",
        description:
          "A link to this report has been generated and copied to the clipboard",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
    }
  }, [hasCopied]);

  return (
    <Flex direction="column">
      <Flex justifyContent="flex-end" pt={5} pb={5}>
        <Button leftIcon={<CopyIcon />} onClick={onCopy}>
          Get link
        </Button>
      </Flex>
      <Box>
        <Heading>Methods</Heading>
        <Table>
          <Thead>
            <Tr>
              <Th>Contract</Th>
              <Th>Method</Th>
              <Th>Min</Th>
              <Th>Max</Th>
              <Th>Avg</Th>
              <Th>slow</Th>
              <Th>standard</Th>
              <Th>fast</Th>
              <Th>rapid</Th>
            </Tr>
          </Thead>
          <Tbody>
            {Methods?.map((method) => {
              const columns = Object.values(method);
              return (
                <Tr key={method.method}>
                  {columns
                    .filter((el, i) => i < 5)
                    .map((val, j) => (
                      <Td key={j}>{val}</Td>
                    ))}

                  <Td key="slow">
                    <Tooltip
                      label={`${calcExchange(toEth(columns[4] * slow)).toFixed(
                        2
                      )}$`}
                      placement="top"
                    >
                      <Flex
                        cursor="pointer"
                        direction="row"
                        alignItems="center"
                        justifyContent="space-around"
                      >
                        {toEth(columns[4] * slow)}
                        <EthereumIcon width={15} height={15} />
                      </Flex>
                    </Tooltip>
                  </Td>
                  <Td key="standard">
                    <Tooltip
                      label={`${calcExchange(
                        toEth(columns[4] * standard)
                      ).toFixed(2)}$`}
                      placement="top"
                    >
                      <Flex
                        cursor="pointer"
                        direction="row"
                        alignItems="center"
                        justifyContent="space-around"
                      >
                        {toEth(columns[4] * standard)}
                        <EthereumIcon width={15} height={15} />
                      </Flex>
                    </Tooltip>
                  </Td>
                  <Td key="fast">
                    <Tooltip
                      label={`${calcExchange(toEth(columns[4] * fast)).toFixed(
                        2
                      )}$`}
                      placement="top"
                    >
                      <Flex
                        cursor="pointer"
                        direction="row"
                        alignItems="center"
                        justifyContent="space-around"
                      >
                        {toEth(columns[4] * fast)}
                        <EthereumIcon width={15} height={15} />
                      </Flex>
                    </Tooltip>
                  </Td>
                  <Td key="rapid">
                    <Tooltip
                      label={`${calcExchange(toEth(columns[4] * rapid)).toFixed(
                        2
                      )}$`}
                      placement="top"
                    >
                      <Flex
                        cursor="pointer"
                        direction="row"
                        alignItems="center"
                        justifyContent="space-around"
                      >
                        {toEth(columns[4] * rapid)}
                        <EthereumIcon width={15} height={15} />
                      </Flex>
                    </Tooltip>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </Box>
      <Box>
        <Heading>Deployments</Heading>
        <Table>
          <Thead>
            <Tr>
              <Th>Contract</Th>
              <Th>Min</Th>
              <Th>Max</Th>
              <Th>Avg</Th>
              <Th>slow</Th>
              <Th>standard</Th>
              <Th>fast</Th>
              <Th>rapid</Th>
            </Tr>
          </Thead>
          <Tbody>
            {Deployments?.map((contract) => {
              const columns = Object.values(contract);
              return (
                <Tr key={contract.contract}>
                  {columns
                    .filter((el, i) => i < 4)
                    .map((val, j) => (
                      <Td key={j}>{val}</Td>
                    ))}

                  <Td key="slow">
                    <Tooltip
                      label={`${calcExchange(toEth(columns[3] * slow)).toFixed(
                        2
                      )}$`}
                      placement="top"
                    >
                      <Flex
                        cursor="pointer"
                        direction="row"
                        alignItems="center"
                        justifyContent="space-around"
                      >
                        {toEth(columns[3] * slow)}
                        <EthereumIcon width={15} height={15} />
                      </Flex>
                    </Tooltip>
                  </Td>
                  <Td key="standard">
                    <Tooltip
                      label={`${calcExchange(
                        toEth(columns[3] * standard)
                      ).toFixed(2)}$`}
                      placement="top"
                    >
                      <Flex
                        cursor="pointer"
                        direction="row"
                        alignItems="center"
                        justifyContent="space-around"
                      >
                        {toEth(columns[3] * standard)}
                        <EthereumIcon width={15} height={15} />
                      </Flex>
                    </Tooltip>
                  </Td>
                  <Td key="fast">
                    <Tooltip
                      label={`${calcExchange(toEth(columns[3] * fast)).toFixed(
                        2
                      )}$`}
                      placement="top"
                    >
                      <Flex
                        cursor="pointer"
                        direction="row"
                        alignItems="center"
                        justifyContent="space-around"
                      >
                        {toEth(columns[3] * fast)}
                        <EthereumIcon width={15} height={15} />
                      </Flex>
                    </Tooltip>
                  </Td>
                  <Td key="rapid">
                    <Tooltip
                      label={`${calcExchange(toEth(columns[3] * rapid)).toFixed(
                        2
                      )}$`}
                      placement="top"
                    >
                      <Flex
                        cursor="pointer"
                        direction="row"
                        alignItems="center"
                        justifyContent="space-around"
                      >
                        {toEth(columns[3] * rapid)}
                        <EthereumIcon width={15} height={15} />
                      </Flex>
                    </Tooltip>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </Box>
    </Flex>
  );
};
