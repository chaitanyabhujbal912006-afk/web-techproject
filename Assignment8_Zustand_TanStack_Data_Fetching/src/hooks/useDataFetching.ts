import { useLoaderStore } from "../stores/loaderStore";
import type { CustomError } from "../types";
import { useErrorNotification } from "./useErrorNotification";
import { useLoading } from "./useLoading";

interface UseDataFetchingParams {
  isLoading: boolean;
  isError: boolean;
  error: CustomError | null;
  errorMessage: string;
}
export function useDataFetching({ isLoading, isError, error, errorMessage }: UseDataFetchingParams) {
  const setIsLoading = useLoaderStore((state) => state.setIsLoading);
  useErrorNotification(isError, errorMessage, error);
  useLoading(isLoading, setIsLoading);
}