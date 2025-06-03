type ResultBoxProps = {
  result: string | null;
};

const ResultBox = ({ result }: ResultBoxProps) => {
  return (
    <div className="w-[1184px] h-72 bg-white shadow-button rounded-[20px] border border-[#8080808C] flex justify-center items-center text-center">
      <div className="h-64 w-full flex justify-center items-center border-r text-5xl">
        {result === "정답" ? (
          <span className="text-blue-500">정답</span>
        ) : result === "오답" ? (
          <span className="text-red-500">오답</span>
        ) : (
          <span className="text-gray-400">결과 없음</span>
        )}
      </div>
    </div>
  );
};

export default ResultBox;
