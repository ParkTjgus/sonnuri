// Learning.tsx
import { useEffect, useState } from "react";
import { getLearningWords } from "../api/learnApi"; // API 호출 함수
import { AccuracyBox, AnswerBox, NextButton, LearningVideo, CameraBoxWord, CameraBoxJamo, SubmitButton } from "../components";
import type { WordItem } from "../type/type";
import { useNavigate } from "react-router-dom";

const Learning = () => {
  const [wordItems, setWordItems] = useState<WordItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [videoUrl, setVideoUrl] = useState("");

  const [confidence, setConfidence] = useState(0);
  const [predictedWord, setPredictedWord] = useState("");
  const [isCameraActive, setIsCameraActive] = useState(true);

  const [finalConfidence, setFinalConfidence] = useState<number | null>(null);


  const navigate = useNavigate();


  // 단어 목록 불러오기
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

  useEffect(() => {
    const currentWord = wordItems[currentIndex]?.word;
    if (
      predictedWord === currentWord &&
      finalConfidence === null
    ) {
      setFinalConfidence(confidence);    // 정확도 고정
      setIsCameraActive(false);          // 웹소켓 연결 끊기
    }
  }, [predictedWord, confidence, currentIndex]);


  const handleNext = () => {
    if (currentIndex < wordItems.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setPredictedWord("");
      setConfidence(0);
      setFinalConfidence(null);     // 정확도 초기화
      setIsCameraActive(true);
    } else {
      navigate("/learningLevel");
    }
  };



  return (
    <div className="min-h-screen flex flex-col items-center mb-24 mt-10 min-w-[1100px]">
      <header className="w-[1184px] mb-4">
        <h2 className="text-[36px] font-bold">수어 학습하기</h2>
      </header>
      <div className="grid grid-cols-2 gap-y-10 gap-x-12">
        <span className="text-lg">제시어</span>
        <span className="text-lg">실시간 카메라</span>
        <div className="space-y-4">
          {videoUrl ? (
            < LearningVideo videoUrl={videoUrl} />
          ) : (
            <div className="w-[560px] h-[360px] flex items-center justify-center bg-gray-200 rounded-xl">
              <p>영상 로딩 중...</p>
            </div>
          )}
        </div>

        {
          wordItems[currentIndex]?.type === "word" ? (
            <CameraBoxWord
              isActive={isCameraActive}
              onPredict={(word, conf) => {
                setPredictedWord(word);
                setConfidence(conf);
              }}
            />

          ) : (
            <CameraBoxJamo
              isActive={isCameraActive}
              onPredict={(word, conf) => {
                setPredictedWord(word);
                setConfidence(conf);
              }} />
          )
        }

        <AnswerBox label={wordItems[currentIndex]?.word} />
        <div className="space-y-4">
          {
            predictedWord === wordItems[currentIndex]?.word && finalConfidence !== null
              ? <AccuracyBox accuracy={finalConfidence} />
              : <AccuracyBox accuracy={0} />
          }
          {
            currentIndex < wordItems.length - 1 ?

              <NextButton onActionClick={handleNext} /> :
              <SubmitButton
                label={"종료"}
                onActionClick={handleNext}
                buttonStyle="!w-[560px] bg-[#EFF6FF] !text-[#2563EB]"
              />
          }

        </div>
      </div>
    </div>
  );
};
export default Learning;
