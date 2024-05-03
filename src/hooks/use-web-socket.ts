import { WebSocketContext } from '@contexts/web-socket-context';
import { useContext } from 'react';

export function useWebSocket() {
  const currentWebSocketContext = useContext(WebSocketContext);

  if (!currentWebSocketContext) {
    throw new Error(
      'useWebSocket has to be used within <WebSocketContext.Provider>'
    );
  }

  return currentWebSocketContext;
}
