// hooks
import { usePeer } from '@/hooks/peer/usePeer';
import { useEffect, useState } from 'react';

const Test = () => {
  const { peer, conn } = usePeer();
  const [message, setMessage] = useState<string>('');
  const [receivedMessage, setReceivedMessage] = useState<string>('');

  useEffect(() => {
    if (conn) {
      conn.on('data', (data: any) => {
        setReceivedMessage(data);
      });
    }
  }, [conn]);

  const sendMessage = () => {
    if (conn) {
      conn.send(message);
    }
  };

  return (
    <div>
      <p>Your Peer ID: {peer?.id}</p>
      <p>Waiting for a connection...</p>
      <br />
      <input
        type="text"
        placeholder="Enter message"
        value={message}
        className='text-black'
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send Message</button>
      <p>Received Message: {receivedMessage}</p>
    </div>
  );
};

export default Test;
