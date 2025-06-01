import asyncWrapper, { Result } from "@/scripts/asyncWrapper";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function useAsyncStorage() {
  async function getAsyncStorage<Data>(storageName: string): Promise<Result<Data>> {
    return await asyncWrapper<Data>(async (storageName: string) => {
      const rawData = await AsyncStorage.getItem(storageName);
      if (!rawData) return [];
      const JSONData = await JSON.parse(rawData);
      return JSONData;
    }, storageName);
  }

  async function setAsyncStorage(storageName: string, data: any) {
    return await asyncWrapper<void>(
      async ({ storageName, data }) => {
        if (data === undefined) throw new Error("No data provided to AsyncStorage");
        const JSONData = JSON.stringify(data);
        await AsyncStorage.setItem(storageName, JSONData);
      },
      { storageName, data }
    );
  }

  return { getAsyncStorage, setAsyncStorage };
}
