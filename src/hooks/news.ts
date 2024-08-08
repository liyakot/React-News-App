import { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import { IArticle } from "../models";

const useNews = () => {
  const [news, setNews] = useState<IArticle[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchNews();
  }, []);

  async function fetchNews() {
    try {
      setError("");
      setLoading(true);
      const response = await axios.get<{ results: IArticle[] }>(
        "https://api.spaceflightnewsapi.net/v4/articles/?_limit=100"
      );
      console.log(response.data);
      setNews(response.data.results); // Access the results property of the response
      setLoading(false);
    } catch (e: unknown) {
      setLoading(false);
      if (e instanceof AxiosError) {
        setError(e.message);
      } else {
        setError("An unexpected error occurred");
      }
    }
  }

  return { news, loading, error };
};

export default useNews;
