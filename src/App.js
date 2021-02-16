import React, { useState, useEffect } from "react";

import axios from "axios";

import FetchData from "./context";

function App() {
  const [users, setUsers] = useState([]);
  const [todo, setTodo] = useState([]);

  const [prev, setPrev] = useState(0);
  const [next, setNext] = useState(10);

  const [show, setShow] = useState(false);

  const { data, error, loading } = FetchData({ type: "todos" });

  const url = `https://jsonplaceholder.typicode.com/`;

  const removeTodoItem = (index) => {
    setTodo(todo.filter(({ id }) => id !== index));
  };

  const getDataFromAPI = async (type = "users") => {
    await axios
      .get(`${url}${type}`)
      .then((res) => {
        const data = res.data;

        console.log(data);

        type == "users" ? setUsers(data) : setTodo(data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    // getDataFromAPI("todos");
    // getDataFromAPI("users");
    {
      users && getDataFromAPI("users");
    }
    {
      loading && getDataFromAPI("todos");
    }

    // {
    //   !loading && data && setTodo(data);
    // }

    // console.log("todo: " + todo);
    // console.log("users: " + users);
  }, []);

  return (
    <div className="lg:py-16 py-8 align-middle flex flex-col justify-center items-center z-0">
      <p className="text-4xl font-bold capitalize">coding test</p>

      {/* {!loading && console.log(data)} */}

      {/* {todo && console.log("todo1: ", todo)}
      {users && console.log("users1: ", users)} */}

      {error && <p>fetching data gives error</p>}
      {loading && <p>loading</p>}

      {/* {todo &&
        todo.map((item, key) => {
          return <List2 key={key} dt={item} />;
        })} */}

      <List2
        dt={todo}
        users={users}
        next={next}
        prev={prev}
        removeTodoItem={removeTodoItem}
        show={show}
        setShow={setShow}
      />

      <EDITPAGE show={show} setShow={setShow} />

      <div className="flex flex-row gap-20">
        <button
          className="text-lg font-normal p-4 bg-orange-600 text-white capitalize hover:bg-blue-400 transition duration-300 ease-in-out"
          onClick={() => {
            setPrev(prev - 10);
            setNext(next - 10);
          }}
        >
          prev
        </button>
        <button
          className="text-lg font-normal p-4 bg-orange-600 text-white capitalize hover:bg-blue-400 transition duration-300 ease-in-out"
          onClick={() => {
            setPrev(prev + 10);
            setNext(next + 10);
          }}
        >
          next
        </button>
      </div>
    </div>
  );
}

export default App;

function List2({
  dt,
  users,
  next = 10,
  prev = 0,
  removeTodoItem,
  show,
  setShow,
}) {
  return (
    <div className="max-w-6xl w-full lg:py-8 py-4 justify-center items-center mx-auto self-center flex">
      <table className="table-auto gap-4">
        <thead className="border-b-2">
          <tr className="justify-between  justify-aroundly">
            <th className="">#</th>
            <th className="ml-auto justify-start">Title</th>
            <th>Assignes</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        {/* {console.log("data2: " + data2)} */}
        <tbody>
          {dt.slice(prev, next).map((item, key) => {
            return (
              <TBODY
                removeTodoItem={removeTodoItem}
                key={key}
                id={item.id}
                user={users.filter((user) => {
                  return user.id == item.userId;
                })}
                title={item.title}
                completed={item.completed}
                show={show}
                setShow={setShow}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function TBODY({ id, title, completed, user, removeTodoItem, show, setShow }) {
  const handleShow = () => {
    setShow(() => {
      return show == false ? true : false;
    });

    console.log(show);
  };

  return (
    <tr>
      {/* {console.log("user--: ", user)} */}
      <td className="py-2 px-4" key={id}>
        {id}
      </td>
      <td className="py-2 px-4 justify-start">{title && title}</td>
      <td className="py-2 px-4">{user && user[0].name}</td>
      <td className="py-2 px-4">{completed.toString()}</td>
      <td className="py-2 px-4">
        <div className="flex flex-row gap-2">
          <button
            className="text-lg font-normal p-4 bg-blue-600 text-white capitalize hover:bg-blue-400 transition duration-300 ease-in-out"
            onClick={() => {
              handleShow();
            }}
          >
            edit
          </button>
          <button
            className="text-lg font-normal p-4 bg-red-600 text-white capitalize hover:bg-red-400 transition duration-300 ease-in-out"
            onClick={() => {
              removeTodoItem(id);
            }}
          >
            remove
          </button>
        </div>
      </td>
    </tr>
  );
}

function EDITPAGE({ show, setShow }) {
  return show ? (
    <div className="h-screen z-20 justify-center items-center align-middle bg-opacity-25 w-full bg-black top-0 absolute left-0 p-20">
      <div
        className="w-128 h-128 self-center my-auto mt-auto  flex flex-col justify-center  mx-auto max-w-4xl text-center bg-white p-5 rounded-lg"
        style={{ width: "512px", heigt: "512px" }}
      >
        <h1 className="text-3xl font-bold capitalize">edit page</h1>
        <div className="lg:py-16 py-8 flex flex-col gap-10">
          <input
            placeholder="title "
            className="text-primary px-3 py-2 rounded-xl w-full border-2 bg-primary focus:outline-none  transform scale-100 hover:scale-105 focus:scale-110 transition duration-300 ease-in-out"
          />
          <input
            placeholder="author "
            className="text-primary px-3 py-2 rounded-xl w-full border-2 bg-primary focus:outline-none  transform scale-100 hover:scale-105 focus:scale-110 transition duration-300 ease-in-out"
          />
          <input
            placeholder="completed"
            checked
            className="text-primary px-3 py-2 rounded-xl w-full border-2 bg-primary focus:outline-none  transform scale-100 hover:scale-105 focus:scale-110 transition duration-300 ease-in-out"
          />
        </div>
        <div className="flex flex-row gap-2">
          <button
            className="text-lg font-normal p-4 bg-blue-600 text-white capitalize hover:bg-blue-400 transition duration-300 ease-in-out px-10 rounded-lg"
            onClick={() => {
              // handleShow();
            }}
          >
            submit
          </button>
          <button
            className="text-lg font-normal p-4 bg-red-600 text-white capitalize hover:bg-red-400 transition duration-300 ease-in-out px-10 rounded-lg"
            onClick={() => {
              setShow(false);
            }}
          >
            close
          </button>
        </div>
      </div>
    </div>
  ) : (
    <div></div>
  );
}
