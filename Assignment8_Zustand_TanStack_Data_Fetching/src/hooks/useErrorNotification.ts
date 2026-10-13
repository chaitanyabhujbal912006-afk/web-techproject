import { useEffect, useRef } from "react";
import type { CustomError } from "../types";
import { useToast } from "../components/ToastProvider";

export function useErrorNotification(isError: boolean, title: string, error: CustomError | null) {
  const { showToast } = useToast();
  const lastMessage = useRef("");
  useEffect(() => {
    if (isError && error && lastMessage.current !== error.message) {
      showToast("error", `${error.status ?? "Error"}: ${title}`, error.message);
      lastMessage.current = error.message;
    }
    if (!isError) lastMessage.current = "";
  }, [isError, title, error, showToast]);
}