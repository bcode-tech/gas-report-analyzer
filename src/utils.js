export const toGWei = (wei) => Math.round(wei / 1000000000);
export const toEth = (wei) => parseFloat(wei / 1000000000000000000).toFixed(4);

export const gasnowFetcher = (...args) =>
  fetch(...args)
    .then((res) => res.json())
    .then(({ data }) => data);

export const ethplorerFetcher = (...args) =>
  fetch(...args)
    .then((res) => res.json())
    .then(({ result }) => result);

export const parseRow = (row) => {
  const cleaned = row.replaceAll(/[|│ ]/gi, "");

  // Is divider
  if (cleaned[0] === "·") {
    return { isDivider: true, value: cleaned };
  }

  const splitted = cleaned.split("·");

  if (splitted.length < 6 || splitted.includes("#calls")) {
    return { isHeader: true, value: splitted };
  } else {
    return { isRow: true, value: splitted };
  }
};

export const parseGasReport = (text) => {
  const rows = text.split("\n");

  let result = {};
  let currSection = null;
  for (let row of rows) {
    const currRow = parseRow(row);

    if (currRow.isRow) {
      // Initialize array
      if (!result[currSection]) {
        result[currSection] = [];
      }

      if (currSection === "Methods") {
        result[currSection] = [
          ...result[currSection],
          {
            contract: currRow.value[0],
            method: currRow.value[1],
            min: currRow.value[2],
            max: currRow.value[3],
            avg: currRow.value[4],
            calls: currRow.value[5],
            eur: currRow.value[6],
          },
        ];
      } else if (currSection === "Deployments") {
        result[currSection] = [
          ...result[currSection],
          {
            contract: currRow.value[0],
            min: currRow.value[1],
            max: currRow.value[2],
            avg: currRow.value[3],
            perc_limit: currRow.value[4].replace("%", ""),
          },
        ];
      }
    }

    if (
      currRow.isHeader &&
      ["Methods", "Deployments"].includes(currRow.value[0])
    ) {
      currSection = currRow.value[0];
    }
  }

  return result;
};
