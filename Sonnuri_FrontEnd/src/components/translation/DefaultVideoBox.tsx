interface VideoBoxProps {
  content: any;
  title: string | null;
}

const DefaultVideoBox = ({ content, title }: VideoBoxProps) => {
  return (
    <div
      className='relative w-[560px] h-[360px] p-[10px]
            bg-[#F9FAFB] rounded-lg border-2 border-dashed flex justify-center items-center'
    >
      <h2 className='text-3xl left-20 text-red-600 font-extrabold top-5 absolute'>
        {title}
      </h2>
      {content}
    </div>
  );
};

export default DefaultVideoBox;
