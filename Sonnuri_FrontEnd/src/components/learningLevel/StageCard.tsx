import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface StageCardProps {
  icon: ReactNode;
  title: string;
  stage: number;
  description: string;
  onActionClick?: () => void;
  baseColor: string;
  pointColor: string;
}

const StageCard = ({
  icon,
  title,
  stage,
  description,
  baseColor,
  pointColor,
  onActionClick,
}: StageCardProps) => {
  const navigate = useNavigate();

  return (
    <article className="w-full flex flex-col md:flex-row justify-between gap-[46px] p-[24px]">
      <header className="flex gap-[16px] items-center">
        <div
          className="hidden md:flex w-[48px] h-[48px] rounded-[50%] items-center justify-center"
          style={{
            backgroundColor: baseColor,
            color: pointColor,
          }}
        >
          {icon}
        </div>
        <div className="flex flex-col">
          <h4 className="text-[20px] font-semibold">
            {stage}. {title}
          </h4>
          <h6
            className="text-[14px]"
            style={{
              color: "gray",
            }}
          >
            {description}
          </h6>
        </div>
      </header>
      <div className="flex gap-[10px] text-white flex-col md:flex-row">
        {/* todo : 버튼에 라우터 연결 */}
        <button
          className="flex justify-center items-center text-center px-[25px] py-[10px] rounded-[12px]"
          style={{
            backgroundColor: pointColor,
          }}
          onClick={onActionClick || (() => navigate("/learning"))}
        >
          학습하기
        </button>
        <button
          className="flex justify-center items-center text-center px-[25px] py-[10px] rounded-[12px]"
          style={{
            backgroundColor: pointColor,
          }}
          onClick={onActionClick || (() => navigate("/learningTest"))}
        >
          테스트하기
        </button>
      </div>
    </article>
  );
};

export default StageCard;
