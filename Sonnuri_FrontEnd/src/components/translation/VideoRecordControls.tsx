interface VideoControlsProps {
  isRecording: boolean;
  isLoading: boolean;
  onStart: () => void;
  onStop: () => void;
  onPause: () => void;
  onUpload: () => void;
}

const VideoRecordControls = ({
  isRecording,
  isLoading,
  onStart,
  onStop,
  onPause,
  onUpload,
}: VideoControlsProps) => {
  return (
    <div className='flex gap-4 justify-center mt-4'>
      <button
        onClick={onStart}
        disabled={isRecording || isLoading}
        className='px-4 py-2 bg-green-600 text-white rounded disabled:bg-gray-400'
      >
        녹화 시작
      </button>
      <button
        onClick={onPause}
        disabled={!isRecording || isLoading}
        className='px-4 py-2 bg-green-600 text-white rounded disabled:bg-gray-400'
      >
        녹화 일시정지
      </button>

      <button
        onClick={onStop}
        disabled={!isRecording}
        className='px-4 py-2 bg-red-600 text-white rounded disabled:bg-gray-400'
      >
        녹화 중지
      </button>

      <button
        onClick={onUpload}
        disabled={isRecording || isLoading}
        className='px-4 py-2 bg-blue-600 text-white rounded disabled:bg-gray-400'
      >
        다운로드
      </button>
    </div>
  );
};

export default VideoRecordControls;
