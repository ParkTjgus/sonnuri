import { useRef, useEffect } from 'react';

export default function RealtimeCanvas({
  wsUrl,
  isActive,
}: {
  wsUrl: string;
  isActive: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (!isActive) {
      if (wsRef.current) {
        wsRef.current.close();
        wsRef.current = null;
      }
      const ctx = canvasRef.current?.getContext('2d');
      if (ctx && canvasRef.current) {
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      }
      return;
    }

    const ws = new WebSocket(wsUrl);
    ws.binaryType = 'blob';

    ws.onmessage = (event) => {
      const blob = event.data;
      const url = URL.createObjectURL(blob);
      const img = new Image();
      img.onload = () => {
        if (!canvasRef.current) return;
        const ctx = canvasRef.current.getContext('2d');
        if (!ctx) return;

        // 캔버스 크기 맞추기 (한 번만 해도 됨)
        if (
          canvasRef.current.width !== img.width ||
          canvasRef.current.height !== img.height
        ) {
          canvasRef.current.width = img.width;
          canvasRef.current.height = img.height;
        }

        // 캔버스 클리어 후 그리기
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        ctx.drawImage(img, 0, 0);
        URL.revokeObjectURL(url); // 메모리 해제
      };
      img.src = url;
    };

    wsRef.current = ws;

    return () => {
      ws.close();
      wsRef.current = null;
    };
  }, [wsUrl, isActive]);

  return <canvas ref={canvasRef} className='w-full h-full object-contain' />;
}
