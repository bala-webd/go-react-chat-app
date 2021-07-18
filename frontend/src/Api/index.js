var socket = new WebSocket("ws://localhost:8001/ws");

let connect = () => {
  console.log("Attempting Connection");
  socket.onopen = () => {
    console.log("Socket connected");
  };

  socket.onmessage = (msg) => {
    console.log(msg);
  };

  socket.onclose = (event) => {
    console.log("Socket event closed: ", event);
  };

  socket.onerror = (error) => {
    console.log("socket error: ", error);
  };
};

let sendMsg = (msg) => {
  console.log("Sending msg: ", msg);
  socket.send(msg);
};

export { connect, sendMsg };
