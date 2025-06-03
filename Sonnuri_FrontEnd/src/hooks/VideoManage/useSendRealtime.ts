import { useRef, useEffect } from 'react';

export function useSendRealtime(
  videoRef: React.RefObject<HTMLVideoElement | null>,
  wsUrl: string
) {
  const wsRef = useRef<WebSocket | null>(null);
  const timerRef = useRef<number | null>(null);

  const startRealtimeSending = () => {
    if (!videoRef.current) return;
    if (wsRef.current) return; // 이미 연결중

    const ws = new WebSocket(wsUrl);
    ws.binaryType = 'arraybuffer';

    ws.onopen = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const sendFrame = () => {
        if (!videoRef.current || ws.readyState !== WebSocket.OPEN) {
          stopRealtimeSending();
          return;
        }

        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;

        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        canvas.toBlob(
          (blob) => {
            if (blob && ws.readyState === WebSocket.OPEN) {
              blob.arrayBuffer().then((buffer) => ws.send(buffer));
            }
          },
          'image/jpeg',
          0.7
        );
      };

      // 15fps 간격으로 송신
      timerRef.current = window.setInterval(sendFrame, 1000 / 15);
    };

    ws.onclose = () => {
      stopRealtimeSending();
    };

    ws.onerror = () => {
      stopRealtimeSending();
    };

    wsRef.current = ws;
  };

  const stopRealtimeSending = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }
  };

  return { startRealtimeSending, stopRealtimeSending };
}
