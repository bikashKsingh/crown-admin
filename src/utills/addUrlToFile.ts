import { FILE_URL } from "../constants";

export function addUrlToFile(file: any) {
  if (file.includes("https://")) return file;
  return `${FILE_URL}/${file}`;
}
