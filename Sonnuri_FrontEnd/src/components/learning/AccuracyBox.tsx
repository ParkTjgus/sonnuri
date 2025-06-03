import { BiSolidError } from "react-icons/bi";

const AccuracyBox = (props: { accuracy: number }) => {
  return (
    <div className="bg-[#E5E7EB] w-[548px] h-[132px] rounded-lg py-4 px-6">
      <div className="flex justify-between">
        <span>정확도</span>
        <span className="font-semibold text-[#059669]">{props.accuracy * 100}%</span>
      </div>
      {
        <div className="mt-3 flex items-center text-sm">
          <BiSolidError
            color={props.accuracy >= 0.8 ? "#10B981" : "#D97706"}
            size={24}
          />
          <span className={`ml-1 ${props.accuracy >= 0.80 ? "text-green-600" : "text-yellow-600"}`}>
            {props.accuracy >= 0.8 ? "정확합니다!" : "좀 더 손가락을 움직여보세요"}
          </span>
        </div>
      }
    </div>
  );
};
export default AccuracyBox;
