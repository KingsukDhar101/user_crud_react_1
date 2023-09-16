import { truncateString } from "../../utils/base";
import "./usercard.scss";

const UserCard = ({ user, deleteUser, viewUser, editUser }) => {
  let { id, name, age, dob, gender, favoriteFood, hobbies } = user;

  return (
    <>
      <div className="usercard" id={id}>
        <div className="usercard_top">
          <div className="text">{name}</div>
          <div
            className={`circle color_age ${
              age >= 51
                ? "bg_orange"
                : age >= 26
                ? "bg_purple"
                : age >= 0
                ? "bg_green"
                : ""
            }`}
          ></div>
        </div>
        <div className="usercard_content">
          <div className="text_item">
            <div className="text_name">Age :</div>
            <div className="text_value">{age}</div>
          </div>
          <div className="text_item">
            <div className="text_name">DOB :</div>
            <div className="text_value">{dob}</div>
          </div>
          <div className="text_item">
            <div className="text_name">Gender :</div>
            <div className="text_value">{gender}</div>
          </div>
          <div className="text_item">
            <div className="text_name">food :</div>
            <div className="text_value">{favoriteFood}</div>
          </div>
          <div className="text_item">
            <div className="text_name">hobbies :</div>
            <div className="text_value">
              {hobbies?.length >= 12 ? truncateString(hobbies, 12) : hobbies}
            </div>
          </div>
        </div>
        <div className="usercard_bottom">
          <button
            className="delete bg_F64F2A"
            onClick={(e) => {
              deleteUser(e, id);
            }}
          >
            delete
          </button>
          <button
            className="view bg_1677FF"
            onClick={(e) => {
              viewUser(e, id);
            }}
          >
            view
          </button>
          <button
            className="edit bg_1677FF"
            onClick={(e) => {
              editUser(e, id);
            }}
          >
            edit
          </button>
        </div>
      </div>
    </>
  );
};

export default UserCard;
