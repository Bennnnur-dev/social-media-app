//wrapper function that accepts a callback as its argument and returns it inside a try/catch
//adds dynamic and controlled error handling
//allows to stop using try/catch blocks across all the project

import { type ImagePickerSuccessResult } from "expo-image-picker";

type Failure = {
  status: "failure";
  result: string;
};

type Success = {
  status: "success";
  result: (arg: any) => any | Promise<ImagePickerSuccessResult>;
};

export type Result = Success | Failure;

export default async function asyncWrapper(callback: (arg: any) => any, data?: any): Promise<Result> {
  try {
    return { status: "success", result: await callback(data) };
  } catch (err) {
    //firebase error
    if (err instanceof Error && err.message.includes("/firebase")) {
      return { status: "failure", result: firebaseErrorParser(err.message) };
    }

    //manual error
    if (err instanceof Error) {
      return { status: "failure", result: err.message };
    }

    //default error
    return { status: "failure", result: "Unknown error" };
  }
}

//parses firebase error messages into user-friendly messages
function firebaseErrorParser(message: string): string {
  const filteredMsg = message
    .split(/([/)])/)[2]
    .split("-")
    .join(" ");

  const upperCase = filteredMsg[0].toUpperCase();

  return upperCase + filteredMsg.slice(1);
}
