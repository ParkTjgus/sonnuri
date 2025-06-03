type LearningVideoProps = {
  videoUrl: string;
};

const LearningVideo = ({ videoUrl }: LearningVideoProps) => {
  return (
    <video
      src={videoUrl}
      controls
      className="rounded-xl w-[560px] h-[360px] bg-black"
    />
  );
};

export default LearningVideo;
