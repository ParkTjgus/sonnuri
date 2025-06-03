import axios from 'axios';

export const submitTestAnswer = async (wordId: number, selected: string) => {
  const response = await axios.post("/api/test/submit", null, {
    params: { word_id: wordId, selected },
  });
  return response.data; // { correct: boolean, answer: string }
};


export const fetchRandomTestWord = async () => {
  const res = await fetch("/api/test/random");
  if (!res.ok) throw new Error("랜덤 단어 불러오기 실패");
  return res.json();
};


