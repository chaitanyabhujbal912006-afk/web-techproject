import { useQuery } from "@tanstack/react-query";
import { CarApi } from "../api/carApi";
import { ERROR_FETCHING_CARS } from "../constants";
import { useDataFetching } from "./useDataFetching";
import type { Car, CustomError } from "../types";

interface UseCarsOptions {
  filterObject?: { id: string };
  active?: boolean;
  enabled?: boolean;
}
export function useCars({ filterObject, active = true, enabled = true }: UseCarsOptions = {}) {
  const getCars = async (): Promise<Car[]> => {
    if (!filterObject?.id) return CarApi.getActiveCars();
    return CarApi.getCarsWithSpecificBrand(filterObject.id, active);
  };
  const query = useQuery<Car[], CustomError>({
    queryKey: ["cars", filterObject?.id ?? "all-active", active],
    queryFn: getCars,
    retry: 0,
    enabled
  });
  useDataFetching({
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    errorMessage: ERROR_FETCHING_CARS
  });
  return {
    cars: query.data,
    isLoadingCars: query.isLoading,
    refetchCars: query.refetch,
    errorCars: query.error
  };
}