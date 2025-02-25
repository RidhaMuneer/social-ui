import { useState, useEffect, useRef } from 'react'

const useChat = (userId: string) => {
  const [messages, setMessages] = useState<{ sender: string; content: string }[]>([]);
  const [isMatching, setIsMatching] = useState(false);
  const [isMatched, setIsMatched] = useState(false);
  const [chatPartner, setChatPartner] = useState<string | null>(null);
  
  const ws = useRef<WebSocket | null>(null);
  const wsConnected = useRef<boolean>(false);
  const reconnectAttempts = useRef<number>(0);
  const maxReconnectAttempts = 3;

  // Clean up any existing connection before establishing a new one
  const cleanupConnection = () => {
    if (ws.current) {
      // Close the connection properly
      if (wsConnected.current) {
        try {
          ws.current.close(1000, "User initiated disconnect");
        } catch (e) {
          console.error("Error closing WebSocket:", e);
        }
      }
      
      // Reset the WebSocket reference
      ws.current = null;
      wsConnected.current = false;
    }
  };

  // Handle WebSocket connection and message handling
  const setupWebSocket = (forceNewMatch = false) => {
    // Make sure we clean up any existing connection first
    cleanupConnection();

    setIsMatching(true);
    setIsMatched(false);
    setChatPartner(null);
    
    // Force a small delay to ensure Redis has time to process any previous disconnect
    setTimeout(() => {
      // Create a new WebSocket connection
      const socket = new WebSocket(`ws://localhost:8000/ws/${userId}${forceNewMatch ? '?force_new=true' : ''}`);
      ws.current = socket;

      socket.onopen = () => {
        console.log('WebSocket connected');
        wsConnected.current = true;
        reconnectAttempts.current = 0;
      };

      socket.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          console.log('Received message:', data);

          if (data.type === 'matched') {
            setIsMatched(true);
            setIsMatching(false);
            setChatPartner(data.chatPartner);
            // Clear previous messages when new match is found
            setMessages([]);
          } else if (data.type === 'message') {
            setMessages(prev => [...prev, { 
              sender: data.sender === userId ? 'You' : data.sender, 
              content: data.content 
            }]);
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
        
        // Only attempt auto-reconnect for unexpected closures
        if (event.code !== 1000 && reconnectAttempts.current < maxReconnectAttempts) {
          reconnectAttempts.current++;
          console.log(`Attempting reconnect ${reconnectAttempts.current}/${maxReconnectAttempts}`);
          setTimeout(() => setupWebSocket(), 2000); // Reconnect after 2 seconds
        } else {
          setIsMatching(false);
        }
      };

      socket.onerror = (error) => {
        console.error('WebSocket error:', error);
        wsConnected.current = false;
      };
    }, 500); // Small delay to ensure clean connection
  };

  const findMatch = () => {
    // Always force a new match when the user explicitly requests one
    setupWebSocket(true);
  };

  const sendMessage = (message: string) => {
    if (ws.current && wsConnected.current) {
      // Send only the message content, not wrapped in JSON
      ws.current.send(message);
      // Only add your own message to the UI - the server will relay to others
      setMessages(prev => [...prev, { sender: 'You', content: message }]);
    } else {
      console.warn('Cannot send message: WebSocket not connected');
      setMessages(prev => [...prev, { 
        sender: 'System', 
        content: 'Cannot send message: not connected' 
      }]);
      setupWebSocket(); // Try to reconnect
    }
  };

  // Cleanup WebSocket on unmount
  useEffect(() => {
    return () => {
      cleanupConnection();
    };
  }, []);

  return { 
    messages, 
    sendMessage, 
    findMatch, 
    isMatching, 
    isMatched, 
    chatPartner,
    reconnect: () => setupWebSocket(true)
  };
};

export default useChat;