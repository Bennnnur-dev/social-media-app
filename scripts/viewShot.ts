import { View } from "react-native";
import { captureRef } from "react-native-view-shot";
import asyncWrapper from "./asyncWrapper";

export default async function captureImage(ref: View) {
  return await asyncWrapper(async ref => {
    const uri = await captureRef(ref, {
      format: "png",
      quality: 1,
    });
    return uri;
  }, ref);
}
