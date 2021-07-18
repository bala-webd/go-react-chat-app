import "../Styles/Header.scss";

const Header = (props) => {
  return (
    <div className="header">
      <h2>B-Chat</h2>
      <p className="text-right">{props.onLine ? "Online" : "Offline"}</p>
    </div>
  );
};

export default Header;
