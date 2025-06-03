import {
  type Dispatch,
  type RefObject,
  type SetStateAction,
  useEffect,
} from 'react';
import { BsCameraVideoOffFill, BsCameraVideoFill } from 'react-icons/bs';
import { FiLoader } from 'react-icons/fi';
import { DefaultVideoBox } from '../index.tsx';

interface VideoRecordBoxProps {
  videoRef: RefObject<HTMLVideoElement | null>;
  setReady: Dispatch<SetStateAction<boolean>>;
  isError: string | null;
  isLoading: boolean;
  isActive: boolean;
}

const VideoRecordBox = ({
  videoRef,
  isLoading,
  isError,
  isActive,
  setReady,
}: VideoRecordBoxProps) => {
  //컴포넌트가 렌더링 되면 준비 상태
  useEffect(() => {
    setReady(true);
  }, []);

  if (!isActive) {
    return (
      <DefaultVideoBox content={<BsCameraVideoFill color='gray' size={30} />} />
    );
  }

  if (isLoading) {
    return (
      <DefaultVideoBox
        content={
          <h2 className='flex gap-[20px] items-center'>
            <FiLoader size={30} />
            로딩 중...
          </h2>
        }
      />
    );
  }
  if (isError) {
    return <DefaultVideoBox content={<BsCameraVideoOffFill size={30} />} />;
  }

  return (
    <DefaultVideoBox
      content={
        <video
          ref={videoRef}
          controls={true}
          autoPlay
          playsInline
          className='w-full h-full'
        />
      }
    />
  );
};

export default VideoRecordBox;
