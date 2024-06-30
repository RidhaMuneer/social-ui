import { PeerContext } from "@/contexts/PeerProvider";
import { useContext } from "react";

export const usePeer = () => {
  const context = useContext(PeerContext);
  if (!context) {
    throw new Error("usePeer must be used within a PeerProvider");
  }
  return context;
};
