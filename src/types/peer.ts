import Peer, { DataConnection } from "peerjs";
import { ReactNode } from "react";

export interface PeerContextProps {
  peer: Peer | null;
  conn: DataConnection | null;
  setConn: React.Dispatch<React.SetStateAction<DataConnection | null>>;
  connectToPeer: (peerId: string) => void;
}

export interface PeerProviderProps {
  children: ReactNode;
}
