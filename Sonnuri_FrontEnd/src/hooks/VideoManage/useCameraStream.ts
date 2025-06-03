import { useCallback, useEffect, useRef, useState } from 'react';

export const useCameraStream = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isRecording, setRecording] = useState<boolean>(false);
  const [isReady, setReady] = useState<boolean>(false);
  const [isError, setError] = useState<string | null>(null);
  const [isActive, setActive] = useState<boolean>(false);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const videoChunks = useRef<Blob[]>([]);

  const stopMediaPermission = () => {
    const stream = videoRef.current?.srcObject as MediaStream | null;
    stream?.getTracks().forEach((track) => track.stop());
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  const getMediaPermission = useCallback(async () => {
    setError(null);
    setLoading(true);
    console.log(videoRef.current);

    const audioConstraints = { audio: true };
    const videoConstraints = { audio: false, video: true };

    try {
      // 카메라와 마이크 권한 요청
      const audioStream = await navigator.mediaDevices.getUserMedia(
        audioConstraints
      );
      const videoStream = await navigator.mediaDevices.getUserMedia(
        videoConstraints
      );

      // 비디오 스트림 할당
      if (videoRef.current) {
        videoRef.current.srcObject = videoStream;
      }

      const combinedStream = new MediaStream([
        ...videoStream.getVideoTracks(),
        ...audioStream.getAudioTracks(),
      ]);

      const recorder = new MediaRecorder(combinedStream, {
        mimeType: 'video/webm',
      });

      recorder.ondataavailable = (e) => {
        if (typeof e.data === 'undefined') return;
        if (e.data.size === 0) return;
        videoChunks.current.push(e.data); // 필요 시 비디오 녹화 처리
      };
      mediaRecorder.current = recorder;
      setLoading(false);
    } catch (err) {
      setError('카메라 또는 마이크 권한 요청에 실패했습니다.');
      setLoading(false);
    }
  }, []);

  const generateVideoName = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 1을 더하고, 두 자리로 만들기 위해 padStart 사용
    const day = String(today.getDate()).padStart(2, '0'); // 날짜를 두 자리로 만들기 위해 padStart 사용

    const formattedDate = `${year}${month}${day}`;
    return `My video - ${formattedDate}.mp4`;
  };

  const downloadVideo = () => {
    if (mediaRecorder.current && mediaRecorder.current.state !== 'inactive') {
      mediaRecorder.current.stop();
    }

    const videoBlob = new Blob(videoChunks.current, { type: 'video/webm' });
    const fileName = generateVideoName();

    videoChunks.current = [];
    setRecording(false);

    return { videoBlob, fileName };
  };

  const startRecording = () => {
    setRecording(true);
    console.log(mediaRecorder.current?.state);
    if (mediaRecorder.current?.state === 'paused') {
      mediaRecorder.current.resume();
    } else {
      videoChunks.current = [];
      mediaRecorder.current?.start();
      console.log(mediaRecorder.current);
    }
  };
  const stopRecording = () => {
    mediaRecorder.current?.stop();
    setRecording(false);
  };
  const pauseRecording = () => {
    mediaRecorder.current?.pause();
    console.log(mediaRecorder.current?.state);
    setRecording(false);
  };

  useEffect(() => {
    console.log('실행');
    if (!isReady) return;

    if (isActive) {
      getMediaPermission();
    } else {
      stopMediaPermission();
    }
  }, [isActive, videoRef.current]);

  useEffect(() => {
    console.log(mediaRecorder.current);
  }, [mediaRecorder.current]);

  return {
    videoRef,
    isReady,
    isLoading,
    isRecording,
    setReady,
    isError,
    isActive,
    setActive,
    downloadVideo,
    startRecording,
    stopRecording,
    pauseRecording,
  };
};
