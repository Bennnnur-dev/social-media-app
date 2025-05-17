import { appContext, type ContextType } from "@/components/ContextWrapper";
import { useContext } from "react";

type ReturnType = {
  error: string | null;
  context: ContextType | null;
};

export default function useContextSnippet(): ReturnType {
  const context = useContext(appContext);
  if (!context) return { context: null, error: "Unable to get context" };
  return { context, error: null };
}
