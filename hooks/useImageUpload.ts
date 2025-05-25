import asyncWrapper, { type Result } from "@/scripts/asyncWrapper";
import * as imagePicker from "expo-image-picker";

export default async function useImageUpload(): Promise<Result> {
  return await asyncWrapper(async () => {
    const upload = await imagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      aspect: [5, 3],
      quality: 1,
      allowsMultipleSelection: true,
    });

    return upload.assets;
  });
}
