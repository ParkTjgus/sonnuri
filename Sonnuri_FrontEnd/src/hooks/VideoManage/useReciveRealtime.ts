import { useState, useEffect, useRef } from 'react';

export function useReciveRealtime(wsUrl: string) {
  const [isActiveReceive, setIsActiveReceive] = useState(false);
  const [errorReceive, setErrorReceive] = useState<string | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (!isActiveReceive) {
      if (wsRef.current) {
        wsRef.current.close();
        wsRef.current = null;
        setImageSrc(null);
      }
      return;
    }

    const ws = new WebSocket(wsUrl);
    ws.binaryType = 'blob';

    ws.onmessage = (event) => {
      const blob = event.data;
      const url = URL.createObjectURL(blob);
      setImageSrc(url);

      // 이전 URL 메모리 해제
      return () => URL.revokeObjectURL(url);
    };

    ws.onerror = (e) => {
      setErrorReceive('WebSocket error');
      setIsActiveReceive(false);
    };

    ws.onclose = () => {
      setIsActiveReceive(false);
    };

    wsRef.current = ws;

    return () => {
      ws.close();
      setImageSrc(null);
    };
  }, [isActiveReceive, wsUrl]);

  return {
    imageSrc,
    isActiveReceive,
    errorReceive,
    setIsActiveReceive,
  };
}
