import { Peer } from "peerjs";

export const peer = new Peer();

export const viewStream = (peerId) => {
  return new Promise((resolve, reject) => {
    const call = peer.call(peerId);
		call.on("stream", (remoteStream) => {
			resolve(remoteStream);
		});
  });
}

export const startStreaming = async () => {
  const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
  peer.on("call", (call) => {
    call.answer(stream);    
  });
  return stream;
};
