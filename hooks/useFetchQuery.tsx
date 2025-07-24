import { client } from "@/api/client";
import { useQuery, useQueryClient, QueryKey } from "@tanstack/react-query";
import axios from "axios";

export function useFetchQuery<TData = any>(url: string, queryKey?: QueryKey) {
  const queryClient = useQueryClient();

  const key: QueryKey = queryKey || [url];

  const fetcher = async (): Promise<TData> => {
    console.log(`[ReactQuery] Fetching: ${url} with key:`, key);
    const response = await client.get<TData>(url);
    return response.data;
  };

  const query = useQuery<TData>({
    queryKey: key,
    queryFn: fetcher,
  });

  const invalidate = (customKey?: QueryKey) => {
    const targetKey = customKey || key;
    console.log(`[ReactQuery] Invalidating query for key:`, targetKey);
    queryClient.invalidateQueries({ queryKey: targetKey });
  };

  return {
    ...query,
    invalidate,
  };
}
