import cryptoRandomString from "crypto-random-string";

const onDownload = (e, data, donwloadLink) => {
  // Create "Blob"
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });

  // Create URL from Blob
  const url = window.URL.createObjectURL(blob);

  // Create unique id for JSON file
  const cryptoID = cryptoRandomString({ length: 10 });

  // Use URL and link to start download
  donwloadLink.current.href = url;

  // Setting filename
  donwloadLink.current.setAttribute("download", `coatmaster_flex_${cryptoID}`);
  donwloadLink.current.click();

  // Free URL resources
  URL.revokeObjectURL(url);
}

export default onDownload