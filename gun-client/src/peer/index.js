import { Peer } from "peerjs";

export const peer = new Peer();

peer.on("open", () => {
  console.log("PEERJS INITIALIZED");
  console.log(peer.id);
})

const createMediaStreamFake = () => {
  return new MediaStream([createEmptyAudioTrack(), createEmptyVideoTrack({ width:640, height:480 })]);
}

const createEmptyAudioTrack = () => {
  const ctx = new AudioContext();
  const oscillator = ctx.createOscillator();
  const dst = oscillator.connect(ctx.createMediaStreamDestination());
  oscillator.start();
  const track = dst.stream.getAudioTracks()[0];
  return Object.assign(track, { enabled: false });
}

const createEmptyVideoTrack = ({ width, height }) => {
  const canvas = Object.assign(document.createElement('canvas'), { width, height });
  canvas.getContext('2d').fillRect(0, 0, width, height);

  const stream = canvas.captureStream();
  const track = stream.getVideoTracks()[0];

  return Object.assign(track, { enabled: false });
};

export const viewStream = (peerId) => {
  // const emptyStream = createMediaStreamFake();

  return new Promise(async (resolve, reject) => {
    // peer.call(peerId, emptyStream, (call) => {
    //   call.on("stream", (remoteStream) => {
    //     console.log("RECEIVED STREAM FROM STREAMER")
    //     resolve(remoteStream);
    //   });
    // });

    console.log("CONNECTING TO ", peerId);
    peer.connect(peerId);

    peer.on("call", (call) => {
      console.log("GOT CALL, WAITING FOR STREAM RESPONSE ", peerId);
      call.on("stream", (remoteStream) => {
        console.log("GOT REMOTE STREAM FROM", peerId);
        console.log(remoteStream);
        resolve(remoteStream);
      })
      call.answer(null);
    });
  });
}

export const startStreaming = async () => {
  const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });

  peer.on('connection', (conn) => {
    conn.on('open', (data) => {
      // when a listener connects, call them!
      console.log("RECEIVING CONNECTION FROM TO CALL BACK : ", conn.id);
      peer.call(
        conn.peer,
        stream
      )
    });
  });

  // peer.on("call", (call) => {
  //   console.log("RECEIVING CALL FROM ", call);
  //   call.answer(stream);    
  // });
  return stream;
};
