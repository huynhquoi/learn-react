import { useEffect, useState } from "react";

export function useFetch(fetchFn, deps = [], defaultData = null) {
  const [data, setData] = useState(defaultData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    setData(defaultData);
    setLoading(true);
    setError(null);

    fetchFn()
      .then((res) => {
        if (isMounted) {
          setData(res);
          setLoading(false);
          setError(null);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setData(defaultData);
          setLoading(false);
          setError(err);
        }
      });

    return () => {
      isMounted = false;
    };
  }, deps);

  return { data, loading, error, setData };
}
