import { useEffect, useState } from "react";
import "./userform.scss";
import { getValidTextArea, isValidAge } from "../../utils/base";

const UserForm = ({
  users,
  currentTask,
  setCurrentTask,
  onSubmitHandler,
  currentId,
  setCurrentId,
}) => {
  const getUserById = (id) => {
    let temp = users.filter((user) => user.id == id)[0];
    console.log("current User : ", temp);
    return temp;
  };

  const [userData, setUserdata] = useState(
    currentId ? getUserById(currentId) : {}
  );

  const CURRENT_TASK =
    currentTask == "add_user"
      ? "ADD USER"
      : currentTask == "edit_user"
      ? "EDIT USER"
      : currentTask == "view_user"
      ? "VIEW USER"
      : "";

  const onScrollHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();

    console.log("scrollingg...");
  };

  const onChangeHandler = (e) => {
    if (currentTask == "view_user") {
      return;
    }
    let { name, value } = e.target;
    console.log(name, value.length);
    if(value.length === 0){
      setUserdata({
        ...userData,
        [name] : ''
      });
      return;
    }
    if (name == "age" && isValidAge(value)) {
      setUserdata({
        ...userData,
        age: value,
      });
    } else if (name == "hobbies" && value) {
      setUserdata({
        ...userData,
        hobbies: getValidTextArea(value),
      });
    } else if (name != "age" && name != "hobbies") {
      setUserdata({
        ...userData,
        [name]: value,
      });
    }

    // console.log("-> ", name, value);
  };

  const handleClose = () => {
    setCurrentTask("");
    setCurrentId("");
  };

  useEffect(() => {
    if (!currentTask || currentTask == "") {
      setUserdata({});
    }
  }, [currentTask]);

  return (
    <>
      {/* <div className="overlay"></div> */}
      <div className="userform_container" onScroll={onScrollHandler}>
        <div className="userform_wrapper" onScroll={onScrollHandler}>
          <form
            className="userform"
            method="get"
            onSubmit={(e) => {
              onSubmitHandler(e, userData);
            }}
          >
            <div className="userform_header">{CURRENT_TASK}</div>
            <div className="userform_content">
              <div className="box user_name">
                <label>name</label>
                <input
                  type="text"
                  name="name"
                  value={userData?.name ? userData.name : ""}
                  onChange={onChangeHandler}
                  disabled={currentTask === "view_user"}
                  required
                />
              </div>
              <div className="box user_age">
                <label>Age</label>
                <input
                  type="number"
                  name="age"
                  min="1"
                  // max="2"
                  value={userData?.age ? userData.age : ""}
                  onChange={onChangeHandler}
                  disabled={currentTask === "view_user"}
                  required
                />
              </div>
              <div className="box user_dob">
                <label>DOB</label>
                <input
                  type="date"
                  name="dob"
                  placeholder="Select date"
                  value={userData?.dob ? userData.dob : ""}
                  onChange={onChangeHandler}
                  disabled={currentTask === "view_user"}
                  required
                />
              </div>
              <div className="box user_gender">
                <label>Gender</label>
                <div className="box_inner_wrapper">
                  <label>
                    <input
                      type="radio"
                      name="gender"
                      value="male"
                      onChange={onChangeHandler}
                      checked={userData?.gender == "male" ? true : false}
                      disabled={currentTask === "view_user"}
                      required
                    />
                    <p>Male</p>
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="gender"
                      value="female"
                      onChange={onChangeHandler}
                      checked={userData?.gender == "female" ? true : false}
                      disabled={currentTask === "view_user"}
                      required
                    />
                    <p>Female</p>
                  </label>
                </div>
              </div>
              <div className="box user_favoriteFood">
                <label>Favourite Food</label>

                <select
                  name="favoriteFood"
                  onChange={onChangeHandler}
                  disabled={currentTask === "view_user"}
                  required
                >
                  <option value="" disabled>
                    Select an Option
                  </option>

                  <option value="pizza">pizza</option>
                  <option value="burger">burger</option>
                  <option value="pasta">pasta</option>
                </select>
              </div>
              <div className="box user_hobbies">
                <label>Hobbies</label>
                <div className="textarea_wrapper">
                  <textarea
                    className="textarea"
                    name="hobbies"
                    onChange={onChangeHandler}
                    value={userData?.hobbies ? userData.hobbies : ""}
                    disabled={currentTask === "view_user"}
                    required
                  ></textarea>
                </div>
              </div>
            </div>
            <div className="userform_buttons">
              {currentTask == "view_user" ? (
                <button
                  className="userform_button bg_skyblue"
                  onClick={handleClose}
                >
                  Close
                </button>
              ) : (
                <>
                  <button
                    className="userform_button bg_reddish_orange"
                    onClick={handleClose}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="userform_button bg_skyblue"
                    // onSubmit={(e) => {
                    //   onSubmitHandler(e, userData);
                    // }}
                  >
                    Submit
                  </button>
                </>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default UserForm;
