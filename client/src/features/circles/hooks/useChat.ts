/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { socketService } from '../../../shared/services/socket.service';

export const useChat = (circleId: string | undefined) => {
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    if (!circleId) return;

    socketService.connect();
    const socket = socketService.socket;
    socket?.emit('joinCircle', { circleId });

    socket?.on('newMessage', (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket?.off('newMessage');
    };
  }, [circleId]);

  const sendMessage = (text: string) => {
    if (socketService.socket) {
      socketService.socket.emit('sendMessage', {
        circleId,
        content: text,
        messageType: 'TEXT',
      });
    }
  };

  return { messages, sendMessage };
};
