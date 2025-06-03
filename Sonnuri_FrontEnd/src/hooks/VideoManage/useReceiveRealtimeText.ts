import { useEffect, useRef, useState } from 'react';

export function useReceiveRealtimeText(wsUrl: string) {
  const [predictedWord, setPredictedWord] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket(wsUrl);
    wsRef.current = ws;

    ws.onmessage = (event) => {
      setPredictedWord(event.data); // 문자열 그대로 받음
    };

    ws.onerror = () => {
      setError('WebSocket 오류 발생');
    };

    ws.onclose = () => {
      console.log('WebSocket 종료');
    };

    return () => {
      ws.close();
    };
  }, [wsUrl]);

  return { predictedWord, error };
}
