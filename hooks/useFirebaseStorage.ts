import { ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebase.config";
import asyncWrapper from "../scripts/asyncWrapper";

export default function useAuth() {
  async function uploadImage() {
    return await asyncWrapper(async () => {
      const storageRef = ref(storage, "project/");
      await uploadBytes(storageRef, require("@/assets/images/lol.avif"));
    });
  }

  //   async function signOutUser() {
  //     return await asyncWrapper(async () => {
  //       await signOut(auth);
  //     });
  //   }

  return { uploadImage };
}
