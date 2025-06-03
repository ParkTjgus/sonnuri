// components/CameraBoxWord.tsx
import { useEffect, useRef } from "react";
import { useCameraStream } from "../../hooks/useCameraStream";

const CameraBoxWord = ({ onPredict, isActive }: { onPredict: (word: string, confidence: number) => void, isActive: boolean }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const wsRef = useRef<WebSocket | null>(null);

    useCameraStream(videoRef);

    useEffect(() => {
        if (!isActive) {
            // 비활성화될 때 WebSocket 닫기
            if (wsRef.current && (wsRef.current.readyState === WebSocket.OPEN || wsRef.current.readyState === WebSocket.CONNECTING)) {
                console.log("🔌 WebSocket 수동 종료");
                wsRef.current.close();
            }
            return;
        }

        const ws = new WebSocket("ws://localhost:8000/stream/predict");
        wsRef.current = ws;

        let interval: number;

        ws.onopen = () => {
            console.log("🟢 Word WebSocket 연결 성공");

            interval = window.setInterval(() => {
                if (!videoRef.current || ws.readyState !== WebSocket.OPEN) return;

                const canvas = document.createElement("canvas");
                canvas.width = videoRef.current.videoWidth;
                canvas.height = videoRef.current.videoHeight;
                const ctx = canvas.getContext("2d");
                ctx?.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

                canvas.toBlob((blob) => {
                    if (blob) {
                        blob.arrayBuffer().then((buffer) => {
                            if (ws.readyState === WebSocket.OPEN) {
                                ws.send(buffer);
                            }
                        });
                    }
                }, "image/jpeg", 0.8);
            }, 300);
        };

        ws.onmessage = (msg) => {
            const result = JSON.parse(msg.data);
            console.log("인식된 단어: ", result.word)
            onPredict(result.word, result.confidence);
        };

        ws.onerror = (err) => {
            console.error("❌ WebSocket 오류 발생:", err);
        };

        ws.onclose = () => {
            console.log("🔴 Word WebSocket 연결 종료됨");
            if (interval) clearInterval(interval);
        };

        // cleanup
        return () => {
            console.log("🧹 useEffect cleanup");
            if (interval) clearInterval(interval);
            if (ws.readyState === WebSocket.OPEN || ws.readyState === WebSocket.CONNECTING) {
                ws.close();
            }
        };
    }, [isActive]);


    return (
        <div className="w-[560px] h-[360px] bg-gray-100 border border-dashed rounded-lg flex flex-col justify-center items-center">
            <video ref={videoRef} autoPlay muted className="w-full h-full object-cover rounded-lg" />
        </div>
    );
};

export default CameraBoxWord;

