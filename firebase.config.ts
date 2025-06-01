import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBjRTp1U3D81Ba5v1vbkZs4VsUcKrMcKpM",
  authDomain: "fir-tutorial-516f1.firebaseapp.com",
  projectId: "fir-tutorial-516f1",
  storageBucket: "fir-tutorial-516f1.firebasestorage.app",
  messagingSenderId: "146779395896",
  appId: "1:146779395896:web:f9a99cadeae3d8507893cd",
  measurementId: "G-J8CQGRDHSH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const firestore = getFirestore(app);
export const auth = initializeAuth(app, { persistence: getReactNativePersistence(AsyncStorage) });
