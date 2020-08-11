import { useCallback, useEffect, useState } from 'react';
import { ErrorResponse } from 'userResponse';
import { createClient } from 'utils/axios';

const client = createClient();
export function useDataApi<T>(
  initialUrl: string,
  initialData?: T,
  initialQuery?: { [key: string]: string | string[] | number | undefined },
): [
  { data: T | undefined; isLoading: boolean; isError?: ErrorResponse },
  () => Promise<void>,
  React.Dispatch<
    React.SetStateAction<
      { [key: string]: string | string[] | number | undefined } | undefined
    >
  >,
] {
  const [data, setData] = useState<T | undefined>(initialData);
  const [url] = useState(initialUrl);
  const [query, setQuery] = useState(initialQuery);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState<ErrorResponse | undefined>(undefined);
  const fetchData = useCallback(async () => {
    setIsError(undefined);
    setIsLoading(true);

    try {
      const { data } = await client.get<T>(url, { params: query });
      setData(data);
    } catch (error) {
      setIsError(
        error?.response?.data ?? { message: 'لطفا اتصال خود را برسی نمایید!' },
      );
    }
    setIsLoading(false);
  }, [url, query]);

  useEffect(() => {
    fetchData();
  }, [url, query, fetchData]);

  return [{ data, isLoading, isError }, fetchData, setQuery];
}
