const NextButton = (props: { onActionClick: () => void }) => {
  return (
    <button className="bg-[#2563EB] w-[548px] h-[48px] rounded-lg text-white " onClick={props.onActionClick}>
      Next
    </button>
  );
};

export default NextButton;
