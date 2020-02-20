import { useState, useEffect } from "react";

export default async (url, token) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async (url, token = null) => {
      try {
        setLoading(true);
        const headers = {
          "Content-Type": "application/json"
        };
        if (token) headers["Bearer"] = "JWT " + token;
        const opts = { headers };
        const res = await fetch(url, opts);
        const json = await res.json();
        setData(json);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData(url, token);
  }, []);

  return { loading, data, error };
};
