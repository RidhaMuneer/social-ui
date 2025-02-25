import { getRecords } from '@/api/requests';
import UserCard from '@/components/cards/user/UserCard';
import { User } from '@/types/user';
import { useState, useEffect, useRef, ReactNode } from 'react'

const useChat = (userId: string) => {
  const [messages, setMessages] = useState<{ sender: string; content: string; child?: ReactNode }[]>([]);
  const [isMatching, setIsMatching] = useState(false);
  const [isMatched, setIsMatched] = useState(false);
  const [chatPartner, setChatPartner] = useState<string | null>(null);

  const ws = useRef<WebSocket | null>(null);
  const wsConnected = useRef<boolean>(false);
  const reconnectAttempts = useRef<number>(0);
  const maxReconnectAttempts = 3;

  const cleanupConnection = () => {
    if (ws.current) {
      if (wsConnected.current) {
        try {
          ws.current.close(1000, "User initiated disconnect");
        } catch (e) {
          console.error("Error closing WebSocket:", e);
        }
      }

      ws.current = null;
      wsConnected.current = false;
    }
  };

  const setupWebSocket = (forceNewMatch = false) => {
    cleanupConnection();

    setIsMatching(true);
    setIsMatched(false);
    setChatPartner(null);

    setTimeout(() => {
      const socket = new WebSocket(`ws://${import.meta.env.VITE_PUBLIC_WS}/ws/${userId}${forceNewMatch ? '?force_new=true' : ''}`);
      ws.current = socket;

      socket.onopen = () => {
        console.log('WebSocket connected');
        wsConnected.current = true;
        reconnectAttempts.current = 0;
      };

      socket.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);

          if (data.type === 'matched') {
            setIsMatched(true);
            setIsMatching(false);
            setChatPartner(data.chatPartner);
            setMessages([]);
          } else if (data.type === 'message') {
            if (data.content.startsWith("[id]:")) {
              const sharedUserId = data.content.split(":")[1].trim()
              try {
                getRecords<User>(`/app/user/${sharedUserId}`).then((response) => {
                  setMessages(prev => [...prev, {
                    sender: data.sender === userId ? 'You' : data.sender,
                    content: "",
                    child: <UserCard id={response.id} username={response.username} image_url={response.image_url} />
                  }])
                })
              } catch (error) {
                console.error("Error fetching shared profile:", error)
              }
            } else {
              setMessages(prev => [...prev, {
                sender: data.sender === userId ? 'You' : data.sender,
                content: data.content
              }]);
            }
          } else if (data.type === 'partner_disconnected') {
            setIsMatched(false);
            setChatPartner(null);
            setMessages(prev => [...prev, {
              sender: 'System',
              content: 'Your chat partner has disconnected'
            }]);
          } else if (data.type === 'info') {
            setMessages(prev => [...prev, {
              sender: 'System',
              content: data.message
            }]);
          }
        } catch (error) {
          console.warn("Received non-JSON message:", event.data);
        }
      };

      socket.onclose = (event) => {
        console.log('WebSocket closed', event);
        wsConnected.current = false;

        if (isMatched) {
          setIsMatched(false);
          setChatPartner(null);
          setMessages(prev => [...prev, {
            sender: 'System',
            content: 'Connection closed'
          }]);
        }

        if (event.code !== 1000 && reconnectAttempts.current < maxReconnectAttempts) {
          reconnectAttempts.current++;
          console.log(`Attempting reconnect ${reconnectAttempts.current}/${maxReconnectAttempts}`);
          setTimeout(() => setupWebSocket(), 2000);
        } else {
          setIsMatching(false);
        }
      };

      socket.onerror = (error) => {
        console.error('WebSocket error:', error);
        wsConnected.current = false;
      };
    }, 500);
  };

  const findMatch = () => {
    setupWebSocket(true);
  };

  const sendMessage = (message: string) => {
    if (ws.current && wsConnected.current) {
      ws.current.send(message);
      if (message.startsWith("[id]:")) {
        const sharedUserId = message.split(":")[1].trim()
        try {
          getRecords<User>(`/app/user/${sharedUserId}`).then((response) => {
            setMessages(prev => [...prev, {
              sender: 'You',
              content: "",
              child: <UserCard id={response.id} username={response.username} image_url={response.image_url} />
            }])
          })
        } catch (error) {
          console.error("Error fetching shared profile:", error)
        }
      }else{
        setMessages(prev => [...prev, { sender: 'You', content: message }]);
      }
    } else {
      console.warn('Cannot send message: WebSocket not connected');
      setMessages(prev => [...prev, {
        sender: 'System',
        content: 'Cannot send message: not connected'
      }]);
      setupWebSocket();
    }
  };

  useEffect(() => {
    return () => {
      cleanupConnection();
    };
  }, []);

  return {
    messages,
    sendMessage,
    setMessages,
    findMatch,
    isMatching,
    isMatched,
    chatPartner,
    reconnect: () => setupWebSocket(true)
  };
};

export default useChat;