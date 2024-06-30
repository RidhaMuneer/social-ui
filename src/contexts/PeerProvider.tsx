// react
import React, { createContext, useEffect, useState } from "react";

// peer
import Peer, { DataConnection } from "peerjs";

// types
import { PeerContextProps, PeerProviderProps } from "@/types/peer";

export const PeerContext = createContext<PeerContextProps | undefined>(undefined);

export const PeerProvider: React.FC<PeerProviderProps> = ({ children }) => {
  const [peer, setPeer] = useState<Peer | null>(null);
  const [conn, setConn] = useState<DataConnection | null>(null);

  useEffect(() => {
    const peerInstance = new Peer();
    setPeer(peerInstance);

    peerInstance.on("connection", (connection) => {
      setConn(connection);
    });

    return () => {
      peerInstance.destroy();
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
