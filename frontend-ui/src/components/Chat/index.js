import '../../App.css'
import {React, useEffect, useState, useReducer } from 'react'
import {faker} from '@faker-js/faker'
import CheckMessage from '../auth/checkMessage'
import { gun } from '../../gun/gun'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify';
import { user } from '../../gun/user';


// The messages array will hold the chat messages
const currentState = {
  messages: []
}

// This reducer function will edit the messages array
const reducer = (state, dispatched) => {
  switch (dispatched.action) {
    case "add":
      let { message } = dispatched;
      return {
        messages: [message, ...state.messages]
      }
      break;
    case "clear":
      return { messages: [] }
      break;
  }
}

function Chat() {
  const [messageText, setMessageText] = useState('')
  const [state, dispatch] = useReducer(reducer, currentState)
  const [chatId, setChatId] = useState("")
  let routeParams = useParams();
  const name = user.get("name");


  const rooms = gun.get("rooms");
  const [nam] = loadName();
   

  function loadName(){
    const names = new Set()
    name.map().on((data, key) => {
        names.add(data)
    });
    return names
}

  const loadRoomMessages = (newChatId) => {
    const messagesRef = rooms.get(newChatId)
    messagesRef.map().on(m => {
      dispatch({
        action: "add",
        message: {
          sender: m.sender,
          avatar: m.avatar,
          content: m.content,
          timestamp: m.timestamp
        }
      })
    });
  };

  useEffect(() => {
    console.log("calling set chat id");

    const newChatId = routeParams.chatId;
    setChatId(routeParams.chatId);

    dispatch({ action: "clear" });

    loadRoomMessages(newChatId);
    loadName();
  }, [routeParams]);


  // fires immediately the page loads
  // useEffect(() => {
  //   const messagesRef = rooms.get(chatId)
  //   messagesRef.map().on(m => {
  //     dispatch({
  //       sender: m.sender,
  //       avatar: m.avatar,
  //       content: m.content,
  //       timestamp: m.timestamp
  //     })
  //   })
  // }, [routeParams])

  // remove duplicate messages
  const newMessagesArray = () => {
    const formattedMessages = state.messages.filter((value, index) => {
      const _value = JSON.stringify(value)
      return (
        index ===
        state.messages.findIndex(obj => {
          return JSON.stringify(obj) === _value
        })
      )
    })

    return formattedMessages
  }

  

  // save message to gun / send message
  const sendMessage = async () => {
    // a reference to the current room
    const messagesRef = rooms.get(chatId);
    // if (user.is){
    //   if(nam){
    //     var send = nam
    //   }
    // } else {
    //    var send = faker.name.firstName()
    // }

    console.log(CheckMessage(messageText))

    const valid = await CheckMessage(messageText)

    if (valid) {
        // the message object to be sent/saved
        const messageObject = {
          sender: faker.name.firstName(),
          avatar: faker.image.avatar(),
          content: messageText,
          timestamp: Date().substring(16, 21)
        }
        // this function sends/saves the message onto the network
        messagesRef.set(messageObject)

        // clear the text field after message has been sent
        setMessageText('')
    } else {
        toast.error('Message Filtered! Please follow community guidelines.')
      }
  }


  return <div className="App">
    <main>
      <div className='relative messages'>
        <ul>
          {newMessagesArray().map((msg, index) => [
            <li key={index} className='message hover:shadow-lg hover:from-white transition duration-200 ease-in-out'>
                <img alt='avatar' src={msg.avatar} />
              <div>
                {msg.content}
                <span>{msg.sender}</span>
              </div>
              <div className='ml-3'>
                <span>{msg.timestamp}</span>
              </div>
            </li>
          ])}
        </ul>
      </div>
      <div className='input-box'>
        <input placeholder='Type a message...' onChange={e => setMessageText(e.target.value)} value={messageText} />
        <button onClick={sendMessage}>Send</button>
      </div>
    </main>
  </div>
}

export default Chat
