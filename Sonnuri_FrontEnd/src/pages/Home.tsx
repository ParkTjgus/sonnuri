import { FaBook } from "react-icons/fa";
import { TbMessageLanguage } from "react-icons/tb";
import { FeatureCard, IntroBanner } from "../components";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center p-[80px] gap-[60px]">
      <section className="flex gap-[26px] items-center justify-between">
        <IntroBanner
          title="지금 바로 수어를 배워보세요"
          description="단어부터 실시간 인식까지 한 곳에서 쉽고 재미있게 배우는 수어학습"
          buttonText="학습 시작하기"
          onActionClick={() => navigate("/learningLevel")}
          imageUrl="https://thumb.ac-illust.com/6c/6c72e70045fcb6b7d80c48a3f1bb22c9_t.jpeg"
        />
      </section>
      <section className="flex justify-between w-[1110px] gap-[10px]">
        <FeatureCard
          icon={<FaBook size={30} />}
          title="수어 학습하기"
          description="체계적인 커리큘럼으로 기초부터 고급까지 단계별 학습을 제공합니다."
          actionLabel="학습하기"
          onActionClick={() => navigate("/learningLevel")}
          bgColor="blue"
          textColor="blue"
        />
        <FeatureCard
          icon={<TbMessageLanguage size={40} />}
          title="수어 번역기"
          description="텍스트를 수어로, 수어를 텍스트로 변환하는 양방향 번역 서비스를 이용해보세요."
          actionLabel="번역하기"
          onActionClick={() => navigate("/translation")}
          bgColor="purple"
          textColor="purple"
        />
      </section>
    </div>
  );
};
export default Home;
