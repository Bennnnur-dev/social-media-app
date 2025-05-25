import { Platform } from "react-native";

//in Android, the uri retrieved from useLocalSearchParams is partially encoded (only one section is), which leads to errors loading the image
export default function normalizeUri(uri: string): string {
  try {
    if (Platform.OS !== "android" || !uri.includes("anonymous")) return uri;
    const split = uri.split(/[\/F]/);
    const decodedPart = encodeURIComponent(split[9]);
    const fixedURI = split.slice(0, 9).join("/") + "/" + decodedPart + "F" + split.slice(10).join("/");
    return fixedURI;
  } catch (error) {
    return uri;
  }
}
