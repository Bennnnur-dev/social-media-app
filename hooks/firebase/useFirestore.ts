import { type Post } from "@/app/(post)/FinalEdit";
import { firestore } from "@/firebase.config";
import asyncWrapper from "@/scripts/asyncWrapper";
import { addDoc, collection } from "firebase/firestore";

const collectionRef = collection(firestore, "posts");

export default function useFirestore() {
  async function postToDB(post: Post) {
    return await asyncWrapper(async post => {
      await addDoc(collectionRef, post);
    }, post);
  }

  return { postToDB };
}
