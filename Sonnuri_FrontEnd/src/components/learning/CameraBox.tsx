import React, { useEffect, useRef, useState } from "react";

const CameraBox = (props: { type: string }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentChar, setCurrentChar] = useState("");

  useEffect(() => {
    let ws: WebSocket;

    if (props.type == "word") {
      ws = new WebSocket("ws://backend:8000/stream/predict");
    } else if (props.type == "jamo") {
      ws = new WebSocket("ws://backend:8000/stream/jamo");
    } else {
      ws = new WebSocket("ws://backend:8000/stream/receive");
    }

    ws.onopen = () => {
      console.log("WebSocket 연결됨");

      const interval = setInterval(() => {
        if (!videoRef.current) return;

        const canvas = document.createElement("canvas");
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

        canvas.toBlob((blob) => {
          if (blob) {
            blob.arrayBuffer().then((buffer) => {
              ws.send(buffer);
            });
          }
        }, "image/jpeg", 0.8);
      }, 300);

      return () => clearInterval(interval);
    };

    ws.onmessage = (msg) => {
      const result = JSON.parse(msg.data);
      console.log("인식 결과:", result);
      if (result.accepted) {
        setCurrentChar(result.current_word);
      }
    };

    return () => {
      ws.close();
    };
  }, []);

  useEffect(() => {
    // 웹캠 연결
    const getMedia = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    };
    getMedia();
  }, []);

  return (
    <div className="w-[560px] h-[360px] bg-[#F9FAFB] rounded-lg border border-2 border-dashed flex flex-col justify-center items-center">
      <video ref={videoRef} autoPlay muted className="w-full h-full object-cover rounded-lg" />
    </div>
  );
};

export default CameraBox;
