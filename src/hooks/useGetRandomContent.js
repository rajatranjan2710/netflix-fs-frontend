import React from "react";
import { useContentStore } from "../store/contentStore";
import axios from "axios";
import { server } from "../store/userAuthSore";

const useGetRandomContent = () => {
  const [content, setContent] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const { contentType } = useContentStore();

  const getRandomContent = async () => {
    try {
      const response = await axios(`${server}/${contentType}/random`, {
        withCredentials: true,
      });
      setContent(response.data.content);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    getRandomContent();
  }, [contentType]);

  return { content, loading };
};

export default useGetRandomContent;
