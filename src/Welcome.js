import "./Csss/Welcome.css";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const myNav = useNavigate();
  return (
    <div className="welcome-container">
      {/* main welcome page  */}
      <div className="mid">
        <p>
          Welcome to Food's <br />
          <span className="kitchen">Kitchen</span>
        </p>
      </div>
      {/* when clicked will navigate towards the main menu */}

      <div className="to-menu">
        <button onClick={() => myNav("/menu")}>Go to Menu</button>
      </div>
    </div>
  );
}

export default Welcome;
