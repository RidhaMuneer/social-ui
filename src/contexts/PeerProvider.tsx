// react
import React, { createContext, useEffect, useState } from "react";

// peer
import Peer, { DataConnection } from "peerjs";

// types
import { PeerContextProps, PeerProviderProps } from "@/types/peer";
// import useUser from "@/hooks/user/useUser";

export const PeerContext = createContext<PeerContextProps | undefined>(undefined);

export const PeerProvider: React.FC<PeerProviderProps> = ({ children }) => {
  const [peer, setPeer] = useState<Peer | null>(null);
  const [conn, setConn] = useState<DataConnection | null>(null);
  // const {user} = useUser();
  
  useEffect(() => {
    const peerInstance = new Peer();
    setPeer(peerInstance);

    const ws = new WebSocket('ws://localhost:3001');

    peerInstance.on("open", (id) => {
      ws.send(JSON.stringify({ type: 'register', peerId: id }));
    });

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);

      if (message.type === 'match') {
        const connection = peerInstance.connect(message.peerId);
        setConn(connection);
      }
    };

    peerInstance.on("connection", (connection) => {
      setConn(connection);
    });

    return () => {
      peerInstance.destroy();
      ws.close();
    };
  }, []);

  const connectToPeer = (peerId: string) => {
    if (peer) {
      const connection = peer.connect(peerId);
      setConn(connection);
    }
  };

  return (
    <PeerContext.Provider value={{ peer, conn, setConn, connectToPeer }}>
      {children}
    </PeerContext.Provider>
  );
};
