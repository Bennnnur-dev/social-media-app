import { firestore } from "@/firebase.config";
import asyncWrapper from "@/scripts/asyncWrapper";
import { type Post } from "@/types";
import { addDoc, collection } from "firebase/firestore";

const collectionRef = collection(firestore, "posts");

export default function useFirestore() {
  async function postToDB(post: Post) {
    return await asyncWrapper<void>(async post => {
      await addDoc(collectionRef, post);
    }, post);
  }

  return { postToDB };
}
