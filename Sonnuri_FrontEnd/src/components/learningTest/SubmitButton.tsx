const SubmitButton = (props: { label: string, onActionClick?: () => void,  buttonStyle?: string }) => {
  return (
    <button className={`bg-[#2563EB] w-[548px] h-[48px] rounded-lg text-white ${props.buttonStyle}`} onClick={props.onActionClick}>
      {props.label}
    </button>
  );
};


export default SubmitButton;
