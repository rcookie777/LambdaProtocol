import { Peer } from "peerjs";

export const peer = new Peer();

peer.on("open", () => {
  console.log("PEERJS INITIALIZED");
  console.log(peer.id);
})

export const viewStream = (peerId) => {
  return new Promise(async (resolve, reject) => {
    peer.call(peerId, null, (call) => {
      call.on("stream", (remoteStream) => {
        resolve(remoteStream);
      });
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
