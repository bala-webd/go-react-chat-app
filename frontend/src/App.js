import { useEffect, useRef, useState } from "react";

import Header from "./Components/Header";
import ChatHistory from "./Components/ChatHistory";

function App() {
  const [chatHistory, setChatHistory] = useState([]);
  const [isOnline, setIsOnline] = useState(false);
  const [textValue, setTextValue] = useState("");

  const webSocket = useRef(null);

  webSocket.current = new WebSocket("ws://localhost:8001/ws");

  // webSocket.current.onopen = () => {
  //   setIsOnline(true);
  // };

  // webSocket.current.onclose = () => {
  //   setChatHistory([]);
  //   setIsOnline(false);
  // };

  useEffect(() => {
    setTimeout(() => {
      if (webSocket.current.readyState === WebSocket.OPEN) {
        setIsOnline(true);
      }
      if (webSocket.current.readyState === WebSocket.CLOSED) {
        setIsOnline(false);
        setChatHistory([]);
      }
    }, 5);
  }, [webSocket.current]);

  // useEffect(() => {
  //   webSocket.current.onopen = () => {
  //     setIsOnline(true);
  //     console.log("am i called");
  //   };
  //   webSocket.current.onclose = () => setIsOnline(false);
  //   return () => webSocket.current.close();
  // }, []);

  // useEffect(() => {
  //   if (!webSocket.current) return;

  //   webSocket.current.onmessage = (e) => {
  //     if (isPaused) return;
  //     const message = JSON.parse(e);
  //     console.log("e", message);
  //   };
  // }, [isPaused]);

  const sendMessage = () => {
    if (webSocket.current.readyState === WebSocket.OPEN) {
      setChatHistory([...chatHistory, textValue]);
      webSocket.current.send(textValue);
    }
  };

  return (
    <>
      <div className="App">
        <Header onLine={isOnline} />
        <ChatHistory chatHistory={chatHistory} />
        <input
          type="text"
          onChange={(e) => setTextValue(e.target.value)}
          value={textValue}
          placeholder="Type Message..."
        />
        <button onClick={sendMessage}>Hit</button>
      </div>
    </>
  );
}

export default App;
