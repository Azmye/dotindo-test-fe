import { useEffect, useState } from "react";

export const useFetch = <T = unknown,>(url: string) => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(url);

        if (response.status === 404) {
          throw new Error(`Data Not Found`);
        }

        if (!response.ok) {
          throw new Error(`Error: ${response}`);
        }

        const result: T = await response.json();
        setData(result);
        setError(null);
      } catch (err: unknown) {
        setData(null);
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, isLoading, error };
};
