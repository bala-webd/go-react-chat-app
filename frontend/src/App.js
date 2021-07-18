import { useEffect } from "react";

import { connect, sendMsg } from "./Api";

import Header from "./Layout/Header";

function App() {
  useEffect(() => {
    connect();
  }, []);

  const sendMessage = () => {
    new File();
    sendMsg("Hello");
  };

  return (
    <>
      <div className="App">
        <Header />
        <button onClick={sendMessage}>Hit</button>
      </div>
    </>
  );
}

export default App;
