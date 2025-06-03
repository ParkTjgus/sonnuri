// hooks/useCameraStream.ts
import { useEffect, useRef } from "react";

export function useCameraStream(videoRef: React.RefObject<HTMLVideoElement | null>) {

    useEffect(() => {
        const getMedia = async () => {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
        };
        getMedia();
    }, []);
}
