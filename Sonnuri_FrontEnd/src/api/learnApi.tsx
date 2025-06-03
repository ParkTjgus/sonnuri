import axios from "axios";

export const getLearningWords = async () => {
  const response = await axios.get(`/api/learn`);
  return response.data;
}

