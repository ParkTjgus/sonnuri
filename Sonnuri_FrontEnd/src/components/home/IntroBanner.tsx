interface IntroBannerProps {
  title: string;
  description: string;
  buttonText: string;
  imageUrl: string;
  onActionClick?: () => void;
}

const IntroBanner = ({
  title,
  description,
  buttonText,
  imageUrl,
  onActionClick,
}: IntroBannerProps) => {
  return (
    <section className="flex items-center gap-[30px]">
      <div className="flex flex-col gap-[60px] items-start">
        <h2 className="text-[48px] font-bold font-weight">{title}</h2>
        <p>{description}</p>
        <button
          onClick={onActionClick}
          className="bg-[#3B82F6] px-[30px] py-[17px] rounded-[12px] text-white"
        >
          {buttonText}
        </button>
      </div>
      <div className="w-[400px] h-[400px] flex items-center justify-center">
        <img src={imageUrl} alt="수어 번역가" />
      </div>
    </section>
  );
};

export default IntroBanner;
