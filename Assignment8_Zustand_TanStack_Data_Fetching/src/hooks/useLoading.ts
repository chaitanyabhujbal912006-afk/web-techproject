import { useEffect } from "react";
import type { Dispatch, SetStateAction } from "react";

export function useLoading(isLoading: boolean, setIsLoading: (value: boolean) => void) {
  useEffect(() => setIsLoading(isLoading), [isLoading, setIsLoading]);
}