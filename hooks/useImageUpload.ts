import asyncWrapper, { type Result } from "@/scripts/asyncWrapper";
import * as imagePicker from "expo-image-picker";
import { type ImagePickerAsset } from "expo-image-picker";

export default async function useImageUpload(): Promise<Result<ImagePickerAsset[]>> {
  return await asyncWrapper(async () => {
    const upload = await imagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      aspect: [5, 3],
      quality: 1,
      allowsMultipleSelection: true,
    });

    if (!upload.assets) return [];

    return upload.assets;
  });
}
