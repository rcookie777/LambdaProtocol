import { React, useEffect, useState, useReducer, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { peer, startStreaming, viewStream } from '../../peer'
import { user } from '../../gun/user'
import { gun } from '../../gun/gun'

const currentState = {
  streams: []
}

const reducer = (state, dispatched) => {
  switch (dispatched.action) {
    case "add":
      let { stream } = dispatched;

      // console.log("looking in array")
      // console.log(state.streams)
      // console.log("for user id")
      // console.log(stream.userId)
      // let i = state.streams.findIndex(s => s.userId === stream.userId);
      // console.log("result", i)
      
      // if (i !== -1 && stream.lastUpdated > state.streams[i].lastUpdated) {
      //   if (i == 0) return [stream, ...state.streams.slice(1)];
      //   return [stream, ...state.streams.slice(0, i), ...state.streams.slice(i+1)]
      // }
      // else {
        return {
          streams: [stream, ...state.streams]
        }
      // }
      break;
    case "clear":
      return { streams: [] }
      break;
  }
}

export default function Streams() {
  const [state, dispatch] = useReducer(reducer, currentState)
  const [chatId, setChatId] = useState("")
  let routeParams = useParams();
  const [isStreaming, setIsStreaming] = useState(false);
  const selfVideo = useRef();
  const [remoteStreams, setRemoteStreams] = useState([]);

  const streams = gun.get("streams");

  const loadRoomStreams = (newChatId) => {
    console.log("Loading streams");

    streams.map().on(u => {
      streams.get(u).once(sdata => {
        if (sdata && sdata.peerId) {
          console.log("Found valid data", sdata);

          dispatch({
            action: "add",
            stream: { userId: u, ...sdata }
          })
        }
      });
    });
  };

  useEffect(() => {
    console.log("Resetting streams");

    const newChatId = routeParams.chatId;
    setChatId(routeParams.chatId);

    dispatch({ action: "clear" });

    loadRoomStreams(newChatId);
  }, [routeParams]);

  let timeoutId = undefined;
  const stopUpdatingTimestamps = () => {
    clearTimeout(timeoutId);
  }
  const startUpdatingTimestamps = () => {
    clearTimeout(timeoutId);
    setTimeout(() => {
      streams.get(user.is.alias).put({
        courseName: chatId,
        active: true,
        peerId: peer.id,
        lastUpdated: (new Date()).getTime(),
      });
    }, 5000)
  }

  const startSelfStream = async () => {
    if (!user.is) throw new Error("Not logged in");

    const videoStream = await startStreaming();

    setIsStreaming(true);

    selfVideo.current.srcObject = videoStream;

    console.log("setting stream object for ", user.is.alias, JSON.stringify({
      courseName: chatId,
      active: true,
      peerId: peer.id,
      lastUpdated: (new Date()).getTime(),
    }))
    
    let userStream = streams.get(user.is.alias);
    userStream.put({
      courseName: chatId,
      active: true,
      peerId: peer.id,
      lastUpdated: (new Date()).getTime(),
    });

    startUpdatingTimestamps();

    // DEBUG
    console.log("now printing streaams")
    streams.get(user.is.alias).map().once(console.log)
    console.log("printing generic")
    streams.map().once(console.log)
  };

  const getLatestUniqueStreams = () => {
    let filtered = [];

    for (const stream of state.streams) {
      let i = filtered.findIndex(s => s.userId === stream.userId);
      let s = filtered[i];
      if (i !== -1) {
        if (stream.lastUpdated > s.lastUpdated)
          filtered.splice(i, 1, stream);
      } else {
        filtered.push(stream);
      }
    }

    console.log("FILTERED")
    console.log(filtered)

    return filtered;
  }

  const joinStream = async (peerId) => {
    console.log("JOINING PEERID ", peerId);
    const rs = await viewStream(peerId);
    setRemoteStreams([rs, ...remoteStreams]);
  };

  const getStreamRows = () => {
    return getLatestUniqueStreams().map(s => {
      return (
        <div onClick={() => joinStream(s.peerId)} className="max-w-full rounded p-4 my-2 bg-gray-100 hover:bg-gray-200 overflow-hidden cursor-pointer">
          {s.userId}
        </div>
      );
    });
  }

  const getRemoteStreams = () => {
    return remoteStreams.map(rs => {
      return (
        <video ref={(ref) => {
          if (ref) ref.srcObject = rs
        }}></video>
      )
    });
  }

  return (
    <div className="p-4 maxwidth400px">
      <div>Streams</div>

      <video ref={selfVideo} autoPlay={true}></video>

      { getRemoteStreams() }

      <button onClick={startSelfStream} className="button w-full mt-4">Start Streaming</button>

      { getStreamRows() }
    </div>
  )  
}