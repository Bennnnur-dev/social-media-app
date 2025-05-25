import { ref, uploadBytes } from "firebase/storage";
import { Platform } from "react-native";
import { storage } from "../firebase.config";
import asyncWrapper from "../scripts/asyncWrapper";

export default function useFirebaseStorage() {
  async function uploadImage(uri: string) {
    return await asyncWrapper(async uri => {
      if (!uri) throw new Error("Missing image URI");

      //fetches actual image data from its location (uri)
      const expoFilePath = "file://" + uri;
      const file = await fetch(expoFilePath);
      const blob = await file.blob();

      if (!blob) throw new Error("Unable to upload URI");

      const imgName = new Date().toISOString();
      const storageRef = ref(storage, `project/${Platform.OS}_${imgName}`);
      await uploadBytes(storageRef, blob, { contentType: "image/png" });
    }, uri);
  }

  return { uploadImage };
}
