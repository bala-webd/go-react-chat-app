import { useEffect, useRef, useState } from "react";

import Header from "./Components/Header";
import ChatHistory from "./Components/ChatHistory";

function App() {
  const [chatHistory, setChatHistory] = useState([]);
  const [isOnline, setIsOnline] = useState(false);
  const [textValue, setTextValue] = useState("");

  const webSocket = useRef(null);

  webSocket.current = new WebSocket("ws://localhost:8001/ws");

  useEffect(() => {
    setTimeout(() => {
      if (webSocket.current.readyState === WebSocket.OPEN) {
        setIsOnline(true);
      }
      if (webSocket.current.readyState === WebSocket.CLOSED) {
        setIsOnline(false);
        setChatHistory([]);
      }
      webSocket.current.onmessage = msg => {
        setChatHistory([...chatHistory, msg.data]);
      }
    }, 5);
  }, [webSocket.current]);

  const sendMessage = () => {
    if (webSocket.current.readyState === WebSocket.OPEN) {
      setChatHistory([...chatHistory, textValue]);
      webSocket.current.send(textValue);
    }
  };

  console.log("am i over rendering?")

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
