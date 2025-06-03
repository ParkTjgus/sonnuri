import { FaCheck } from "react-icons/fa6";

interface AnswerButtonProps {
  index: number;
  label: string;
  isSelected: boolean;
  onClick: () => void;
}

const AnswerButton = ({
  index,
  label,
  isSelected,
  onClick,
}: AnswerButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center h-[4.5rem] w-[544px] rounded-[20px] border px-6 gap-8 text-2xl shadow-button text-left
        ${isSelected ? "border-[#007AFF]" : "border-[#c6c6c8]"} bg-white`}
    >
      <span className="inline-flex justify-center items-center w-12 h-12">
        {isSelected ? (
          <FaCheck color="#2563EB" />
        ) : (
          <span className="bg-[#D9D9D9] rounded-full w-full h-full flex justify-center items-center">
            {index}
          </span>
        )}
      </span>
      {label}
    </button>
  );
};

export default AnswerButton;
