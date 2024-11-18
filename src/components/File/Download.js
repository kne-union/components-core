import { Download, useDownload, downloadBlobFile } from "@kne/react-file";

Download.useDownload = useDownload;
Download.downloadBlobFile = downloadBlobFile;

export default Download;
export { useDownload, downloadBlobFile };
