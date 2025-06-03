const AnswerBox = (props: { label: string }) => {
  //TODO: server로부터 GET하기

  return (
    <div className="w-[560px] h-[196px] bg-white shadow-button rounded-[20px] border border-[#8080808C] flex justify-center items-center text-center text-5xl">
      {props.label}
    </div>
  );
};

export default AnswerBox;
