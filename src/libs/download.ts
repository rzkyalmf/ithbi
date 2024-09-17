import { Downloader } from "nodejs-file-downloader";

interface DownloadResult {
  filePath: string | null;
  downloadStatus: string;
}

export async function downloadFile(url: string, directory = "./downloads"): Promise<DownloadResult> {
  const downloader = new Downloader({
    url,
    directory,
  });

  try {
    const { filePath, downloadStatus } = await downloader.download();
    console.log("Download completed successfully");
    return { filePath, downloadStatus };
  } catch (error) {
    console.error("Download failed", error);
    throw error;
  }
}
