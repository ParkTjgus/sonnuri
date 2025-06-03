import {
  AnswerButton,
  LearningVideo,
  ResultBox,
  SubmitButton,
} from "../components";
import { useAnswerSelection } from "../hooks/useAnswerSelection";
import { submitTestAnswer } from "../api/testingApi";
import { useEffect, useState } from "react";
import { getLearningWords } from "../api/learnApi";
import type { WordItem } from "../type/type";
import { useNavigate } from "react-router-dom";



const Testing = () => {
  const [wordItems, setWordItems] = useState<WordItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const { selectedIndex, select, reset } = useAnswerSelection();
  const [videoUrl, setVideoUrl] = useState("");
  const [result, setResult] = useState<"정답" | "오답" | null>(null);

  const navigate = useNavigate();


  useEffect(() => {
    getLearningWords()
      .then((data) => setWordItems(data))  // [{ id, word, video_url }, ...]
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (wordItems.length > 0) {
      const current = wordItems[currentIndex];
      setVideoUrl(`http://localhost:8000${current.video_url}`);
    }
  }, [wordItems, currentIndex]);


  const handleSubmit = async () => {
    if (selectedIndex === null) {
      alert("답안을 선택해주세요!");
      return;
    }

    try {
      const currentId = wordItems[currentIndex].id;
      const selectedWord = wordItems[selectedIndex].word;

      const data = await submitTestAnswer(currentId, selectedWord);
      setResult(data.correct ? "정답" : "오답");
    } catch (error) {
      console.error("정답 확인 실패:", error);
    }
  };


  const handleNext = () => {

    if (currentIndex < wordItems.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setResult(null);
      reset(); // 선택 초기화
    } else {
      navigate("/learningLevel");

    }
  };

  return (
    <div className="min-h-screen space-y-8 flex flex-col items-center mb-24 mt-10">
      <div className="grid grid-cols-2 gap-x-20 w-[1184px] mx-auto">
        <h2 className="text-[36px] font-bold col-span-2 mb-2">수어 학습 테스트하기</h2>

        <span className="text-lg">제시어</span>
        <span className="text-lg">단어 선택</span>
      </div>
      <div className="flex space-x-20 justify-center mt-20">
        <div className="space-y-6">
          <LearningVideo videoUrl={videoUrl} />

          <SubmitButton
            label={currentIndex < wordItems.length - 1 ? "다음" : "종료"}
            onActionClick={handleNext}
            buttonStyle="!w-[560px] bg-[#EFF6FF] !text-[#2563EB]"
          />
        </div>

        <div className="space-y-6">
          {wordItems.map((item, idx) => (
            <AnswerButton
              key={item.id}
              index={idx + 1}
              label={item.word}
              isSelected={selectedIndex === idx}
              onClick={() => select(idx)}
            />
          ))}
          <SubmitButton label="제출하기" onActionClick={handleSubmit} />
        </div>
      </div>

      <ResultBox result={result ?? ""} />
    </div>
  );
};

export default Testing;
