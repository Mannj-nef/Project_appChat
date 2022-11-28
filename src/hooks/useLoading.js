import { useEffect, useState } from "react";

function useLoading(data) {
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    if (!data) console.error("No data has been passed in useLoading");
    if (!!data?.length) setLoading(false);
  }, [data]);

  return { isLoading };
}

export default useLoading;
