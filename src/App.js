import "./styles.css";
import EthCalc from "./EthCalc";
import useSWR from "swr";
import { Heading, Flex, Box, Container, Center } from "@chakra-ui/react";

import { appName, fetcherConfig } from "./config";
import { gasnowFetcher, parseGasReport } from "./utils";
import { useCallback, useState } from "react";
import { Header } from "./components/header/Header";
import { Footer } from "./components/footer/Footer";
import { UploadFile } from "./components/uploadFile/UploadFile";

export default function App() {
  const urlParams = new URLSearchParams(window.location.search);

  const initialReportData = urlParams?.get("data")
    ? JSON.parse(atob(urlParams?.get("data")))
    : null;

  const [reportData, setReportData] = useState(initialReportData);
  const { data, error } = useSWR(
    `https://www.gasnow.org/api/v3/gas/price?utm_source=${process.env.REACT_APP_GASNOW_APP_NAME}`,
    gasnowFetcher,
    fetcherConfig
  );

  const handleUpload = useCallback(async (files) => {
    const data = await files[0].text();

    const result = parseGasReport(data);

    setReportData(result);
  }, []);

  return (
    <Flex direction="column" alignItems="center" h="100%">
      <Header title="Gas Report Analyzer" />
      {!reportData && <UploadFile onUpload={handleUpload} />}
      <Flex alignItems="center" justifyContent="center" flex={1} width="100%">
        {reportData && <EthCalc {...data} reportData={reportData} />}
      </Flex>
      <Footer />
    </Flex>
  );
}
