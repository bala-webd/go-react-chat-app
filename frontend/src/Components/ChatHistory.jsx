import "../Styles/ChatHistory.scss";

function ChatHistory(props) {
  return (
    <div className="chatHistory">
      <h2>Chat History</h2>
      {props?.chatHistory?.length > 0 &&
        props.chatHistory.map((history, index) => <p key={index}>{history}</p>)}
    </div>
  );
}

export default ChatHistory;
