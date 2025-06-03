import axios from 'axios';

export const getTranslateResult = async (word: string) => {
  const respone = await axios.get(`/api/translate/${word}`)
  return respone.data;
}


const sendToTranslate = async (file: File, inputType: string) => {
  const formData = new FormData();
  formData.append('payload', file); // 파일 필드 (FastAPI에서는 UploadFile로 받음)

  try {
    const response = await axios.post(
      `http://backend:8000/translate?input_type=${inputType}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    // 응답 처리
    if (inputType === 'text') {
      return response.data.video_url;
    } else {
      return response.data.text;
    }
  } catch (error) {
    console.error('요청 실패:', error);
  }
};

export { sendToTranslate };
