'use client';

import Stomp from '@stomp/stompjs';
import { Client } from '@stomp/stompjs';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { SessionId } from '@/types/service';
import { UserService } from '@/services/client/user';

const Page = () => {
  const [stompClient, setStompClient] = useState<Stomp.Client | null>(null);

  // #region query
  const { isLoading, data } = useQuery<SessionId>({
    queryKey: ['sessionId'],
    queryFn: () => UserService.getSessionId(),
  });

  const sessionId = data?.sessionId;
  // #endregion

  useEffect(() => {
    const initialize = () => {
      // stomp client 객체 만들기
      const stomp = new Client({
        brokerURL: process.env.NEXT_PUBLIC_BASE_URL_SOCKET,
        debug: (str: string) => {
          // console.log(str);
        },
        reconnectDelay: 5000, //자동 재 연결
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
      });

      setStompClient(stomp);

      // stomp client 활성화
      stomp.activate();

      // stomp client 연결 됐을 때 동작
      stomp.onConnect = () => {
        // console.log('WebSocket 연결이 열렸습니다.');

        stomp.subscribe(`/sub/practice/${sessionId}`, (frame) => {
          try {
            const message = JSON.parse(frame.body);

            // console.log(message);
          } catch (error) {
            console.error('오류가 발생했습니다:', error);
          }
        });
      };
    };

    if (sessionId) {
      initialize();
    }

    return () => {
      if (stompClient && stompClient.connected) {
        stompClient.deactivate();
      }
    };
  }, [sessionId]);

  const sendMessage = () => {
    if (stompClient && stompClient.connected) {
      const destination = `/pub/practice/${sessionId}`;

      stompClient.publish({
        destination,
        body: JSON.stringify({
          sessionId,
          message: 'PING',
        }),
      });
    }
  };

  const closeSocket = () => {
    if (stompClient && stompClient.connected) {
      stompClient.deactivate();
    }
    // console.log('close...');
  };

  return (
    <div>
      <button onClick={sendMessage}>send PING!</button>
      <button onClick={closeSocket}>socket close..</button>
    </div>
  );
};

export default Page;
