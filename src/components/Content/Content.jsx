import { useEffect, useState } from "react";
import UserCard from "../User/UserCard";
import "./content.scss";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import UserForm from "../User/UserForm";
import { v4 as uuidv4 } from "uuid";

const Content = () => {
  // const getPagitionNumberArr = () => {
  //   if (users?.length > 6) {
  //     let arr = [];
  //     let number = Math.ceil(users.length / 6);
  //     for (let i = 1; i <= number; i++) {
  //       arr.push(i);
  //     }
  //     return arr;
  //   }
  // };
  const [users, setUsers] = useState(
    localStorage.getItem("users")
      ? JSON.parse(localStorage.getItem("users"))
      : []
  );
  const [currentTask, setCurrentTask] = useState("");
  const [currentId, setCurrentId] = useState("");
  // const [paginationNumberArr, setPaginationNumberArr] =useState(getPagitionNumberArr);

  const currentTaskHandler = (e) => {
    let { name } = e.target;
    if (name == "add_user") {
      setCurrentTask(name); // add_user
    } else if (name == "edit_user") {
      setCurrentTask(name); // edit_user
    } else if (name == "view_user") {
      setCurrentTask(name); // view_user
    }
  };
  const handleClose = () => {
    setCurrentTask("");
    setCurrentId("");
  };

  const onSubmitHandler = (e, userData) => {
    e.preventDefault();
    if (userData && Object.keys(userData).length) {
      if (currentTask == "add_user") {
        let id = uuidv4();

        setUsers([...users, { ...userData, id }]);
        handleClose();
      } else if (currentTask == "edit_user") {
        setUsers((prevUsers) =>
          prevUsers.map((user) => (user.id == currentId ? userData : user))
        );

        handleClose();
      }
      console.log("e : ", e, userData && Object.keys(userData).length);
    }
  };

  const deleteUser = (e, id) => {
    if (id && users?.length) {
      setUsers(users.filter((userItem) => userItem?.id != id));
    }
  };
  const viewUser = (e, id) => {
    setCurrentId(id);
    setCurrentTask("view_user");
  };
  const editUser = (e, id) => {
    setCurrentId(id);
    setCurrentTask("edit_user");
  };

  useEffect(() => {
    console.log("current Id : ", currentId);
    console.log("current task : ", currentTask);
  }, [currentId]);

  useEffect(() => {
    if (users?.length) {
      localStorage.setItem("users", JSON.stringify(users));
      // setPaginationNumberArr(getPagitionNumberArr);
    }
  }, [users]);


  return (
    <>
      <div className="content">
        <div className="content_header">
          <div className="text">list of users</div>
          <button
            className="add_user"
            name="add_user"
            onClick={currentTaskHandler}
          >
            add user
          </button>
        </div>
        <div className="users">
          {users?.length ?
            users.map((userItem, userIndex) => (
              <UserCard
                key={userItem.id}
                user={userItem}
                deleteUser={deleteUser}
                viewUser={viewUser}
                editUser={editUser}
              />
            )) : ''}
        </div>
        {/* {paginationNumberArr?.length && (
          <div className="user_pagination">
            <div className="icon left">
              <BsArrowLeft />
            </div>
            <div className="pages">
              {paginationNumberArr.map((pageItem, pageIndex) => (
                <div className="page" key={pageIndex}>
                  {pageItem}
                </div>
              ))}
            </div>
            <div className="icon right">
              <BsArrowRight />
            </div>
          </div>
        )} */}

        {/* userform */}
        {currentTask ? (
          <UserForm
            users={users}
            currentTask={currentTask}
            setCurrentTask={setCurrentTask}
            currentId={currentId}
            setCurrentId={setCurrentId}
            onSubmitHandler={onSubmitHandler}
          />
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default Content;
