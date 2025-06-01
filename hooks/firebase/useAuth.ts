import asyncWrapper from "@/scripts/asyncWrapper";
import { type User } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

export async function useAuth() {
  const [authError, setAuthError] = useState("");

  const newUser = useMutation({
    mutationFn: (user: User) => register(user),
    onError: err => {
      setAuthError(JSON.stringify(err));
    },
  });

  async function register(credentials: User) {
    return await asyncWrapper(async user => {}, credentials);
  }

  function mutateNewUser(credentials: User) {
    newUser.mutate(credentials);
  }

  return { mutateNewUser, authError };
}
