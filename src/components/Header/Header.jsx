import "./header.scss";
import userIcon from '../../assets/user_icon.png';

const Header = () => {
  return (
    <div className="header">
      <h2 className="header_text">User's Inventory</h2>
      <img className="user_icon" src={userIcon} alt="" />
    </div>
  );
};

export default Header;
