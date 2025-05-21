import asyncWrapper, { type Result } from "@/scripts/asyncWrapper";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function useAsyncStorage() {
  async function getAsyncStorage(storageName: string): Promise<Result> {
    return await asyncWrapper(async (storageName: string) => {
      const rawData = await AsyncStorage.getItem(storageName);
      if (rawData) {
        const JSONData = await JSON.parse(rawData);
        return JSONData;
      }
      return [];
    }, storageName);
  }

  async function setAsyncStorage(storageName: string, data: any) {
    return await asyncWrapper(
      async ({ storageName, data }) => {
        if (!data) throw new Error("No data provided to AsyncStorage");
        const JSONData = JSON.stringify(data);
        await AsyncStorage.setItem(storageName, JSONData);
      },
      { storageName, data }
    );
  }

  return { getAsyncStorage, setAsyncStorage };
}
