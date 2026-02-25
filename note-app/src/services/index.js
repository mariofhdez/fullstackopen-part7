import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

export const useResource = (baseUrl) => {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    axios.get(baseUrl).then((response) => {
      setResources(response.data);
    });
  }, [baseUrl]);

  const create = async (newObject) => {
    const response = axios.post(baseUrl, newObject);
    setResources(resources.concat(response.data));
    return response.data;
  };

  const update = async (id, newObject) => {
    const response = axios.put(`${baseUrl}/${id}`, newObject);
    setResources(resources.map((r) => (r.id !== id ? r : response.data)));
    return response.data;
  };

  const service = {create, update}

  return [resources, service];
};
